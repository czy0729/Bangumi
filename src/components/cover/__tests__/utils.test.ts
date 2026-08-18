/*
 * @Author: czy0729
 * @Date: 2026-08-18 08:21:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 08:23:13
 */
jest.mock('@utils', () => ({
  getCover400: (src, size) =>
    typeof src === 'string' && src.includes('lain.bgm.tv')
      ? src.replace(
          /lain\.bgm\.tv\/pic\/cover\/(g|s|c|m|l)\//,
          `lain.bgm.tv/r/${size}/pic/cover/l/`
        )
      : src,
  matchCoverUrl: src =>
    typeof src === 'string' ? src.replace(/\/g\/|\/s\/|\/m\/|\/l\//, '/c/') : src
}))

jest.mock('@constants', () => ({
  IMG_DEFAULT: 'IMG_DEFAULT',
  WEB: false
}))

import { getCoverSrc, getImageViewerSrc } from '../utils'

describe('getCoverSrc', () => {
  it('非字符串 src 原样返回', () => {
    const src = 4000
    expect(getCoverSrc(src, 100)).toBe(src)
  })

  it('空字符串返回默认图', () => {
    expect(getCoverSrc('', 100)).toBe('IMG_DEFAULT')
  })

  it('小尺寸使用 r/100 缩略图', () => {
    expect(getCoverSrc('https://lain.bgm.tv/pic/cover/g/x.jpg', 60)).toBe(
      'https://lain.bgm.tv/r/100/pic/cover/l/x.jpg'
    )
  })

  it('中尺寸使用 r/200 缩略图', () => {
    expect(getCoverSrc('https://lain.bgm.tv/pic/cover/g/x.jpg', 100)).toBe(
      'https://lain.bgm.tv/r/200/pic/cover/l/x.jpg'
    )
  })

  it('大尺寸使用 r/400 缩略图', () => {
    expect(getCoverSrc('https://lain.bgm.tv/pic/cover/g/x.jpg', 200)).toBe(
      'https://lain.bgm.tv/r/400/pic/cover/l/x.jpg'
    )
  })

  it('cdn 为 false 时不走 matchCoverUrl', () => {
    expect(getCoverSrc('https://lain.bgm.tv/pic/cover/g/x.jpg', 100, false)).toBe(
      'https://lain.bgm.tv/r/200/pic/cover/l/x.jpg'
    )
  })
})

describe('getImageViewerSrc', () => {
  it('bgm_poster 尺寸地址去掉后缀', () => {
    expect(
      getImageViewerSrc(
        'https://lain.bgm.tv/pic/cover/g/x.jpg',
        'https://lain.bgm.tv/pic/cover/g/x.jpg/bgm_poster_200'
      )
    ).toBe('https://lain.bgm.tv/pic/cover/g/x.jpg/bgm_poster')
  })

  it('无 imageViewerSrc 时返回原值', () => {
    expect(getImageViewerSrc(undefined, 'x.jpg')).toBeUndefined()
  })

  it('非 bgm_poster 地址不替换', () => {
    expect(getImageViewerSrc('https://lain.bgm.tv/pic/cover/g/x.jpg', 'y.jpg')).toBe(
      'https://lain.bgm.tv/pic/cover/g/x.jpg'
    )
  })
})
