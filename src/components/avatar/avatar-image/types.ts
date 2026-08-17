/*
 * @Author: czy0729
 * @Date: 2026-08-18 05:59:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 05:59:28
 */
import type { Props as AvatarProps } from '../types'

export type Props = Pick<
  AvatarProps,
  'src' | 'fallbackSrc' | 'priority' | 'skeleton' | 'skeletonType' | 'borderWidth' | 'placeholder'
> & {
  /** 大小 */
  size: number

  /** 圆角大小 */
  radius: number

  /** 边框颜色 */
  border: AvatarProps['borderColor']

  /** 图片容器样式 */
  style: AvatarProps['style']
}
