/*
 * @Author: czy0729
 * @Date: 2023-12-09 16:46:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 21:37:51
 */
import { getCover400, matchCoverUrl } from '@utils'
import { IMG_DEFAULT, WEB } from '@constants'
import { CoverPrefix, CoverSize, Props } from './types'

/** 修正封面图地址 */
export function getCoverSrc(src: Props['src'], width: number, cdn?: boolean, noDefault?: boolean) {
  if (src && typeof src !== 'string') return src

  const { prefix, size } = getCoverPramas(width)
  return (getCover400(cdn !== false ? matchCoverUrl(src, noDefault, prefix) : src, size) ||
    IMG_DEFAULT) as Props['src']
}

/** 相册模式强制大图 */
export function getImageViewerSrc(imageViewerSrc: Props['imageViewerSrc'], src: Props['src']) {
  if (imageViewerSrc && typeof src === 'string' && src.includes('/bgm_poster')) {
    return src.replace(/\/bgm_poster_(100|200|400)/g, '/bgm_poster')
  }

  return imageViewerSrc
}

/** 对部分尺寸过少的图片, 强制使用缩略图 */
function getCoverPramas(width: number) {
  let prefix: CoverPrefix = 'bgm_poster_100'
  let size: CoverSize = 100

  if (WEB && width > 400) {
    prefix = 'bgm_poster'
    size = 600
  } else if (width > 134) {
    prefix = 'bgm_poster'
    size = 400
  } else if (width > 67) {
    prefix = 'bgm_poster_200'
    size = 200
  }

  // 主站封面大图实在太慢, 为了兼顾实用度暂限制为最大 400
  if (size > 400) {
    prefix = 'bgm_poster'
    size = 400
  }

  return { prefix, size }
}
