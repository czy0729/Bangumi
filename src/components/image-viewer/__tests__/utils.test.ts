/*
 * @Author: czy0729
 * @Date: 2026-08-14 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 10:00:00
 */
import { applyLainProxy } from '@utils/proxy'
import { getCurrentUrl, getProxyImageUrls } from '../utils'

jest.mock('@utils/proxy', () => ({
  applyLainProxy: jest.fn(url => `p:${url}`)
}))

const mockApplyLainProxy = applyLainProxy as jest.Mock

describe('getProxyImageUrls', () => {
  it('空数组返回空数组', () => {
    expect(getProxyImageUrls([])).toEqual([])
  })

  it('url 套代理, 保留 _url 与 headers', () => {
    const input = [
      {
        url: 'https://lain.bgm.tv/a.jpg',
        _url: 'https://lain.bgm.tv/b.jpg',
        headers: { Referer: 'https://bgm.tv' }
      }
    ]
    const result = getProxyImageUrls(input)
    expect(result).toEqual([
      {
        url: 'p:https://lain.bgm.tv/a.jpg',
        _url: 'p:https://lain.bgm.tv/b.jpg',
        headers: { Referer: 'https://bgm.tv' }
      }
    ])
    expect(mockApplyLainProxy).toHaveBeenNthCalledWith(1, 'https://lain.bgm.tv/a.jpg')
    expect(mockApplyLainProxy).toHaveBeenNthCalledWith(2, 'https://lain.bgm.tv/b.jpg')
  })

  it('无 _url 时保持 undefined', () => {
    const result = getProxyImageUrls([{ url: 'https://lain.bgm.tv/a.jpg' }])
    expect(result[0].url).toBe('p:https://lain.bgm.tv/a.jpg')
    expect(result[0]._url).toBeUndefined()
  })
})

describe('getCurrentUrl', () => {
  it('优先取 _url', () => {
    expect(getCurrentUrl([{ url: 'a', _url: 'b' }], 0)).toBe('b')
  })

  it('无 _url 时取 url', () => {
    expect(getCurrentUrl([{ url: 'a' }], 0)).toBe('a')
  })

  it('索引越界返回空字符串', () => {
    expect(getCurrentUrl([{ url: 'a' }], 5)).toBe('')
  })
})
