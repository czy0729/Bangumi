/*
 * @Author: czy0729
 * @Date: 2026-09-18 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-18 06:00:00
 *
 * 视差头图背景 (iOS 入口)
 *
 * iOS 的远程图统一走项目 Image (expo-image): 由 useImageHeaders 自动补 lain 域 Referer 与节点鉴权头,
 * 由 useImageLoader 提供 fallbackSrc 回退 + 指数退避重试, 并复用 expo-image 的磁盘/内存缓存。
 *
 * 历史问题: 这里原先裸用 RN 核心 Animated.Image, 拿不到上述能力, 请求失败时只露出容器底色 (灰色),
 * 表现为「iOS 背景图看不见」。
 *
 * 尺寸说明: 引擎需要确定宽高 (computeImageStyles 会在未传 size 时退化为 40x40),
 * 故用 imageStyle 显式铺满外层容器 (100%), 与原来的 _.container.fill 语义一致,
 * 这样也能兼容外层 SensorParallaxCard 的 116% 放大容器。
 *
 * 模糊说明: expo-image 的 blurRadius 单位是 point (逻辑单位), 不随源图分辨率缩放;
 * 与改造前使用的 RN 核心 Image 是两套不同实现, 实际观感以真机为准,
 * 这里沿用 getBlurRadius 的 iOS 取值; 若需再校准, 在 getBlurRadius 内按平台收敛,
 * 不要在这里加平台判断。
 * */
import { Image } from '@components'
import { _ } from '@stores'
import { logger } from '@utils/dev'

import type { Props } from './types'

/** 视差头图背景 (iOS: 项目 Image / expo-image) */
export function ParallaxBgImage({ src, fallbackSrc, blurRadius }: Props) {
  return (
    <Image
      style={_.container.fill}
      imageStyle={_.container.fill}
      src={src}
      radius={0}
      placeholder={false}
      skeleton={false}
      fadeDuration={0}
      blurRadius={blurRadius}
      fallbackSrc={fallbackSrc}
      errorToHide
      withoutFeedback
      onError={() => logger.warn('ParallaxBgImage|onError', String(src))}
    />
  )
}

export default ParallaxBgImage
