/*
 * @Author: czy0729
 * @Date: 2026-08-18 14:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 14:50:00
 */

// WEB 分支: getCoverPramas 中 WEB && width > 400 使用 bgm_poster 600 规则
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
  WEB: true
}))

import { getCoverSrc } from '../utils'

// WEB 分支: getCoverPramas 中 WEB && width > 400 先给 600, 但被限制为最大 400
describe('getCoverSrc (WEB)', () => {
  it('width 大于 400 仍限制为 r/400 缩略图', () => {
    expect(getCoverSrc('https://lain.bgm.tv/pic/cover/g/x.jpg', 500)).toBe(
      'https://lain.bgm.tv/r/400/pic/cover/l/x.jpg'
    )
  })

  it('width 不大于 400 使用 r/400 缩略图', () => {
    expect(getCoverSrc('https://lain.bgm.tv/pic/cover/g/x.jpg', 200)).toBe(
      'https://lain.bgm.tv/r/400/pic/cover/l/x.jpg'
    )
  })
})
