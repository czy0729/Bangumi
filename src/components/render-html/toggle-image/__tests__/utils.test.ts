/*
 * @Author: czy0729
 * @Date: 2026-09-16 20:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 20:30:00
 */
import { computeHeaders } from '@components/image/utils'
import { axios } from '@utils/thirdParty'
import { getSize } from '../utils'

// 全局 jest/setup 把 @utils/thirdParty mock 成 { axios: jest.fn() } (既没有返回结构也没有 head),
// 这里必须覆盖成可控实现, 否则断言不到请求参数与响应结构
jest.mock('@utils/thirdParty', () => ({ axios: jest.fn() }))

// 只保留一个可断言的请求头来源, 避免测试依赖 @components/image 的重依赖链
jest.mock('@components/image/utils', () => ({
  computeHeaders: jest.fn(() => ({ Referer: 'https://bgm.tv/' }))
}))

// 让代理地址与直连地址不同, 才能验证「只在 405 / 501 时回退」;
// normalizeLainImageUrl 用真实实现: 回退目标是否归一化正是被测行为之一
jest.mock('@utils/proxy', () => ({
  ...jest.requireActual('@utils/proxy/normalize'),
  applyLainProxy: jest.fn((url: string) => url.replace('lain.bgm.tv', 'node.example.com'))
}))

const mockAxios = axios as unknown as jest.Mock
const mockComputeHeaders = computeHeaders as unknown as jest.Mock

/** 每个用例用独立地址: CACHE 是模块级状态, 同址会命中缓存影响断言 */
const url = (name: string) => `https://lain.bgm.tv/pic/${name}.jpg`

describe('getSize', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('200 且带 content-length 时返回 KB 体积, 请求头与渲染同源', async () => {
    mockAxios.mockResolvedValue({ status: 200, headers: { 'content-length': '204800' } })

    await expect(getSize(url('a'))).resolves.toBe(200)

    expect(mockAxios).toHaveBeenCalledTimes(1)
    expect(mockAxios).toHaveBeenCalledWith({
      method: 'head',
      url: 'https://node.example.com/pic/a.jpg',
      headers: { Referer: 'https://bgm.tv/' },
      timeout: 8000
    })
    // 请求头按「原始地址」计算 (与组件渲染一致), 而不是按改写后的节点地址
    expect(mockComputeHeaders).toHaveBeenCalledWith(url('a'))
  })

  it('content-length 大小写不敏感', async () => {
    mockAxios.mockResolvedValue({ status: 200, headers: { 'Content-Length': '512000' } })

    await expect(getSize(url('b'))).resolves.toBe(500)
  })

  it('小于 1KB 的图向上取整为 1, 不与「探测失败」混淆', async () => {
    mockAxios.mockResolvedValue({ status: 200, headers: { 'content-length': '600' } })

    await expect(getSize(url('c'))).resolves.toBe(1)
  })

  it('缺少 content-length 时返回 0 并缓存, 不重复请求', async () => {
    mockAxios.mockResolvedValue({ status: 200, headers: {} })

    await expect(getSize(url('d'))).resolves.toBe(0)
    expect(mockAxios).toHaveBeenCalledTimes(1)

    // 命中缓存同步返回 (签名本身允许 number), 不再发请求
    expect(getSize(url('d'))).toBe(0)
    expect(mockAxios).toHaveBeenCalledTimes(1)
  })

  it('节点返回 405 时回退直连 (更短超时)', async () => {
    mockAxios
      .mockResolvedValueOnce({ status: 405, headers: {} })
      .mockResolvedValueOnce({ status: 200, headers: { 'content-length': '102400' } })

    await expect(getSize(url('e'))).resolves.toBe(100)

    expect(mockAxios).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ url: 'https://node.example.com/pic/e.jpg', timeout: 8000 })
    )
    expect(mockAxios).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ url: url('e'), timeout: 3000 })
    )
  })

  it('节点返回 500 时不回退, 直接记 0', async () => {
    mockAxios.mockResolvedValue({ status: 500, headers: {} })

    await expect(getSize(url('f'))).resolves.toBe(0)
    expect(mockAxios).toHaveBeenCalledTimes(1)
  })

  it('请求 reject 时返回 0 (调用方不会拿到 unhandled rejection)', async () => {
    mockAxios.mockRejectedValue(new Error('network error'))

    await expect(getSize(url('g'))).resolves.toBe(0)
  })

  it('包装层同步抛错 (如旧实现的 axios.head 不存在) 时返回 0 并 settle', async () => {
    mockAxios.mockImplementation(() => {
      throw new TypeError('axios.head is not a function')
    })

    await expect(getSize(url('h'))).resolves.toBe(0)
  })

  it('非法地址不发请求', () => {
    expect(getSize('')).toBe(0)
    expect(getSize(undefined as unknown as string)).toBe(0)
    expect(mockAxios).not.toHaveBeenCalled()
  })

  it('同地址并发只发一次请求 (在途去重)', async () => {
    mockAxios.mockImplementation(
      () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ status: 200, headers: { 'content-length': '1024' } }), 10)
        })
    )

    const [first, second] = await Promise.all([getSize(url('i')), getSize(url('i'))])

    expect(first).toBe(1)
    expect(second).toBe(1)
    expect(mockAxios).toHaveBeenCalledTimes(1)
  })

  it('历史旧代理域名 + http: 请求地址为归一化并补协议后的节点地址', async () => {
    mockAxios.mockResolvedValue({ status: 200, headers: { 'content-length': '204800' } })

    await expect(getSize('http://old-node.example.com/pic/cover/l/x.jpg')).resolves.toBe(200)

    expect(mockAxios).toHaveBeenCalledTimes(1)
    expect(mockAxios).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://node.example.com/pic/cover/l/x.jpg' })
    )
  })

  it('405 回退目标是归一化后的官方域, 不是历史旧域名', async () => {
    mockAxios
      .mockResolvedValueOnce({ status: 405, headers: {} })
      .mockResolvedValueOnce({ status: 200, headers: { 'content-length': '102400' } })

    await expect(getSize('https://old-node.example.com/pic/cover/l/y.jpg')).resolves.toBe(100)

    expect(mockAxios).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ url: 'https://node.example.com/pic/cover/l/y.jpg' })
    )
    expect(mockAxios).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ url: 'https://lain.bgm.tv/pic/cover/l/y.jpg', timeout: 3000 })
    )
  })
})

describe('getSize 缓存有效期', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('已知体积永久缓存, 过期时间不影响', async () => {
    mockAxios.mockResolvedValue({ status: 200, headers: { 'content-length': '1024' } })

    await expect(getSize(url('ttl-known'))).resolves.toBe(1)

    jest.advanceTimersByTime(24 * 60 * 60 * 1000)

    expect(getSize(url('ttl-known'))).toBe(1)
    expect(mockAxios).toHaveBeenCalledTimes(1)
  })

  it('无法确定体积 (0) 过期后允许重新探测, 一次抖动不会永久失效', async () => {
    mockAxios.mockResolvedValueOnce({ status: 200, headers: {} })
    await expect(getSize(url('ttl-unknown'))).resolves.toBe(0)

    // 未过期: 命中缓存
    expect(getSize(url('ttl-unknown'))).toBe(0)
    expect(mockAxios).toHaveBeenCalledTimes(1)

    // 过期后重新请求 (节点这次转发了 content-length)
    jest.advanceTimersByTime(5 * 60 * 1000 + 1)
    mockAxios.mockResolvedValueOnce({ status: 200, headers: { 'content-length': '204800' } })

    await expect(getSize(url('ttl-unknown'))).resolves.toBe(200)
    expect(mockAxios).toHaveBeenCalledTimes(2)
  })
})
