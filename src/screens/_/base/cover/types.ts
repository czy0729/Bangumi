/*
 * @Author: czy0729
 * @Date: 2022-06-13 07:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 20:03:31
 */
import { ImageProps } from '@components'
import { Override, ViewStyle, ImageStyle, SubjectTypeCn } from '@types'

export type Props = Override<
  ImageProps,
  {
    /** 图片样式 */
    style?: ImageStyle

    /** 容器样式 */
    containerStyle?: ViewStyle

    /** 拟物容器样式 */
    bodyStyle?: ViewStyle

    /** 拟物容器箭头样式 */
    angleStyle?: ViewStyle

    /** 封面地址 */
    src?: string

    /** 大小 */
    size?: number

    /** 高度 */
    height?: number

    /** 不需要错误占位图片 */
    noDefault?: boolean

    /** 条目类型 */
    type?: SubjectTypeCn | '目录' | ''

    /** 强制是否使用拟物封面 */
    useType?: boolean

    /** 是否匹配 CDN 地址 */
    cdn?: boolean

    /** 是否 text-only */
    textOnly?: boolean

    /** 封面加载失败后是否回退到 bgm 原地址 */
    fallback?: boolean
  }
>
