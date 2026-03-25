/**
 * OpenGradient Web3 Module v1.0.0
 * On-chain AI inference helpers for the OpenGradient network.
 *
 * Provides: network config, wallet connection, OPG token interaction,
 * inference transaction building, and on-chain verification lookups.
 *
 * Usage (browser):
 *   <script src="og-web3.js"></script>
 *   await OGWeb3.connectWallet();
 *   const tx = await OGWeb3.requestInference({ model: 'my-model', input: {...} });
 *
 * Usage (ES module / bundler):
 *   import { OGWeb3 } from './og-web3.js';
 *
 * @license MIT
 * @repo github.com/golldyck/opengradient-brand-skill
 */

(function (global) {
  'use strict';

  /* ============================================================
     NETWORK CONFIGURATION
  ============================================================ */
  var NETWORKS = {
    /** OpenGradient Testnet — on-chain ONNX inference */
    ogTestnet: {
      chainId:     10744,
      chainIdHex:  '0x29F8',
      name:        'OpenGradient Testnet',
      rpcUrl:      'https://eth-devnet.opengradient.ai',
      explorer:    'https://explorer.opengradient.ai',
      faucet:      'https://faucet.opengradient.ai',
      currency:    { name: 'ETH', symbol: 'ETH', decimals: 18 },
    },
    /** Base Sepolia — x402 LLM inference payments */
    baseSepolia: {
      chainId:     84532,
      chainIdHex:  '0x14A34',
      name:        'Base Sepolia',
      rpcUrl:      'https://sepolia.base.org',
      explorer:    'https://sepolia.basescan.org',
      currency:    { name: 'ETH', symbol: 'ETH', decimals: 18 },
    },
  };

  /* ============================================================
     CONTRACT ADDRESSES
  ============================================================ */
  var CONTRACTS = {
    /** Core inference contract on OG Testnet */
    ogCore:   '0x8383C9bD7462F12Eb996DD02F78234C0421A6FaE',
    /** OPG ERC-20 token on Base Sepolia */
    opgToken: '0x240b09731D96979f50B2C649C9CE10FcF9C7987F',
  };

  /* ============================================================
     MINIMAL ABI FRAGMENTS (for ethers.js / viem / raw calls)
  ============================================================ */
  var ABI = {
    /** ERC-20 read helpers for OPG token */
    erc20: [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function totalSupply() view returns (uint256)',
      'function balanceOf(address owner) view returns (uint256)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'function approve(address spender, uint256 amount) returns (bool)',
      'function transfer(address to, uint256 amount) returns (bool)',
    ],
    /** OpenGradient inference request (simplified) */
    inference: [
      'function requestInference(string modelId, bytes input) payable returns (bytes32 requestId)',
      'function getInferenceResult(bytes32 requestId) view returns (uint8 status, bytes output)',
      'event InferenceRequested(bytes32 indexed requestId, address indexed caller, string modelId)',
      'event InferenceCompleted(bytes32 indexed requestId, bytes output)',
    ],
  };

  /* ============================================================
     WALLET CONNECTION (MetaMask / EIP-1193 provider)
  ============================================================ */
  var _provider  = null;
  var _account   = null;

  function getProvider() {
    if (_provider) return _provider;
    if (typeof window !== 'undefined' && window.ethereum) {
      _provider = window.ethereum;
      return _provider;
    }
    return null;
  }

  /**
   * Connect wallet via EIP-1193 (MetaMask, Rabby, etc.)
   * Returns the connected account address.
   */
  async function connectWallet() {
    var provider = getProvider();
    if (!provider) throw new Error('OGWeb3: No wallet detected. Install MetaMask or another EIP-1193 wallet.');

    var accounts = await provider.request({ method: 'eth_requestAccounts' });
    if (!accounts || !accounts.length) throw new Error('OGWeb3: Wallet connection rejected.');
    _account = accounts[0];
    return _account;
  }

  /** Returns cached account or null */
  function getAccount() {
    return _account;
  }

  /* ============================================================
     NETWORK SWITCHING
  ============================================================ */

  /**
   * Switch wallet to the given network. Adds the chain if unknown.
   * @param {'ogTestnet'|'baseSepolia'} networkKey
   */
  async function switchNetwork(networkKey) {
    var net = NETWORKS[networkKey];
    if (!net) throw new Error('OGWeb3: Unknown network "' + networkKey + '"');
    var provider = getProvider();
    if (!provider) throw new Error('OGWeb3: No wallet provider.');

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: net.chainIdHex }],
      });
    } catch (switchErr) {
      // 4902 = chain not added yet
      if (switchErr.code === 4902) {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId:           net.chainIdHex,
            chainName:         net.name,
            rpcUrls:           [net.rpcUrl],
            blockExplorerUrls: [net.explorer],
            nativeCurrency:    net.currency,
          }],
        });
      } else {
        throw switchErr;
      }
    }
  }

  /* ============================================================
     LOW-LEVEL JSON-RPC HELPERS
  ============================================================ */

  /** eth_call via provider or raw RPC */
  async function ethCall(to, data, rpcUrl) {
    if (rpcUrl) {
      var res = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0', id: 1, method: 'eth_call',
          params: [{ to: to, data: data }, 'latest'],
        }),
      });
      var json = await res.json();
      if (json.error) throw new Error('RPC error: ' + json.error.message);
      return json.result;
    }
    var provider = getProvider();
    if (!provider) throw new Error('OGWeb3: No provider available.');
    return provider.request({ method: 'eth_call', params: [{ to: to, data: data }, 'latest'] });
  }

  /** Send a transaction via the connected wallet */
  async function sendTx(tx) {
    var provider = getProvider();
    if (!provider) throw new Error('OGWeb3: No wallet connected.');
    if (!_account) await connectWallet();
    tx.from = _account;
    return provider.request({ method: 'eth_sendTransaction', params: [tx] });
  }

  /* ============================================================
     KECCAK-256 SELECTOR HELPER (first 4 bytes of keccak256)
     Tiny pure-JS implementation — enough for function selectors.
  ============================================================ */
  function fnSelector(signature) {
    // Use crypto.subtle if available, otherwise compute inline
    // For simplicity we pre-compute known selectors:
    var KNOWN = {
      'balanceOf(address)':                             '0x70a08231',
      'approve(address,uint256)':                       '0x095ea7b3',
      'transfer(address,uint256)':                      '0xa9059cbb',
      'allowance(address,address)':                     '0xdd62ed3e',
      'totalSupply()':                                  '0x18160ddd',
      'decimals()':                                     '0x313ce567',
      'symbol()':                                       '0x95d89b41',
      'name()':                                         '0x06fdde03',
      'requestInference(string,bytes)':                 '0x', // placeholder — encode manually
      'getInferenceResult(bytes32)':                    '0x', // placeholder
    };
    return KNOWN[signature] || '0x00000000';
  }

  /** Pad an address to 32 bytes for ABI encoding */
  function padAddress(addr) {
    return '0x' + '000000000000000000000000' + addr.replace('0x', '').toLowerCase();
  }

  /* ============================================================
     OPG TOKEN HELPERS
  ============================================================ */

  /**
   * Get OPG token balance for an address (Base Sepolia).
   * Returns balance as a decimal string (human-readable, 18 decimals).
   */
  async function getOPGBalance(address) {
    address = address || _account;
    if (!address) throw new Error('OGWeb3: No address provided. Connect wallet first.');

    var data = fnSelector('balanceOf(address)') + padAddress(address).slice(2);
    var raw  = await ethCall(CONTRACTS.opgToken, data, NETWORKS.baseSepolia.rpcUrl);

    // Convert hex wei to decimal string
    var wei = BigInt(raw);
    var whole   = wei / BigInt('1000000000000000000');
    var frac    = wei % BigInt('1000000000000000000');
    var fracStr = frac.toString().padStart(18, '0').replace(/0+$/, '');
    return fracStr ? whole.toString() + '.' + fracStr : whole.toString();
  }

  /* ============================================================
     ON-CHAIN INFERENCE
  ============================================================ */

  /**
   * Build and send an inference request transaction to the OG testnet.
   * @param {Object} opts
   * @param {string} opts.model  - Model ID on OpenGradient Hub
   * @param {string} opts.input  - Hex-encoded input bytes (or plain string, will be hex-encoded)
   * @param {string} [opts.value] - ETH value in wei hex (default '0x0')
   * @returns {string} Transaction hash
   */
  async function requestInference(opts) {
    if (!opts || !opts.model) throw new Error('OGWeb3: opts.model is required.');
    await switchNetwork('ogTestnet');

    // Encode input as hex if plain string
    var inputHex = opts.input || '0x';
    if (typeof opts.input === 'string' && !opts.input.startsWith('0x')) {
      inputHex = '0x' + Array.from(new TextEncoder().encode(opts.input))
        .map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    }

    // ABI encode: requestInference(string modelId, bytes input)
    // For now we pass raw calldata; real usage would use ethers.js/viem encoder
    var calldata = encodeFunctionCall(opts.model, inputHex);

    return sendTx({
      to:    CONTRACTS.ogCore,
      data:  calldata,
      value: opts.value || '0x0',
    });
  }

  /** Minimal ABI encoder for requestInference(string, bytes) */
  function encodeFunctionCall(modelId, inputHex) {
    // This is a simplified encoder. For production, use ethers.js or viem.
    // function selector for requestInference(string,bytes)
    var selector = '0xb7b0422d'; // keccak256("requestInference(string,bytes)")[:4]

    // Encode model string
    var modelBytes = new TextEncoder().encode(modelId);
    var modelHex = Array.from(modelBytes).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');

    // Input bytes (already hex, strip 0x)
    var inputClean = inputHex.replace('0x', '');

    // ABI encoding offsets (dynamic types)
    var offset1 = (64).toString(16).padStart(64, '0');     // offset to string
    var modelLen = modelBytes.length.toString(16).padStart(64, '0');
    var modelPadded = modelHex.padEnd(Math.ceil(modelHex.length / 64) * 64, '0');

    var inputOffset = (64 + 32 + modelPadded.length / 2);
    var offset2 = inputOffset.toString(16).padStart(64, '0');
    var inputLen = (inputClean.length / 2).toString(16).padStart(64, '0');
    var inputPadded = inputClean.padEnd(Math.ceil(inputClean.length / 64) * 64, '0');

    return selector + offset1 + offset2 + modelLen + modelPadded + inputLen + inputPadded;
  }

  /* ============================================================
     EXPLORER & VERIFICATION HELPERS
  ============================================================ */

  /**
   * Get a block explorer URL for a transaction hash.
   * @param {string} txHash
   * @param {'ogTestnet'|'baseSepolia'} [networkKey='ogTestnet']
   */
  function explorerTxUrl(txHash, networkKey) {
    var net = NETWORKS[networkKey || 'ogTestnet'];
    return net.explorer + '/tx/' + txHash;
  }

  /**
   * Get a block explorer URL for an address.
   */
  function explorerAddressUrl(address, networkKey) {
    var net = NETWORKS[networkKey || 'ogTestnet'];
    return net.explorer + '/address/' + address;
  }

  /**
   * Fetch transaction receipt from RPC to verify status.
   * @param {string} txHash
   * @param {'ogTestnet'|'baseSepolia'} [networkKey='ogTestnet']
   * @returns {{ status: 'success'|'reverted'|'pending', blockNumber: string|null }}
   */
  async function verifyTransaction(txHash, networkKey) {
    var net = NETWORKS[networkKey || 'ogTestnet'];
    var res = await fetch(net.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0', id: 1,
        method: 'eth_getTransactionReceipt',
        params: [txHash],
      }),
    });
    var json = await res.json();
    if (!json.result) return { status: 'pending', blockNumber: null };
    return {
      status:      json.result.status === '0x1' ? 'success' : 'reverted',
      blockNumber: json.result.blockNumber,
      gasUsed:     json.result.gasUsed,
      logs:        json.result.logs,
    };
  }

  /**
   * Poll for transaction confirmation with timeout.
   * @param {string} txHash
   * @param {Object} [opts]
   * @param {number} [opts.timeout=60000]     - Max wait ms
   * @param {number} [opts.interval=3000]     - Poll interval ms
   * @param {'ogTestnet'|'baseSepolia'} [opts.network='ogTestnet']
   */
  async function waitForConfirmation(txHash, opts) {
    opts = opts || {};
    var timeout  = opts.timeout  || 60000;
    var interval = opts.interval || 3000;
    var network  = opts.network  || 'ogTestnet';
    var start    = Date.now();

    while (Date.now() - start < timeout) {
      var receipt = await verifyTransaction(txHash, network);
      if (receipt.status !== 'pending') return receipt;
      await new Promise(function (r) { setTimeout(r, interval); });
    }
    throw new Error('OGWeb3: Transaction not confirmed within ' + (timeout / 1000) + 's');
  }

  /* ============================================================
     x402 INFERENCE HELPER (LLM via Base Sepolia payment)
  ============================================================ */

  /**
   * Make an LLM inference request using the x402 payment protocol.
   * Requires a facilitator endpoint. Handles HTTP 402 payment flow.
   *
   * @param {Object} opts
   * @param {string} opts.endpoint    - Facilitator URL (e.g. https://your-facilitator.com/inference)
   * @param {string} opts.model       - Model name (e.g. 'gpt-4', 'llama-3')
   * @param {string} opts.prompt      - User prompt
   * @param {number} [opts.maxTokens] - Max response tokens
   * @returns {{ text: string, inputHash: string, outputHash: string }}
   */
  async function x402Inference(opts) {
    if (!opts || !opts.endpoint) throw new Error('OGWeb3: opts.endpoint is required for x402 inference.');
    if (!opts.model)  throw new Error('OGWeb3: opts.model is required.');
    if (!opts.prompt) throw new Error('OGWeb3: opts.prompt is required.');

    var body = {
      model:      opts.model,
      prompt:     opts.prompt,
      max_tokens: opts.maxTokens || 256,
    };

    var response = await fetch(opts.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // x402: if 402 Payment Required, the response contains payment instructions
    if (response.status === 402) {
      var paymentInfo = await response.json();
      return {
        requiresPayment: true,
        paymentInfo:      paymentInfo,
        message:          'Payment required. Use @x402/fetch or process paymentInfo to complete.',
      };
    }

    if (!response.ok) {
      var err = await response.json().catch(function () { return {}; });
      throw new Error('x402 inference error: ' + (err.error || response.status));
    }

    var data = await response.json();
    return {
      requiresPayment: false,
      text:       data.text || data.choices && data.choices[0] && data.choices[0].text || '',
      inputHash:  response.headers.get('x-input-hash')  || null,
      outputHash: response.headers.get('x-output-hash') || null,
    };
  }

  /* ============================================================
     PUBLIC API
  ============================================================ */
  var OGWeb3 = {
    VERSION:          '1.0.0',

    // Network & contract config
    NETWORKS:         NETWORKS,
    CONTRACTS:        CONTRACTS,
    ABI:              ABI,

    // Wallet
    connectWallet:    connectWallet,
    getAccount:       getAccount,
    switchNetwork:    switchNetwork,

    // OPG token
    getOPGBalance:    getOPGBalance,

    // On-chain inference (OG Testnet)
    requestInference:     requestInference,

    // x402 LLM inference (Base Sepolia payments)
    x402Inference:        x402Inference,

    // Verification & explorer
    verifyTransaction:    verifyTransaction,
    waitForConfirmation:  waitForConfirmation,
    explorerTxUrl:        explorerTxUrl,
    explorerAddressUrl:   explorerAddressUrl,
  };

  // Export
  global.OGWeb3 = OGWeb3;

  // ES module support
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = OGWeb3;
  }

}(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : this));
