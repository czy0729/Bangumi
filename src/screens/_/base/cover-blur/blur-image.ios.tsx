/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 00:00:00
 *
 * 色场图 iOS 入口
 *
 * 走项目 Image (expo-image), 缓存策略 / 请求头 / 代理改写 / 失败重试都由项目图片栈承担。
 *
 * 源图使用 100px 缩略图而不是封面原图:
 * - expo-image 的 blurRadius 是"源图像素级"的高斯半径 (内部还会再除以 2), 400px 的原图 + 大半径
 *   单张就要做几十像素半径的卷积, 而且是"先下原图 → 再模糊"的串行流程, 每张卡都会明显晚出;
 *   100px 小图 + 同样的相对模糊量, 计算量小两个数量级, 色场能立刻出现
 * - 代价: 多一张几 KB 的小图请求 (与安卓/Web 一致), 首次加载后由 expo-image 磁盘缓存接管
 */
import { Image } from '@components'
import { BLUR_SCALE, getBlurSrc } from './ds'
import { styles } from './styles'

import type { BlurImageProps } from './types'

/** 色场图 (iOS: 项目 Image + expo-image blurRadius, 源图取 100px 缩略图) */
export const BlurImage = ({ src, cdn, width, height, blurRadius, onError }: BlurImageProps) => (
  <Image
    style={[styles.blurImage, { transform: [{ scale: BLUR_SCALE }] }]}
    src={getBlurSrc(src, cdn)}
    size={width}
    width={width}
    height={height}
    radius={0}
    delay={false}
    fadeDuration={0}
    skeleton={false}
    placeholder={false}
    withoutFeedback
    blurRadius={blurRadius}
    onError={onError}
  />
)

export default BlurImage
