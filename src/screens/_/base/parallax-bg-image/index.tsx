/*
 * @Author: czy0729
 * @Date: 2026-09-18 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-18 06:00:00
 *
 * 视差头图背景 (安卓 / Web 入口)
 *
 * 安卓的图片引擎是 FastImage (Glide), 不支持 blurRadius, 所以这里必须用 RN 核心 Image 渲染,
 * 与色场图 (screens/_/base/cover-blur/blur-image.android.tsx) 同一取舍。
 *
 * 但「用哪个引擎」与「怎么请求」是两件事, 这里补齐原先裸用 Animated.Image 时缺失的三件事:
 *  1) computeHeaders: lain 域自动补 Referer (防盗链) 与当前节点的鉴权头
 *  2) resolveImageUri: 历史代理域名归一 → 补协议 → 按当前生效节点改写 (与项目图片栈同源)
 *  3) 失败回退: 第三方图源挂掉时退回头像直连地址, 而不是只剩容器底色
 *
 * 与 iOS 入口的差异 (有意为之, 与色场图的 blur-image.android.tsx 同一取舍):
 * iOS 复用共享 Image 的 useImageLoader (指数退避重试 + 本地错误缓存),
 * 这里因为必须用 RN 核心 Image 换模糊, 只能做「回退一次」后放弃
 * */
import { useMemo, useState } from 'react'
import { Image } from 'react-native'
import { computeHeaders } from '@components/image/utils'
import { _ } from '@stores'
import { logger } from '@utils/dev'
import { resolveImageUri } from '@utils/image'

import type { Props } from './types'

/** 视差头图背景 (安卓 / Web: RN 核心 Image, 保留 blurRadius) */
export function ParallaxBgImage({ src, fallbackSrc, blurRadius }: Props) {
  /** 只回退一次, 避免备份地址也失败时来回切换 */
  const [fallbacked, setFallbacked] = useState(false)
  const [prevSrc, setPrevSrc] = useState(src)

  // 地址变化视为全新加载: 在渲染期同步重置回退标记
  // (不用 useEffect, 否则会先绘制一帧旧 fallbackSrc 再纠正, 表现为背景图闪一下)
  if (prevSrc !== src) {
    setPrevSrc(src)
    setFallbacked(false)
  }

  const uri = fallbacked ? fallbackSrc : src
  const source = useMemo(
    () => ({
      uri: resolveImageUri(uri),
      headers: computeHeaders(uri)
    }),
    [uri]
  )

  return (
    <Image
      style={_.container.fill}
      source={source}
      resizeMode='cover'
      blurRadius={blurRadius}
      fadeDuration={0}
      onError={() => {
        if (!fallbacked && fallbackSrc && fallbackSrc !== src) {
          setFallbacked(true)
          return
        }

        logger.warn('ParallaxBgImage|onError', String(source.uri))
      }}
    />
  )
}

export default ParallaxBgImage
