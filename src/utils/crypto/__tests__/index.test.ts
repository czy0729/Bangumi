/*
 * @Author: czy0729
 * @Date: 2026-09-01 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 00:00:00
 */
import CryptoJS from 'crypto-js'
import SHA1Ref from 'crypto-js/sha1'
import SHA256Ref from 'crypto-js/sha256'
import { decrypt, encrypt } from '../aes'
import { hmacSHA256 } from '../hmac-sha256'
import { SHA1 } from '../sha1'
import { SHA256 } from '../sha256'

describe('SHA1', () => {
  it('空字符串', () => {
    expect(SHA1('')).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709')
  })

  it('abc', () => {
    expect(SHA1('abc')).toBe('a9993e364706816aba3e25717850c26c9cd0d89d')
  })

  it('hello world', () => {
    expect(SHA1('hello world')).toBe('2aae6c35c94fcfb415dbe95f408b9ce91ee846ed')
  })

  it('与 crypto-js 结果一致 (含中文/emoji/孤立代理对)', () => {
    const inputs = [
      '',
      'abc',
      'hello world',
      'The quick brown fox jumps over the lazy dog',
      'bangumi',
      '机核GCORES',
      '动漫星空 🎉 😀',
      'a'.repeat(1000)
    ]
    inputs.forEach(input => {
      expect(SHA1(input)).toBe(SHA1Ref(input).toString())
    })
  })
})

describe('SHA256', () => {
  it('空字符串', () => {
    expect(SHA256('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  })

  it('abc', () => {
    expect(SHA256('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
  })

  it('与 crypto-js 结果一致 (含中文/emoji/长输入)', () => {
    const inputs = ['', 'abc', 'hello world', '机核GCORES', '动漫星空 🎉 😀', 'a'.repeat(1000)]
    inputs.forEach(input => {
      expect(SHA256(input)).toBe(SHA256Ref(input).toString(CryptoJS.enc.Hex))
    })
  })
})

describe('AES encrypt/decrypt', () => {
  const password = 'bgm8885c4d524cd61fc'

  it('密文以 Salted__ 格式开头', () => {
    const enc = encrypt('hello', password)
    // base64("Salted__") starts with "U2FsdGVkX1"
    expect(enc).toMatch(/^U2FsdGVkX1/)
  })

  it('加解密往返一致', () => {
    const data = 'hello world'
    const enc = encrypt(data, password)
    const dec = decrypt(enc, password)
    expect(dec).toBe(data)
  })

  it('JSON 对象加解密往返', () => {
    const data = JSON.stringify({ name: 'test', value: 42 })
    const enc = encrypt(data, password)
    const dec = decrypt(enc, password)
    expect(JSON.parse(dec)).toEqual({ name: 'test', value: 42 })
  })

  it('空字符串加解密', () => {
    const enc = encrypt('', password)
    const dec = decrypt(enc, password)
    expect(dec).toBe('')
  })

  it('中文与 emoji 加解密往返', () => {
    const data = '机核GCORES "动漫星空" 🎉 😀 \n\t"quote"\\slash'
    const enc = encrypt(data, password)
    const dec = decrypt(enc, password)
    expect(dec).toBe(data)
  })

  it('与 crypto-js 交叉解密：crypto-js 加密 → 自研解密', () => {
    const data = 'cross-compatible-test'
    const enc = CryptoJS.AES.encrypt(data, password).toString()
    const dec = decrypt(enc, password)
    expect(dec).toBe(data)
  })

  it('与 crypto-js 交叉解密：crypto-js 加密中文 → 自研解密', () => {
    const data = '机核GCORES 动漫星空 🎉'
    const enc = CryptoJS.AES.encrypt(data, password).toString()
    const dec = decrypt(enc, password)
    expect(dec).toBe(data)
  })

  it('与 crypto-js 交叉解密：自研加密 → crypto-js 解密', () => {
    const data = 'cross-compatible-test-2'
    const enc = encrypt(data, password)
    const bytes = CryptoJS.AES.decrypt(enc, password)
    const dec = bytes.toString(CryptoJS.enc.Utf8)
    expect(dec).toBe(data)
  })

  it('与 crypto-js 交叉解密：自研加密中文 → crypto-js 解密', () => {
    const data = '机核GCORES 动漫星空 🎉'
    const enc = encrypt(data, password)
    const bytes = CryptoJS.AES.decrypt(enc, password)
    const dec = bytes.toString(CryptoJS.enc.Utf8)
    expect(dec).toBe(data)
  })

  it('解密存量密文金样本 (旧版 crypto-js 加密)', () => {
    expect(decrypt('U2FsdGVkX18vV4hUPCdJbY/D2eIpYRzHSc1F5GyFbc0=', password)).toBe('"机核GCORES"')
  })

  it('截断密文抛错', () => {
    const enc = encrypt('tamper-test-data', password)
    expect(() => decrypt(enc.slice(0, enc.length - 4), password)).toThrow()
    expect(() => decrypt(enc.slice(0, 20), password)).toThrow()
  })

  it('非 OpenSSL 头抛错', () => {
    expect(() => decrypt('aGVsbG8gd29ybGQ=', password)).toThrow('Invalid OpenSSL AES header')
  })

  it('每次加密产生不同密文（随机盐）', () => {
    const enc1 = encrypt('same', password)
    const enc2 = encrypt('same', password)
    expect(enc1).not.toBe(enc2)
    // 但解密结果相同
    expect(decrypt(enc1, password)).toBe('same')
    expect(decrypt(enc2, password)).toBe('same')
  })
})

describe('hmacSHA256', () => {
  it('返回 64 字符十六进制', () => {
    const result = hmacSHA256('secret', 'message')
    expect(result).toHaveLength(64)
    expect(result).toMatch(/^[0-9a-f]{64}$/)
  })

  it('与 crypto-js 结果一致', () => {
    const tests = [
      ['hello', 'secret'],
      ['', 'key'],
      ['message', ''],
      ['The quick brown fox', 'jumps over the lazy dog'],
      ['机核GCORES', '动漫星空密钥 🎉'],
      ['\u4e2d\u6587', '\u65e5\u672c\u8a9e']
    ]
    tests.forEach(([message, secret]) => {
      const expected = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex)
      expect(hmacSHA256(secret, message)).toBe(expected)
    })
  })

  it('超过 64 字节的密钥与 crypto-js 结果一致', () => {
    const secret = 'k'.repeat(100)
    const expected = CryptoJS.HmacSHA256('message', secret).toString(CryptoJS.enc.Hex)
    expect(hmacSHA256(secret, 'message')).toBe(expected)
  })

  it('不同输入产生不同输出', () => {
    const h1 = hmacSHA256('key', 'msg1')
    const h2 = hmacSHA256('key', 'msg2')
    const h3 = hmacSHA256('key2', 'msg1')
    expect(h1).not.toBe(h2)
    expect(h1).not.toBe(h3)
  })
})
