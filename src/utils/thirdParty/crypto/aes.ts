/*
 * @Author: czy0729
 * @Date: 2026-09-01 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 00:00:00
 */
import { logger } from '@utils/dev'
import { MD5 } from './md5'
import { utf8Decode, utf8Encode } from './utf8'

const TAG = '@utils/thirdParty/crypto'

// ─── AES S-box ───
const SBOX = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
  0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
  0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
  0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
  0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
  0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
  0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
  0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
  0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
  0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
  0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
  0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
  0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
  0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
  0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
]

const INV_SBOX = new Array<number>(256)
for (let i = 0; i < 256; i++) INV_SBOX[SBOX[i]] = i

const RCON = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]

// ─── GF(2^8) ───
function xtime(a: number): number {
  return ((a << 1) ^ (((a >> 7) & 1) * 0x1b)) & 0xff
}

function gmul(a: number, b: number): number {
  let p = 0
  for (let i = 0; i < 8; i++) {
    if (b & 1) p ^= a
    const hi = a & 0x80
    a = (a << 1) & 0xff
    if (hi) a ^= 0x1b
    b >>= 1
  }
  return p
}

// ─── Base64 ───
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** Uint8Array 转 base64 字符串 (RFC 4648) */
function base64Encode(bytes: Uint8Array): string {
  let out = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i]
    const b1 = i + 1 < bytes.length ? bytes[i + 1] : 0
    const b2 = i + 2 < bytes.length ? bytes[i + 2] : 0
    out += B64[(b0 >> 2) & 0x3f]
    out += B64[((b0 << 4) | (b1 >> 4)) & 0x3f]
    out += i + 1 < bytes.length ? B64[((b1 << 2) | (b2 >> 6)) & 0x3f] : '='
    out += i + 2 < bytes.length ? B64[b2 & 0x3f] : '='
  }
  return out
}

/** base64 字符串转 Uint8Array，忽略非法字符 */
function base64Decode(str: string): Uint8Array {
  const clean = str.replace(/[^A-Za-z0-9+/]/g, '')
  const out = new Uint8Array(Math.ceil((clean.length * 3) / 4))
  let n = 0
  for (let i = 0; i < clean.length; i += 4) {
    const c0 = B64.indexOf(clean[i])
    const c1 = B64.indexOf(clean[i + 1])
    const c2 = clean[i + 2] === '=' ? -1 : B64.indexOf(clean[i + 2])
    const c3 = clean[i + 3] === '=' ? -1 : B64.indexOf(clean[i + 3])
    out[n++] = (c0 << 2) | (c1 >> 4)
    if (c2 >= 0) out[n++] = ((c1 << 4) | (c2 >> 2)) & 0xff
    if (c3 >= 0) out[n++] = ((c2 << 6) | c3) & 0xff
  }
  return out.subarray(0, n)
}

// ─── EvpKDF (OpenSSL Evp_BytesToKey, 1 iteration) ───
// crypto-js 兼容：D_0 = MD5(password + salt), D_1 = MD5(D_0 + password + salt), ...
// 中间结果以原始字节传递，不是 hex 字符串
function bytesToString(bytes: number[]): string {
  return bytes.map(b => String.fromCharCode(b)).join('')
}

function evpKdf(
  password: string,
  salt: Uint8Array,
  keyLen: number,
  ivLen: number
): { key: number[]; iv: number[] } {
  const passBytes: number[] = []
  for (let i = 0; i < password.length; i++) {
    passBytes.push(password.charCodeAt(i) & 0xff)
  }

  const totalLen = keyLen + ivLen
  const out: number[] = []
  let prevBlock: number[] = []

  while (out.length < totalLen) {
    // 构造输入：prevBlock + passwordBytes + saltBytes
    const input = [...prevBlock, ...passBytes, ...salt]
    const hashHex = MD5(bytesToString(input))
    // 将 hex 转回字节
    const hashBytes: number[] = []
    for (let i = 0; i < hashHex.length; i += 2) {
      hashBytes.push(parseInt(hashHex.substring(i, i + 2), 16))
    }
    out.push(...hashBytes)
    prevBlock = hashBytes
  }

  return {
    key: out.slice(0, keyLen),
    iv: out.slice(keyLen, keyLen + ivLen)
  }
}

// ─── AES-256-CBC ───
/** AES-256 密钥扩展，生成 15 轮轮密钥 */
function keyExpansion(key: number[]): number[][] {
  const Nk = 8
  const Nr = 14
  const W: number[][] = []

  for (let i = 0; i < Nk; i++) {
    W.push(key.slice(i * 4, i * 4 + 4))
  }

  for (let i = Nk; i < 4 * (Nr + 1); i++) {
    let temp = W[i - 1].slice()
    if (i % Nk === 0) {
      temp = [temp[1], temp[2], temp[3], temp[0]]
      temp = temp.map(b => SBOX[b])
      temp[0] ^= RCON[((i / Nk) | 0) - 1]
    } else if (Nk > 6 && i % Nk === 4) {
      temp = temp.map(b => SBOX[b])
    }
    W.push(W[i - Nk].map((b, j) => b ^ temp[j]))
  }

  // Pack 4 consecutive words into each round key (16 bytes)
  const roundKeys: number[][] = []
  for (let r = 0; r <= Nr; r++) {
    const rk: number[] = []
    for (let c = 0; c < 4; c++) {
      rk.push(...W[r * 4 + c])
    }
    roundKeys.push(rk)
  }
  return roundKeys
}

/** AES 单块加密 (128 位 → 128 位) */
function aesEncryptBlock(block: Uint8Array, W: number[][]): Uint8Array {
  const s = [
    [block[0], block[4], block[8], block[12]],
    [block[1], block[5], block[9], block[13]],
    [block[2], block[6], block[10], block[14]],
    [block[3], block[7], block[11], block[15]]
  ]

  addRoundKey(s, W[0])
  for (let round = 1; round < 14; round++) {
    subBytes(s)
    shiftRows(s)
    mixColumns(s)
    addRoundKey(s, W[round])
  }
  subBytes(s)
  shiftRows(s)
  addRoundKey(s, W[14])

  const out = new Uint8Array(16)
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) out[c * 4 + r] = s[r][c]
  return out
}

/** AES 单块解密 (128 位 → 128 位) */
function aesDecryptBlock(block: Uint8Array, W: number[][]): Uint8Array {
  const s = [
    [block[0], block[4], block[8], block[12]],
    [block[1], block[5], block[9], block[13]],
    [block[2], block[6], block[10], block[14]],
    [block[3], block[7], block[11], block[15]]
  ]

  addRoundKey(s, W[14])
  for (let round = 13; round >= 1; round--) {
    invShiftRows(s)
    invSubBytes(s)
    addRoundKey(s, W[round])
    invMixColumns(s)
  }
  invShiftRows(s)
  invSubBytes(s)
  addRoundKey(s, W[0])

  const out = new Uint8Array(16)
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) out[c * 4 + r] = s[r][c]
  return out
}

/** SubBytes 非线性替换 */
function subBytes(s: number[][]): void {
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) s[r][c] = SBOX[s[r][c]]
}

/** InvSubBytes 逆替换 */
function invSubBytes(s: number[][]): void {
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) s[r][c] = INV_SBOX[s[r][c]]
}

/** ShiftRows 行移位 */
function shiftRows(s: number[][]): void {
  for (let r = 1; r < 4; r++) {
    const row = s[r].slice()
    for (let c = 0; c < 4; c++) s[r][c] = row[(c + r) % 4]
  }
}

/** InvShiftRows 逆行移位 */
function invShiftRows(s: number[][]): void {
  for (let r = 1; r < 4; r++) {
    const row = s[r].slice()
    for (let c = 0; c < 4; c++) s[r][c] = row[(c - r + 4) % 4]
  }
}

/** MixColumns 列混合 */
function mixColumns(s: number[][]): void {
  for (let c = 0; c < 4; c++) {
    const col = [s[0][c], s[1][c], s[2][c], s[3][c]]
    s[0][c] = xtime(col[0]) ^ (xtime(col[1]) ^ col[1]) ^ col[2] ^ col[3]
    s[1][c] = col[0] ^ xtime(col[1]) ^ (xtime(col[2]) ^ col[2]) ^ col[3]
    s[2][c] = col[0] ^ col[1] ^ xtime(col[2]) ^ (xtime(col[3]) ^ col[3])
    s[3][c] = xtime(col[0]) ^ col[0] ^ col[1] ^ col[2] ^ xtime(col[3])
  }
}

/** InvMixColumns 逆列混合 */
function invMixColumns(s: number[][]): void {
  for (let c = 0; c < 4; c++) {
    const col = [s[0][c], s[1][c], s[2][c], s[3][c]]
    s[0][c] = gmul(col[0], 14) ^ gmul(col[1], 11) ^ gmul(col[2], 13) ^ gmul(col[3], 9)
    s[1][c] = gmul(col[0], 9) ^ gmul(col[1], 14) ^ gmul(col[2], 11) ^ gmul(col[3], 13)
    s[2][c] = gmul(col[0], 13) ^ gmul(col[1], 9) ^ gmul(col[2], 14) ^ gmul(col[3], 11)
    s[3][c] = gmul(col[0], 11) ^ gmul(col[1], 13) ^ gmul(col[2], 9) ^ gmul(col[3], 14)
  }
}

/** 轮密钥加 */
function addRoundKey(s: number[][], rk: number[]): void {
  for (let c = 0; c < 4; c++) {
    s[0][c] ^= rk[c * 4]
    s[1][c] ^= rk[c * 4 + 1]
    s[2][c] ^= rk[c * 4 + 2]
    s[3][c] ^= rk[c * 4 + 3]
  }
}

/** PKCS#7 填充至 16 字节对齐 */
function pkcs7Pad(data: Uint8Array): Uint8Array {
  const padLen = 16 - (data.length % 16)
  const out = new Uint8Array(data.length + padLen)
  out.set(data)
  for (let i = data.length; i < out.length; i++) out[i] = padLen
  return out
}

/** 校验 PKCS#7 padding 是否合法 */
function isValidPkcs7Padding(data: Uint8Array): boolean {
  if (data.length === 0) return false
  const padLen = data[data.length - 1]
  if (padLen < 1 || padLen > 16) return false
  for (let i = data.length - padLen; i < data.length; i++) {
    if (data[i] !== padLen) return false
  }
  return true
}

/** 随机字节：优先原生 CSPRNG，回退 Math.random */
function getRandomBytes(n: number): Uint8Array {
  const cryptoObj = (
    globalThis as unknown as {
      crypto?: { getRandomValues?: (array: Uint8Array) => Uint8Array }
    }
  ).crypto
  if (typeof cryptoObj?.getRandomValues === 'function') {
    try {
      return cryptoObj.getRandomValues(new Uint8Array(n))
    } catch (e) {}
  }
  // RN Hermes 无全局 WebCrypto; 盐仅需唯一性不需保密性, Math.random 足够
  logger.warn(TAG, 'encrypt', 'crypto.getRandomValues unavailable, fallback to Math.random')

  const out = new Uint8Array(n)
  for (let i = 0; i < n; i++) out[i] = Math.floor(Math.random() * 256)
  return out
}

// ─── Public API (OpenSSL-compatible) ───

/** AES-256-CBC 加密，返回 OpenSSL 格式 base64 字符串 */
export function encrypt(plaintext: string, password: string): string {
  const salt = getRandomBytes(8)
  const { key, iv } = evpKdf(password, salt, 32, 16)

  const padded = pkcs7Pad(utf8Encode(plaintext))

  const W = keyExpansion(key)
  const ciphertext = new Uint8Array(padded.length)

  for (let i = 0; i < padded.length; i += 16) {
    // 原地异或前块 (padded 加密后不再使用), 首块异或 IV
    for (let j = 0; j < 16; j++) {
      padded[i + j] ^= i === 0 ? iv[j] : ciphertext[i - 16 + j]
    }
    ciphertext.set(aesEncryptBlock(padded.subarray(i, i + 16), W), i)
  }

  const out = new Uint8Array(16 + ciphertext.length)
  out[0] = 0x53
  out[1] = 0x61
  out[2] = 0x6c
  out[3] = 0x74
  out[4] = 0x65
  out[5] = 0x64
  out[6] = 0x5f
  out[7] = 0x5f
  out.set(salt, 8)
  out.set(ciphertext, 16)
  return base64Encode(out)
}

/** AES-256-CBC 解密（OpenSSL 格式） */
export function decrypt(ciphertext: string, password: string): string {
  const bytes = base64Decode(ciphertext)

  if (
    bytes.length < 32 ||
    bytes[0] !== 0x53 ||
    bytes[1] !== 0x61 ||
    bytes[2] !== 0x6c ||
    bytes[3] !== 0x74 ||
    bytes[4] !== 0x65 ||
    bytes[5] !== 0x64 ||
    bytes[6] !== 0x5f ||
    bytes[7] !== 0x5f
  ) {
    logger.error(TAG, 'decrypt', 'invalid header', { length: bytes.length })
    throw new Error('Invalid OpenSSL AES header')
  }

  const salt = bytes.slice(8, 16)
  const encData = bytes.subarray(16)

  if (encData.length % 16 !== 0) {
    logger.error(TAG, 'decrypt', 'invalid length', { length: bytes.length })
    throw new Error('Invalid ciphertext length')
  }

  const { key, iv } = evpKdf(password, salt, 32, 16)

  const W = keyExpansion(key)
  const decrypted = new Uint8Array(encData.length)

  for (let i = 0; i < encData.length; i += 16) {
    const plain = aesDecryptBlock(encData.subarray(i, i + 16), W)
    for (let j = 0; j < 16; j++) {
      decrypted[i + j] = plain[j] ^ (i === 0 ? iv[j] : encData[i - 16 + j])
    }
  }

  if (!isValidPkcs7Padding(decrypted)) {
    logger.warn(TAG, 'decrypt', 'invalid padding', { length: bytes.length })
    throw new Error('Invalid PKCS#7 padding')
  }

  const padLen = decrypted[decrypted.length - 1]
  const unpadded = decrypted.subarray(0, decrypted.length - padLen)
  const plaintext = utf8Decode(unpadded)
  // logger.info(TAG, 'decrypt', { length: unpadded.length, text: JSON.parse(plaintext) as object })

  return plaintext
}
