/*
 * @Author: czy0729
 * @Date: 2026-09-17 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 14:00:00
 */
jest.mock('@constants/cdn', () => ({
  HOST_DB: 'https://db-test.com',
  HOST_DB_M: 'https://m.db-test.com',
  HOST_DB_MOVIE: 'https://movie.db-test.com',
  HOST_AC_REFERER: 'ac-test.com'
}))

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

import { xhrCustom } from '../../fetch'
import { cheerio } from '../../thirdParty/html'
import { getPreview } from '../index'

const mockXhr = xhrCustom as jest.MockedFunction<typeof xhrCustom>
const mockCheerio = cheerio as jest.MockedFunction<typeof cheerio>

const ID = '35460732'
const P1 = 'https://img1.example.com/view/photo/m/public/p1.jpg'
const P2 = 'https://img9.example.com/view/photo/m/public/p2.jpg'
const COVER = 'https://img1.db-test.com/cover.jpg'
const GAME = 'https://img1.db-test.com/game.jpg'
const HTML = { _response: '<html />' } as never

/** 第 i 次请求的 url */
const reqUrl = (i: number) => mockXhr.mock.calls[i][0].url

/** 让网页版分支能解析出指定图片 */
function mockHTML(images: string[]) {
  const collection = { length: images.length, map: () => ({ get: () => images }) }
  mockCheerio.mockImplementation((() => () => collection) as never)
}

/** 移动端接口的返回, urls 顺序即接口顺序 (较早在前) */
function photosResponse(urls: (string | undefined)[]) {
  const photos = urls.map(url => ({ image: url ? { normal: { url } } : {} }))
  return { _response: JSON.stringify({ photos }) } as never
}

describe('getPreview 移动端优先', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('移动端拿到数据时直接返回, 不再走网页版', async () => {
    mockXhr.mockResolvedValueOnce(photosResponse([P1.replace('https://', 'http://'), P2]))

    const result = await getPreview(ID)

    /** 接口为较早在前, 返回前反转为较新在前, 对齐网页版口径 */
    expect(result.data).toEqual([P2, P1])
    expect(result.referer).toBe('https://movie.db-test.com/subject/35460732')
    expect(mockXhr).toHaveBeenCalledTimes(1)
    expect(mockXhr.mock.calls[0][0].headers).toEqual({ Referer: 'https://m.db-test.com' })
    expect(mockCheerio).not.toHaveBeenCalled()
  })

  it.each([
    [
      '取样固定在列表头部, 并带路径与移动端标记',
      undefined,
      ['count=12&start=0', '/rexxar/api/v2/movie/35460732/photos', 'for_mobile=1']
    ],
    ['maxCount 透传', 40, ['count=40&start=0']]
  ])('%s', async (_name, maxCount, expects) => {
    mockXhr.mockResolvedValueOnce(photosResponse([P1]))

    await getPreview(ID, undefined, maxCount)

    expect(expects.every(item => reqUrl(0).includes(item))).toBe(true)
  })

  it('过滤掉没有地址的脏数据', async () => {
    mockXhr.mockResolvedValueOnce(photosResponse([P1, undefined]))

    const result = await getPreview(ID)

    expect(result.data).toEqual([P1])
  })

  it('移动端没有数据时回落到网页版', async () => {
    mockHTML([COVER])
    mockXhr.mockResolvedValueOnce(photosResponse([])).mockResolvedValue(HTML)

    const result = await getPreview(ID)

    expect(result.data).toEqual([COVER])
    expect([reqUrl(1).includes('subtype=o'), reqUrl(2).includes('subtype=a')]).toEqual([true, true])
  })

  it('移动端异常时回落到网页版', async () => {
    mockHTML([COVER])
    mockXhr.mockResolvedValue(HTML)
    mockXhr.mockRejectedValueOnce(new Error('network'))

    const result = await getPreview(ID)

    expect(result.data).toEqual([COVER])
    expect(reqUrl(1)).toContain('subtype=o')
  })

  it('game 分支不请求移动端接口', async () => {
    mockHTML([GAME])
    mockXhr.mockResolvedValue(HTML)

    const result = await getPreview('123', 'game')

    expect(result.data).toEqual([GAME])
    expect(reqUrl(0)).toContain('/game/123/photos/')
  })

  it('移动端超时后回落到网页版', async () => {
    jest.useFakeTimers()
    try {
      mockHTML([COVER])
      mockXhr.mockResolvedValue(HTML)
      /** 首次调用永不 settle, 模拟 xhrCustom 挂起 */
      mockXhr.mockImplementationOnce((() => new Promise(() => {})) as never)

      const pending = getPreview(ID)
      await jest.advanceTimersByTimeAsync(8000)

      const result = await pending
      expect(result.data).toEqual([COVER])
      expect(reqUrl(1)).toContain('subtype=o')
    } finally {
      jest.useRealTimers()
    }
  })

  it('无 id 时直接返回空', async () => {
    const result = await getPreview(false)

    expect(result).toEqual({ data: [], referer: '' })
    expect(mockXhr).not.toHaveBeenCalled()
  })
})
