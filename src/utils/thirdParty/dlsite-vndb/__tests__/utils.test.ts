/*
 * @Author: czy0729
 * @Date: 2026-08-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 00:00:00
 */

/** 固定 host 解密耦合; 批大小取 2 便于断言批次行为 */
jest.mock('../ds', () => ({
  __esModule: true,
  HOST_DLSITE: 'https://dl.example',
  HOST_VNDB: 'https://vndb.example',
  MAX_SAMPLE_COUNT: 20,
  PROBE_BATCH_SIZE: 2
}))

/** 第三方请求 barrel (dlsite-vndb/index.ts 内的 '../index') */
jest.mock('../../index', () => ({
  axios: jest.fn()
}))

import { axios } from '../../index'
import {
  buildDlsiteImageUrl,
  extractDlsiteId,
  extractVndbId,
  fetchVndbData,
  isNsfwScreenshot,
  probeDlsiteImages
} from '../index'

import type { VndbVnResult } from '../types'

const mockedAxios = axios as unknown as jest.Mock

/** 每个用例独立 dlsiteId, 规避模块级探测缓存跨用例串扰 */
const ID_A = 'RJ200001' // 文件夹 RJ201000
const ID_B = 'RJ300001' // 文件夹 RJ301000
const ID_C = 'RJ400001' // 文件夹 RJ401000
const ID_D = 'RJ500001' // 文件夹 RJ501000
const ID_E = 'RJ600001' // 文件夹 RJ601000

const DIR_A = 'https://dl.example/modpub/images2/work/doujin/RJ201000'

let mockFetch: jest.Mock

beforeEach(() => {
  jest.resetAllMocks()

  mockFetch = jest.fn()
  global.fetch = mockFetch as unknown as typeof global.fetch
})

describe('extractVndbId', () => {
  it('常规 infobox 提取 v 号', () => {
    expect(extractVndbId('<a href="https://vndb.org/v17">v17</a>')).toBe('v17')
  })

  it('多个匹配取第一个', () => {
    expect(extractVndbId('vndb.org/v17 vndb.org/v99')).toBe('v17')
  })

  it('无匹配返回 null', () => {
    expect(extractVndbId('no link here')).toBeNull()
  })

  it('空入参容错', () => {
    expect(extractVndbId('')).toBeNull()
  })
})

describe('extractDlsiteId', () => {
  it('RJ 与 VJ 均可提取', () => {
    expect(extractDlsiteId('product_id/RJ123456.html')).toBe('RJ123456')
    expect(extractDlsiteId('product_id/VJ012345.html')).toBe('VJ012345')
  })

  it('小写不匹配 (契约: 仅大写前缀)', () => {
    expect(extractDlsiteId('product_id/rj123456.html')).toBeNull()
  })

  it('无匹配返回 null', () => {
    expect(extractDlsiteId('product_id/BJ999999.html')).toBeNull()
    expect(extractDlsiteId('')).toBeNull()
  })
})

describe('isNsfwScreenshot', () => {
  it('sexual 达到 2 即 NSFW', () => {
    expect(isNsfwScreenshot({ sexual: 2, violence: 0 })).toBe(true)
  })

  it('violence 单独达标即 NSFW', () => {
    expect(isNsfwScreenshot({ sexual: 0, violence: 2 })).toBe(true)
  })

  it('双低为非 NSFW', () => {
    expect(isNsfwScreenshot({ sexual: 1, violence: 1 })).toBe(false)
  })

  it('双高为 NSFW', () => {
    expect(isNsfwScreenshot({ sexual: 2, violence: 2 })).toBe(true)
  })
})

describe('buildDlsiteImageUrl', () => {
  it('RJ 进位补零', () => {
    expect(buildDlsiteImageUrl('RJ123456', '_img_main.webp')).toBe(
      'https://dl.example/modpub/images2/work/doujin/RJ124000/RJ123456_img_main.webp'
    )
  })

  it('整千不进位', () => {
    expect(buildDlsiteImageUrl('RJ123000', '_img_main.webp')).toBe(
      'https://dl.example/modpub/images2/work/doujin/RJ123000/RJ123000_img_main.webp'
    )
  })

  it('VJ 走 professional 分支', () => {
    expect(buildDlsiteImageUrl('VJ003456', '_y.webp')).toBe(
      'https://dl.example/modpub/images2/work/professional/VJ004000/VJ003456_y.webp'
    )
  })

  it('低位数 ID 进位后保持原位数', () => {
    expect(buildDlsiteImageUrl('RJ009999', '_z.webp')).toBe(
      'https://dl.example/modpub/images2/work/doujin/RJ010000/RJ009999_z.webp'
    )
  })
})

describe('fetchVndbData', () => {
  it('成功映射 screenshots 与 lengthMinutes', async () => {
    const screenshots = [
      {
        id: 's1',
        url: 'https://t.vndb.org/cv/x.jpg',
        dims: [100, 100],
        sexual: 0,
        violence: 0,
        thumbnail: 'https://t.vndb.org/cvt/x.jpg',
        thumbnail_dims: [50, 50]
      }
    ]
    mockedAxios.mockResolvedValue({
      data: { results: [{ id: 'v17', length_minutes: 90, screenshots }] }
    })

    const result = await fetchVndbData('v17')

    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'post',
        url: 'https://vndb.example/kana/vn'
      })
    )
    expect(result).toEqual({ screenshots, lengthMinutes: 90 })
  })

  it('空 results 返回 null', async () => {
    mockedAxios.mockResolvedValue({ data: { results: [] } })

    expect(await fetchVndbData('v17')).toBeNull()
  })

  it('请求异常吞掉返回 null', async () => {
    mockedAxios.mockRejectedValue(new Error('network down'))

    await expect(fetchVndbData('v17')).resolves.toBeNull()
  })

  it('[问题] length_minutes 缺失时返回 0 而非 undefined', async () => {
    const vn = { id: 'v17', screenshots: [] } as VndbVnResult
    mockedAxios.mockResolvedValue({ data: { results: [vn] } })

    const result = await fetchVndbData('v17')

    // 缺失时旧实现返回 undefined, consumer 的 (x / 60).toFixed(1) 会产出 "NaNh" 并写入缓存
    expect(result?.lengthMinutes).toBe(0)
  })
})

describe('probeDlsiteImages', () => {
  it('主图失败短路: 空数组且不再探测 sample', async () => {
    mockFetch.mockResolvedValue({ ok: false })

    const result = await probeDlsiteImages(ID_A)

    expect(result).toEqual([])
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(`${DIR_A}/${ID_A}_img_main.webp`, {
      method: 'HEAD'
    })
  })

  it('smpa 优先于 smp; 双缺失停批且不再请求后续组', async () => {
    mockFetch.mockImplementation(async (url: string) => ({
      ok: url === `${DIR_B()}/${ID_B}_img_main.webp` || url.includes('_img_smpa1.webp')
    }))

    const result = await probeDlsiteImages(ID_B)

    // n1 命中 smpa1 (单次请求); n2 双缺失 (2 次); 之后停止
    expect(result.map(item => item.url)).toEqual([
      `${DIR_B()}/${ID_B}_img_main.webp`,
      `${DIR_B()}/${ID_B}_img_smpa1.webp`
    ])
    expect(mockFetch).toHaveBeenCalledTimes(4)
    expect(requestedUrls()).toContain(`${DIR_B()}/${ID_B}_img_smp2.webp`)
    expect(
      requestedUrls().some(url => url.includes('_img_smpa3') || url.includes('_img_smp3'))
    ).toBe(false)
  })

  it('[语义] 批内空洞后的命中被丢弃, 输出与旧串行实现一致', async () => {
    // n1 双缺失, n2 smpa2 命中: 并发下 n2 已发出请求, 但收录必须在 n1 处停止
    mockFetch.mockImplementation(async (url: string) => ({
      ok: url === `${DIR_C()}/${ID_C}_img_main.webp` || url.includes('_img_smpa2.webp')
    }))

    const result = await probeDlsiteImages(ID_C)

    expect(result.map(item => item.url)).toEqual([`${DIR_C()}/${ID_C}_img_main.webp`])
    // main + n1(smpa,smp) + n2(smpa 命中即止)
    expect(mockFetch).toHaveBeenCalledTimes(4)
    expect(requestedUrls()).toContain(`${DIR_C()}/${ID_C}_img_smpa2.webp`)
  })

  it('全部命中时以 20 组封顶', async () => {
    mockFetch.mockResolvedValue({ ok: true })

    const result = await probeDlsiteImages(ID_D)

    expect(result).toHaveLength(21)
    expect(result[20]?.url).toBe(`${DIR_D()}/${ID_D}_img_smpa20.webp`)
    expect(mockFetch).toHaveBeenCalledTimes(21)
  })

  it('会话级 memo: 二次调用零网络, 并发同 id 共享同一 Promise', async () => {
    mockFetch.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ ok: false }), 0))
    )

    const pendingA = probeDlsiteImages(ID_E)
    const pendingB = probeDlsiteImages(ID_E)

    expect(pendingB).toBe(pendingA)

    await Promise.all([pendingA, pendingB])
    expect(mockFetch).toHaveBeenCalledTimes(1)

    // 负结果同样复用
    await probeDlsiteImages(ID_E)
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })
})

/** 目录地址辅助 (文件夹推导正确性已由 buildDlsiteImageUrl 用例覆盖) */
function DIR_B() {
  return 'https://dl.example/modpub/images2/work/doujin/RJ301000'
}

function DIR_C() {
  return 'https://dl.example/modpub/images2/work/doujin/RJ401000'
}

function DIR_D() {
  return 'https://dl.example/modpub/images2/work/doujin/RJ501000'
}

function requestedUrls() {
  return mockFetch.mock.calls.map(call => call[0] as string)
}
