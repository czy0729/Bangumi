/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import { APP_ID } from '@constants/app'
import { decrypt } from '../../thirdParty/crypto'
import { ORDER, SEGMENTS } from '../supporter/ds'
import { getSupporterConfig } from '../worker'

// 本文件需要真实加解密实现, 覆盖 jest/setup.js 里的精简 mock
jest.mock('@utils/thirdParty/crypto', () => jest.requireActual('@utils/thirdParty/crypto'))

/** 与 src/utils/kv/supporter/index.ts 一致 */
const STEP = 3

/** 解码 */
function decode(segment: string): string {
  let out = ''
  for (let i = 0; i < segment.length; i++) {
    out += String.fromCharCode(segment.charCodeAt(i) + STEP)
  }

  return out
}

/** 按顺序组装 */
function assemble(key: keyof typeof SEGMENTS): string {
  return ORDER.map(index => decode(SEGMENTS[key][index])).join('')
}

describe('字段数据', () => {
  it('不含明文特征', () => {
    Object.values(SEGMENTS).forEach(segments => {
      segments.forEach(segment => {
        expect(segment).not.toContain('U2Fs')
      })
    })
  })

  it('存储顺序与读取顺序不同', () => {
    expect(ORDER).toEqual([1, 0])
  })

  it('用公开常量无法解出', () => {
    expect(() => decrypt(assemble('host'), APP_ID)).toThrow()
  })
})

describe('getSupporterConfig', () => {
  it('能读取到配置', () => {
    const config = getSupporterConfig()

    expect(config.host.startsWith('https://')).toBe(true)
    expect(config.lainHost.startsWith('https://')).toBe(true)
    expect(config.secret.length).toBeGreaterThan(0)
    expect(config.lainSecret.length).toBeGreaterThan(0)
  })

  it('多次调用返回同一对象', () => {
    expect(getSupporterConfig()).toBe(getSupporterConfig())
  })
})
