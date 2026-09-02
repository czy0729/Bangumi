/*
 * @Author: czy0729
 * @Date: 2026-09-02 07:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 07:30:00
 *
 * 自研 protobuf wire-format 读取层: varint / fixed32 / length-delimited + utf8 解码
 * 语义与 protobufjs Reader 对齐: int32 取低 32 位有符号, int64 转 Number, float 按 float32
 */

/** varint 最多占用的字节数 (64 位) */
const MAX_VARINT_BYTES = 10

/** 跳过未知字段的最大群组递归深度, 与 protobufjs 一致 */
const SKIP_RECURSION_LIMIT = 100

/** loose 语义 TextDecoder 惰性单例 (ignoreBOM 与 protobufjs 对齐) */
let looseDecoder: TextDecoder | null = null

function getLooseDecoder(): TextDecoder | null {
  if (typeof TextDecoder === 'undefined') return null
  if (!looseDecoder) looseDecoder = new TextDecoder('utf-8', { ignoreBOM: true })
  return looseDecoder
}

/** wire-format 读取器, 惰性解析, 读取位置单向推进 */
export class WireReader {
  /** 底层字节 */
  buf: Uint8Array

  /** 当前读取位置 */
  pos: number

  /** 可读上界 (嵌套 message / packed 段期间临时收紧) */
  len: number

  /** 惰性创建的 DataView, 用于 float 读取 */
  view: DataView | null

  /** 最近一次 readVarint 的低 32 位 (无符号) */
  lo: number

  /** 最近一次 readVarint 的高 32 位 (无符号) */
  hi: number

  constructor(buf: Uint8Array) {
    this.buf = buf
    this.pos = 0
    this.len = buf.length
    this.view = null
    this.lo = 0
    this.hi = 0
  }

  /** 读取 varint 到 lo/hi, 最多 10 字节, 超长或截断抛错 */
  readVarint(): void {
    const buf = this.buf
    let pos = this.pos
    let lo = 0
    let hi = 0

    for (let i = 0; i < MAX_VARINT_BYTES; ++i) {
      if (pos >= this.len) throw new RangeError('index out of range')
      const b = buf[pos++]
      if (i < 4) {
        lo = (lo | ((b & 127) << (i * 7))) >>> 0
      } else if (i === 4) {
        lo = (lo | ((b & 127) << 28)) >>> 0
        hi = (b & 127) >> 4
      } else {
        hi = (hi | ((b & 127) << ((i - 5) * 7 + 3))) >>> 0
      }
      if (b < 128) {
        this.pos = pos
        this.lo = lo
        this.hi = hi
        return
      }
    }

    throw new Error('invalid varint encoding')
  }

  /** 读取字段 tag 或长度前缀 (无符号 32 位) */
  uint32(): number {
    this.readVarint()
    return this.lo
  }

  /** 读取 int32: 低 32 位按有符号解释 (负数为 10 字节补码编码) */
  int32(): number {
    this.readVarint()
    return this.lo | 0
  }

  /** 读取 int64: 64 位补码转 Number (toObject longs: Number 语义) */
  int64(): number {
    this.readVarint()
    const { lo, hi } = this
    if (hi >>> 31) {
      const nlo = (~lo + 1) >>> 0
      let nhi = ~hi >>> 0
      if (!nlo) nhi = (nhi + 1) >>> 0
      return -(nlo + nhi * 4294967296)
    }
    return lo + hi * 4294967296
  }

  /** 读取 4 字节小端 float32 并按精度还原为 Number */
  float(): number {
    if (this.pos + 4 > this.len) throw new RangeError('index out of range')
    if (!this.view) {
      this.view = new DataView(this.buf.buffer, this.buf.byteOffset, this.buf.byteLength)
    }
    const value = this.view.getFloat32(this.pos, true)
    this.pos += 4
    return value
  }

  /** 读取 length 字节, 返回底层视图 (零拷贝) */
  bytes(length: number): Uint8Array {
    const end = this.pos + length
    if (end > this.len) throw new RangeError('index out of range')
    const value = this.buf.subarray(this.pos, end)
    this.pos = end
    return value
  }

  /** 按 wire type 跳过未知字段 (群组按 protobufjs 语义递归配对) */
  skip(wireType: number, depth: number = 0, fieldNo: number = 0): void {
    if (depth > SKIP_RECURSION_LIMIT) throw new Error('max depth exceeded')

    switch (wireType) {
      case 0:
        do {
          if (this.pos >= this.len) throw new RangeError('index out of range')
        } while (this.buf[this.pos++] & 128)
        break

      case 1:
        this.advance(8)
        break

      case 2:
        this.advance(this.uint32())
        break

      case 3:
        for (;;) {
          const tag = this.uint32()
          const nestedField = tag >>> 3
          const nestedWireType = tag & 7
          if (!nestedField) throw new Error('illegal tag: field number 0')
          if (nestedWireType === 4) {
            if (fieldNo && nestedField !== fieldNo) throw new Error('invalid end group tag')
            break
          }
          this.skip(nestedWireType, depth + 1, nestedField)
        }
        break

      case 5:
        this.advance(4)
        break

      default:
        throw new Error(`invalid wire type ${wireType}`)
    }
  }

  /** 前进 length 字节, 越界抛错 */
  advance(length: number): void {
    if (this.pos + length > this.len) throw new RangeError('index out of range')
    this.pos += length
  }
}

/** utf8 解码入口: ASCII 快速通道 → TextDecoder → 手写兜底 */
export function utf8Decode(bytes: Uint8Array): string {
  const end = bytes.length
  if (end < 1) return ''

  let str = ''
  let i = 0

  for (; i + 7 < end; i += 8) {
    const mask =
      bytes[i] |
      bytes[i + 1] |
      bytes[i + 2] |
      bytes[i + 3] |
      bytes[i + 4] |
      bytes[i + 5] |
      bytes[i + 6] |
      bytes[i + 7]
    if (mask & 0x80) return str + decodeNonAscii(bytes, i, end)
    str += String.fromCharCode(
      bytes[i],
      bytes[i + 1],
      bytes[i + 2],
      bytes[i + 3],
      bytes[i + 4],
      bytes[i + 5],
      bytes[i + 6],
      bytes[i + 7]
    )
  }

  for (; i < end; ++i) {
    const b = bytes[i]
    if (b & 0x80) return str + decodeNonAscii(bytes, i, end)
    str += String.fromCharCode(b)
  }

  return str
}

/** 含非 ASCII 字节的解码 */
function decodeNonAscii(bytes: Uint8Array, start: number, end: number): string {
  const decoder = getLooseDecoder()
  if (decoder) {
    const source = start === 0 && end === bytes.length ? bytes : bytes.subarray(start, end)
    return decoder.decode(source)
  }
  return decodeUtf8Fallback(bytes, start, end)
}

/** TextDecoder 不可用时的手写 UTF-8 解码 (WHATWG 语义, 非法序列输出 U+FFFD) */
function decodeUtf8Fallback(bytes: Uint8Array, start: number, end: number): string {
  let out = ''
  let i = start

  while (i < end) {
    const b1 = bytes[i]

    if (b1 < 128) {
      out += String.fromCharCode(b1)
      i += 1
      continue
    }

    let codePoint = 0xfffd

    if (b1 < 192 || b1 >= 248) {
      // 非法首字节
    } else if (b1 < 224) {
      const b2 = bytes[i + 1]
      if (i + 1 < end && (b2 & 192) === 128) {
        const cp = ((b1 & 31) << 6) | (b2 & 63)
        if (cp >= 128) codePoint = cp
      }
      i += 2
    } else if (b1 < 240) {
      const b2 = bytes[i + 1]
      const b3 = bytes[i + 2]
      if (i + 2 < end && (b2 & 192) === 128 && (b3 & 192) === 128) {
        const cp = ((b1 & 15) << 12) | ((b2 & 63) << 6) | (b3 & 63)
        if (cp >= 2048 && !(cp >= 0xd800 && cp <= 0xdfff)) codePoint = cp
      }
      i += 3
    } else {
      const b2 = bytes[i + 1]
      const b3 = bytes[i + 2]
      const b4 = bytes[i + 3]
      if (i + 3 < end && (b2 & 192) === 128 && (b3 & 192) === 128 && (b4 & 192) === 128) {
        const cp = ((b1 & 7) << 18) | ((b2 & 63) << 12) | ((b3 & 63) << 6) | (b4 & 63)
        if (cp >= 65536 && cp <= 0x10ffff) codePoint = cp
      }
      i += 4
    }

    if (codePoint < 65536) {
      out += String.fromCharCode(codePoint)
    } else {
      // 代理对
      const offset = codePoint - 65536
      out += String.fromCharCode(0xd800 + (offset >> 10), 0xdc00 + (offset & 1023))
    }
  }

  return out
}
