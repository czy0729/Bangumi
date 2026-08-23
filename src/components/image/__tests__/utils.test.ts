/*
 * @Author: czy0729
 * @Date: 2026-08-24 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-24 02:50:06
 */
jest.mock('@stores', () => {
  const colors = {
    colorDanger: '#danger',
    colorPrimary: '#primary',
    colorSuccess: '#success',
    colorWarning: '#warning',
    colorBid: '#bid',
    colorBorder: '#border'
  }

  return {
    _: Object.assign(colors, {
      select: (light: unknown) => light,
      flatten: styles => Object.assign({}, ...styles),
      hairlineWidth: 1,
      radiusXs: 2,
      isDark: false,
      shadow: { shadowColor: '#shadow', elevation: 2 }
    }),
    systemStore: { setting: {}, coverRadius: 4, dev: false, devEvent: {} }
  }
})

jest.mock('@constants', () => ({
  IOS: false,
  WEB: false,
  HOST: 'https://bgm.tv',
  HOST_IMAGE: '//lain.bgm.tv',
  HOST_CDN: 'https://cdn.example.com',
  HOST_BGM_STATIC: 'https://lain.bgm.tv'
}))

jest.mock('../../skeleton/utils', () => ({
  getSkeletonColor: () => '#skeleton'
}))

jest.mock('@utils', () => ({
  getCover400: (src, size) => `${src}?size=${size}`,
  getStorage: jest.fn(),
  setStorage: jest.fn(),
  showImageViewer: jest.fn()
}))

jest.mock('@utils/fetch', () => ({
  t: jest.fn()
}))

jest.mock('@utils/thirdParty/image-cache-manager', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => ({ getPath: async () => null }))
  }
}))

import { showImageViewer } from '@utils'
import { t } from '@utils/fetch'
import ImageCacheManager from '@utils/thirdParty/image-cache-manager'
import {
  checkBgmEmoji,
  checkError404,
  checkError451,
  checkErrorTimeout,
  checkLocalError,
  clearErrorTimeout,
  computeHeaders,
  computeImageStyles,
  fixedRemoteImageUrl,
  getAutoSize,
  getDevStyles,
  getLocalCache,
  getLocalCacheStatic,
  getNextRetryDelay,
  getRecoveryBgmCover,
  imageViewerCallback,
  parseCdnProbeError,
  setError404,
  setError451,
  setErrorTimeout,
  timeoutPromise
} from '../utils'

import type { EventType } from '@types'
import type { Props as ImageProps, State } from '../types'

function mkProps(overrides?: Partial<ImageProps>): ImageProps {
  return {
    src: 'https://lain.bgm.tv/pic/cover/l/x.jpg',
    size: 40,
    autoSize: 0,
    border: false,
    borderWidth: 1,
    radius: false,
    shadow: false,
    placeholder: false,
    skeleton: false,
    ...overrides
  }
}

function mkState(overrides?: Partial<State>): State {
  return {
    uri: undefined,
    width: 0,
    height: 0,
    loaded: false,
    animFinished: true,
    error: false,
    ...overrides
  }
}

const baseStyles = {
  border: { borderWidth: 1, borderColor: '#border' },
  shadow: { shadowColor: '#shadow', elevation: 2 },
  shadowLg: { shadowColor: '#shadow-lg', elevation: 16 },
  placeholder: { backgroundColor: '#placeholder' }
}

function mkOptions(overrides: Record<string, unknown> = {}) {
  return {
    borderRadius: 4,
    dev: false,
    fallbacked: false,
    fileSize: 0,
    styles: baseStyles,
    isDark: false,
    hairlineWidth: 1,
    devEventText: false,
    ...overrides
  }
}

describe('fixedRemoteImageUrl', () => {
  it('协议相对地址补全 https:', () => {
    expect(fixedRemoteImageUrl('//lain.bgm.tv/pic/x.jpg')).toBe('https://lain.bgm.tv/pic/x.jpg')
  })

  it('./ 开头的本地地址原样返回', () => {
    expect(fixedRemoteImageUrl('./local.png')).toBe('./local.png')
  })

  it('http 的 HOST_IMAGE 地址升级为 https', () => {
    expect(fixedRemoteImageUrl('http://lain.bgm.tv/pic/x.jpg')).toBe(
      'https://lain.bgm.tv/pic/x.jpg'
    )
  })

  it('其他 http 地址不升级', () => {
    expect(fixedRemoteImageUrl('http://other.com/x.jpg')).toBe('http://other.com/x.jpg')
  })

  it('非字符串原样返回', () => {
    expect(fixedRemoteImageUrl(123 as any)).toBe(123)
  })
})

describe('getAutoSize', () => {
  it('autoSize 等比缩放并向下取整', () => {
    expect(getAutoSize(300, 201, 150, 0)).toEqual({ width: 150, height: 100 })
  })

  it('宽度小于 autoSize 时原样返回', () => {
    expect(getAutoSize(50, 25, 100, 0)).toEqual({ width: 50, height: 25 })
  })

  it('宽度为 0 时原样返回', () => {
    expect(getAutoSize(0, 100, 100, 0)).toEqual({ width: 0, height: 100 })
  })

  it('autoHeight 反算宽度', () => {
    expect(getAutoSize(200, 100, 0, 50)).toEqual({ width: 100, height: 50 })
  })

  it('autoHeight 且高度为 0 返回零尺寸', () => {
    expect(getAutoSize(200, 0, 0, 50)).toEqual({ width: 0, height: 0 })
  })
})

describe('checkBgmEmoji', () => {
  it('bgm 未本地化表情返回 true', () => {
    expect(checkBgmEmoji('https://lain.bgm.tv/img/smiles/tv/14.gif')).toBe(true)
  })

  it('普通地址返回 false', () => {
    expect(checkBgmEmoji('https://lain.bgm.tv/pic/x.jpg')).toBe(false)
  })

  it('非字符串返回 false', () => {
    expect(checkBgmEmoji(undefined)).toBe(false)
  })
})

describe('setError451 / setError404 / setErrorTimeout 标记', () => {
  it('setError451 已存在时返回 true 表示此前已记录 (而非设置成功)', () => {
    const src = 'https://mark.test/451-a.jpg'
    expect(checkError451(src)).toBe(false)
    expect(setError451(src)).toBe(false)
    expect(checkError451(src)).toBe(true)
    expect(setError451(src)).toBe(true)
  })

  it('404 记录与检查一致', () => {
    const src = 'https://mark.test/404-a.jpg'
    expect(checkError404(src)).toBe(false)
    setError404(src)
    expect(checkError404(src)).toBe(true)
  })

  it('clearErrorTimeout 只在实删时返回 true', () => {
    const src = 'https://mark.test/timeout-a.jpg'
    setErrorTimeout(src)
    expect(checkErrorTimeout(src)).toBe(true)
    expect(clearErrorTimeout(src)).toBe(true)
    expect(clearErrorTimeout(src)).toBe(false)
    expect(checkErrorTimeout(src)).toBe(false)
  })

  it('不同 src 互不影响', () => {
    expect(checkError451('https://mark.test/other-451.jpg')).toBe(false)
  })
})

describe('checkLocalError', () => {
  it('bgm 未本地化表情直接判定错误', () => {
    expect(checkLocalError('https://lain.bgm.tv/img/smiles/bgm/13.png')).toBe(true)
  })

  it('已记录 404 判定错误', () => {
    const src = 'https://local.test/404-b.jpg'
    setError404(src)
    expect(checkLocalError(src)).toBe(true)
  })

  it('干净地址返回 false', () => {
    expect(checkLocalError('https://lain.bgm.tv/pic/clean.jpg')).toBe(false)
  })
})

describe('computeHeaders', () => {
  it('lain 域名默认带 Referer', () => {
    expect(computeHeaders('https://lain.bgm.tv/pic/x.jpg')).toEqual({
      Referer: 'https://bgm.tv/'
    })
  })

  it('lain 域名自定义 headers 合并且可覆盖默认值', () => {
    expect(computeHeaders('https://lain.bgm.tv/pic/x.jpg', { Referer: 'custom' })).toEqual({
      Referer: 'custom'
    })
  })

  it('非 lain 域名仅克隆自定义 headers', () => {
    const headers = { 'Cache-Control': 'no-cache' }
    const result = computeHeaders('https://other.com/x.jpg', headers)
    expect(result).toEqual(headers)
    expect(result).not.toBe(headers)
  })

  it('无 headers 且非 lain 域名返回空对象', () => {
    expect(computeHeaders('https://other.com/x.jpg')).toEqual({})
  })

  it('非字符串 src 返回空对象', () => {
    expect(computeHeaders(123 as any)).toEqual({})
  })
})

describe('getNextRetryDelay', () => {
  it('指数增长', () => {
    expect(getNextRetryDelay(0)).toBe(3000)
    expect(getNextRetryDelay(1)).toBe(6000)
    expect(getNextRetryDelay(10)).toBe(3072000)
  })

  it('上限封顶 1 小时', () => {
    expect(getNextRetryDelay(11)).toBe(3600000)
    expect(getNextRetryDelay(20)).toBe(3600000)
  })
})

describe('parseCdnProbeError', () => {
  it('识别 code=451', () => {
    expect(parseCdnProbeError('java.io.FileNotFoundException: code=451')).toBe(451)
  })

  it('识别 code=404', () => {
    expect(parseCdnProbeError('error code=404 not found')).toBe(404)
  })

  it('其他错误归为 0', () => {
    expect(parseCdnProbeError('timeout')).toBe(0)
    expect(parseCdnProbeError(null)).toBe(0)
  })
})

describe('getRecoveryBgmCover', () => {
  const src = 'https://magma.test/pic/cover/l/x.jpg/bgm_poster_200'

  it('剥离 bgm_poster 后缀并按原生阈值取 100', () => {
    // w=67 不大于 67 → 100
    expect(getRecoveryBgmCover(src, 67, 0, 0)).toBe(
      'https://lain.bgm.tv/pic/cover/l/x.jpg?size=100'
    )
  })

  it('w>67 取 200', () => {
    expect(getRecoveryBgmCover(src, 68, 0, 0)).toBe(
      'https://lain.bgm.tv/pic/cover/l/x.jpg?size=200'
    )
  })

  it('w>134 取 400', () => {
    expect(getRecoveryBgmCover(src, 135, 0, 0)).toBe(
      'https://lain.bgm.tv/pic/cover/l/x.jpg?size=400'
    )
  })

  it('height 与 size 参与取最大值', () => {
    expect(getRecoveryBgmCover(src, 0, 135, 0)).toBe(
      'https://lain.bgm.tv/pic/cover/l/x.jpg?size=400'
    )
  })

  it('非字符串原样返回', () => {
    expect(getRecoveryBgmCover(123 as any, 100, 100, 100)).toBe(123)
  })
})

describe('getDevStyles', () => {
  it('fallback 时显示危险色边框', () => {
    expect(getDevStyles('https://lain.bgm.tv/x.jpg', true, 0)).toEqual({
      borderWidth: 5,
      borderColor: '#danger'
    })
  })

  it('按文件大小分级边框宽度', () => {
    expect(getDevStyles('https://lain.bgm.tv/x.jpg', false, 5000)).toMatchObject({
      borderWidth: 1,
      borderColor: '#primary'
    })
    expect(getDevStyles('https://lain.bgm.tv/x.jpg', false, 50000)).toMatchObject({
      borderWidth: 3,
      borderColor: '#primary'
    })
    expect(getDevStyles('https://lain.bgm.tv/x.jpg', false, 60000)).toMatchObject({
      borderWidth: 5,
      borderColor: '#primary'
    })
  })

  it('未命中已知域名返回 undefined', () => {
    expect(getDevStyles('https://unknown.com/x.jpg', false, 0)).toBeUndefined()
  })
})

describe('imageViewerCallback', () => {
  beforeEach(() => {
    ;(showImageViewer as jest.Mock).mockClear()
    ;(t as jest.Mock).mockClear()
  })

  it('无自定义大图时使用 uri 打开并埋点', () => {
    const cb = imageViewerCallback({
      imageViewerSrc: undefined,
      uri: 'https://cache.test/x.jpg',
      src: 'https://origin.test/x.jpg',
      headers: { 'Cache-Control': 'max-age' },
      event: { id: '测试.查看大图' } as unknown as EventType
    })
    cb()

    expect(showImageViewer).toHaveBeenCalledWith([
      {
        headers: { 'Cache-Control': 'max-age' },
        url: 'https://cache.test/x.jpg',
        _url: 'https://origin.test/x.jpg'
      }
    ])
    expect(t).toHaveBeenCalledWith('测试.查看大图', { from: '封面图' })
  })

  it('相对地址的 imageViewerSrc 被忽略', () => {
    const cb = imageViewerCallback({
      imageViewerSrc: '/relative.jpg',
      uri: 'https://cache.test/x.jpg',
      src: 'https://origin.test/x.jpg',
      headers: {},
      event: undefined
    })
    cb()

    expect(showImageViewer).toHaveBeenCalledWith([
      expect.objectContaining({ url: 'https://cache.test/x.jpg' })
    ])
  })

  it('http 开头的 imageViewerSrc 优先生效', () => {
    const cb = imageViewerCallback({
      imageViewerSrc: 'https://viewer.test/big.jpg',
      uri: 'https://cache.test/x.jpg',
      src: 'https://origin.test/x.jpg',
      headers: {},
      event: undefined
    })
    cb()

    expect(showImageViewer).toHaveBeenCalledWith([
      expect.objectContaining({ url: 'https://viewer.test/big.jpg' })
    ])
  })
})

describe('getLocalCache / getLocalCacheStatic', () => {
  it('安卓分支直接返回源地址并写入内存缓存', async () => {
    const src = 'https://cache.test/local-cache.jpg'
    await expect(getLocalCache(src)).resolves.toEqual({ path: src, size: 0 })
    expect(getLocalCacheStatic(src)).toEqual({ path: src, size: 0 })
  })

  it('内存缓存命中后不再触发下载管理器', async () => {
    const spy = ImageCacheManager.get as jest.Mock
    spy.mockClear()

    const src = 'https://cache.test/memo-hit.jpg'
    await getLocalCache(src)
    await getLocalCache(src)

    expect(spy).not.toHaveBeenCalled()
  })
})

describe('timeoutPromise', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('超时后以固定信息 reject', async () => {
    const onReject = jest.fn()
    timeoutPromise().promise.catch(onReject)

    jest.advanceTimersByTime(9999)
    expect(onReject).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    await Promise.resolve()
    expect(onReject).toHaveBeenCalledWith('download timed out')
  })

  it('clear 后取消定时器不再 reject', async () => {
    const onReject = jest.fn()
    const guard = timeoutPromise()
    guard.promise.catch(onReject)
    guard.clear()

    jest.advanceTimersByTime(20000)
    await Promise.resolve()
    expect(onReject).not.toHaveBeenCalled()
  })
})

describe('computeImageStyles', () => {
  it('size 分支计算宽高', () => {
    const res = computeImageStyles(mkProps(), mkState(), mkOptions())
    expect(res.image).toMatchObject({ width: 40, height: 40 })
  })

  it('autoSize 分支无实测尺寸时使用兜底值', () => {
    const res = computeImageStyles(mkProps({ autoSize: 80 }), mkState(), mkOptions())
    expect(res.image).toMatchObject({ width: 160, height: 160 })
  })

  it('autoSize 分支以 state 尺寸优先', () => {
    const res = computeImageStyles(
      mkProps({ autoSize: 80 }),
      mkState({ width: 100, height: 50 }),
      mkOptions()
    )
    expect(res.image).toMatchObject({ width: 100, height: 50 })
  })

  it('字符串 border 使用自定义颜色与宽度', () => {
    const res = computeImageStyles(
      mkProps({ border: '#f00', borderWidth: 2 }),
      mkState(),
      mkOptions()
    )
    expect(res.image).toMatchObject({ borderWidth: 2, borderColor: '#f00' })
  })

  it('border 为 true 时使用主题边框样式', () => {
    const res = computeImageStyles(mkProps({ border: true }), mkState(), mkOptions())
    expect(res.image).toMatchObject(baseStyles.border)
  })

  it('border 等于 hairlineWidth 且有阴影时抑制边框但保留阴影', () => {
    const res = computeImageStyles(
      mkProps({ border: 1, borderWidth: 1, shadow: true }),
      mkState(),
      mkOptions()
    )
    expect(JSON.stringify(res.image)).not.toContain('#border')
    expect(res.container).toMatchObject(baseStyles.shadow)
  })

  it('radius 为 boolean 时使用注入圆角并双向 overflow hidden', () => {
    const res = computeImageStyles(mkProps({ radius: true }), mkState(), mkOptions())
    const expected = { borderRadius: 4, overflow: 'hidden' }
    expect(res.container).toMatchObject(expected)
    expect(res.image).toMatchObject(expected)
  })

  it('radius 为数字时使用该数值', () => {
    const res = computeImageStyles(mkProps({ radius: 8 }), mkState(), mkOptions())
    expect(res.container).toMatchObject({ borderRadius: 8 })
  })

  it('暗色模式抑制阴影', () => {
    const res = computeImageStyles(
      mkProps({ shadow: true }),
      mkState(),
      mkOptions({ isDark: true })
    )
    expect(JSON.stringify(res.container)).not.toContain('#shadow')
  })

  it('安卓 devEvent 可视化文字开启时抑制阴影', () => {
    const res = computeImageStyles(
      mkProps({ shadow: true }),
      mkState(),
      mkOptions({ devEventText: true })
    )
    expect(JSON.stringify(res.container)).not.toContain('#shadow')
  })

  it('placeholder + skeleton 显示骨架底色, 动画结束后移除', () => {
    const loading = computeImageStyles(
      mkProps({ placeholder: true, skeleton: true }),
      mkState({ animFinished: false }),
      mkOptions()
    )
    expect(loading.container).toMatchObject({ backgroundColor: '#skeleton' })

    const finished = computeImageStyles(
      mkProps({ placeholder: true, skeleton: true }),
      mkState({ animFinished: true }),
      mkOptions()
    )
    expect(JSON.stringify(finished.container)).not.toContain('#skeleton')
  })

  it('placeholder 无 skeleton 显示普通底色', () => {
    const res = computeImageStyles(
      mkProps({ placeholder: true }),
      mkState({ animFinished: false }),
      mkOptions()
    )
    expect(res.container).toMatchObject(baseStyles.placeholder)
  })

  it('style 与 imageStyle 按顺序叠加进 container', () => {
    const res = computeImageStyles(
      mkProps({ style: { width: 9 }, imageStyle: { height: 8 } }),
      mkState(),
      mkOptions()
    )
    expect(res.container).toMatchObject({ width: 9, height: 8 })
  })

  it('dev 模式回退后显示危险色边框', () => {
    const res = computeImageStyles(mkProps(), mkState(), mkOptions({ dev: true, fallbacked: true }))
    expect(res.image).toMatchObject({ borderWidth: 5, borderColor: '#danger' })
  })

  it("shadow='lg' 走大阴影样式", () => {
    const res = computeImageStyles(mkProps({ shadow: 'lg' }), mkState(), mkOptions())
    expect(res.container).toMatchObject(baseStyles.shadowLg)
  })
})
