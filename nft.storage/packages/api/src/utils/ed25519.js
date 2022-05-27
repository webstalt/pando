import { base58btc } from 'multiformats/bases/base58'

// NODE-ED25519 exists only in the CloudFlare workers runtime API
// see: https://developers.cloudflare.com/workers/runtime-apis/web-crypto#footnote%201
const CLOUDFLARE_ED25519 = {
  name: 'NODE-ED25519',
  namedCurve: 'NODE-ED25519',
}

/**
 * Verifies an Ed25519 signature over a given `message`.
 *
 * Will try to use the native Ed25519 implementation provided by the CloudFlare Worker API
 * if possible, falling back to js-based verification if not running in a CF Worker (e.g. in tests).
 *
 * @param {Uint8Array} message the message that was signed
 * @param {Uint8Array} sig the signature bytes
 * @param {Uint8Array} pubkey the Ed25519 public key that can verify the signature
 * @returns {Promise<boolean>} true if the signature is valid, false if invalid
 */
export async function verifyEd25519Signature(message, sig, pubkey) {
  if (typeof crypto === 'undefined' || typeof crypto.subtle === 'undefined') {
    return verifyEd25519SignatureWithJSCrypto(message, sig, pubkey)
  }

  try {
    return await verifyEd25519SignatureWithNativeCrypto(message, sig, pubkey)
  } catch (e) {
    if (e instanceof Error && e.name === 'NotSupportedError') {
      return await verifyEd25519SignatureWithJSCrypto(message, sig, pubkey)
    }
    throw e
  }
}

/**
 * Verifes an ed25519 signature using the non-standard NODE-ED25519 algorithm provided
 * by the CloudFlare Workers runtime API.
 * See https://developers.cloudflare.com/workers/runtime-apis/web-crypto#footnote%201
 *
 * @param {Uint8Array} message the message that was signed
 * @param {Uint8Array} sig the signature bytes
 * @param {Uint8Array} pubkey the Ed25519 public key that can verify the signature
 * @returns {Promise<boolean>} true if the signature is valid, false if invalid
 * @throws an Error with `name === 'NotSupportedError` if the NODE-ED25519 algorithm is unavailable,
 * or if running in an environment where WebCrypto is unavailable entirely.
 */
async function verifyEd25519SignatureWithNativeCrypto(message, sig, pubkey) {
  const key = await crypto.subtle.importKey(
    'raw',
    pubkey,
    CLOUDFLARE_ED25519,
    false,
    ['verify']
  )

  return crypto.subtle.verify(CLOUDFLARE_ED25519, key, sig, message)
}

/**
 * Verifies an Ed25519 signature using a javascript implementation (tweetnacl).
 *
 * This method is used as a fallback when running unit tests or otherwise executing
 * outside of the CloudFlare Worker runtime environment.
 *
 * @param {Uint8Array} message
 * @param {Uint8Array} sig
 * @param {Uint8Array} pubkey
 * @returns {Promise<boolean>}
 */
async function verifyEd25519SignatureWithJSCrypto(message, sig, pubkey) {
  console.warn(
    'using tweetnacl for ed25519 - you should not see this message when running in the CloudFlare worker runtime'
  )
  const { default: nacl } = await import('tweetnacl')
  return nacl.sign.detached.verify(message, sig, pubkey)
}

/**
 * Extracts an Ed25519 public key from a `did:key` decentralized identifier string.
 *
 * @param {string} did - a "did:key" formatted DID string
 * @returns {Uint8Array} - the decoded public key
 * @throws if DID is invalid or does not contain a valid Ed25519 public key
 */
export function keyFromDID(did) {
  const prefix = 'did:key:'
  if (!did.startsWith(prefix)) {
    throw new Error('invalid DID')
  }

  const keyStr = did.slice(prefix.length)
  const bytes = base58btc.decode(keyStr)

  // check multicodec == ed25519-pub (0xed encoded as a varint)
  if (bytes[0] !== 0xed || bytes[1] !== 0x01) {
    throw new Error(
      'invalid key multicodec. only ed25519-pub keys are supported'
    )
  }
  return bytes.slice(2)
}
