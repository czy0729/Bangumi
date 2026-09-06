/*
 * @Author: czy0729
 * @Date: 2026-09-06 19:17:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-06 19:17:03
 *
 * ImageTouchable 子组件类型
 * Props 从根 types.ts Pick, 避免重复定义
 */
import type { PropsWithChildren, ReactNode } from 'react'
import type { Props as ImageProps } from '../types'

export type Props = PropsWithChildren<
  Pick<ImageProps, 'delay' | 'scale' | 'withoutFeedback'> & {
    /** 容器样式 (computeImageStyles 的 container 结果) */
    containerStyle?: ImageProps['style']

    /** 骨架屏插槽 (入口 renderSkeleton 的渲染结果) */
    skeleton?: ReactNode

    /** 图片点击回调 (imageViewer 模式下入口已替换为打开大图) */
    onPress?: ImageProps['onPress']

    /** 图片长按回调 (dev 模式下入口已合并调试输出) */
    onLongPress?: ImageProps['onLongPress']
  }
>
