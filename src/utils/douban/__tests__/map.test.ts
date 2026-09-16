/*
 * @Author: czy0729
 * @Date: 2026-09-17 15:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 15:00:00
 */
/** xhrTimeout 是 xhrCustom 的薄封装, 实现走同文件引用, 这里补一份同构的走 mock */
jest.mock('../../fetch', () => {
  const xhrCustom = jest.fn()
  return {
    xhrCustom,
    xhrTimeout: (url: string, timeout: number = 8000, headers?: Record<string, string>) => {
      let timer: ReturnType<typeof setTimeout> | undefined
      return Promise.race([
        xhrCustom({ url, headers }),
        new Promise<never>((_resolve, reject) => {
          timer = setTimeout(() => reject(new Error('xhr timeout')), timeout)
        })
      ]).finally(() => clearTimeout(timer))
    }
  }
})
jest.mock('../../thirdParty/html', () => ({ cheerio: jest.fn() }))

import { getManualDoubanId } from '../index'
import DOUBAN_MAP from '../map.json'

describe('getManualDoubanId 手动映射', () => {
  it('命中映射时直接返回对应 id (跳过搜索与匹配)', () => {
    expect(getManualDoubanId('633836')).toBe('37295319')
  })

  it('数字与字符串入参等价', () => {
    expect(getManualDoubanId(633836)).toBe(getManualDoubanId('633836'))
  })

  it('未命中时返回 false', () => {
    expect(getManualDoubanId('999999999')).toBe(false)
  })

  it('映射表内每条值都是非空字符串', () => {
    Object.keys(DOUBAN_MAP).forEach(key => {
      expect(typeof DOUBAN_MAP[key]).toBe('string')
      expect(DOUBAN_MAP[key]).toBeTruthy()
    })
  })
})
