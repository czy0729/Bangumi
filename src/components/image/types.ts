/*
 * @Author: czy0729
 * @Date: 2022-05-03 21:15:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 08:51:36
 */
import { ColorValue, ImageProps } from 'react-native'
import { Override, ViewStyle, ImageStyle, EventType, Source } from '@types'

export type Props = Override<
  Omit<ImageProps, 'source'>,
  {
    /** 图片容器的样式 */
    style?: ViewStyle

    /** 强制传递给图片的样式 */
    imageStyle?: ImageStyle

    /** 图片地址 */
    src?: Source | string

    /** 此组件禁用source */
    // source: never

    /** 大小 | 宽度 */
    size?: number

    /** 宽度 */
    width?: number

    /** 高度 */
    height?: number

    /** 是否带边框, truely则显示 */
    border?: number | boolean | ColorValue

    /** 边框大小 */
    borderWidth?: number

    /** 是否带圆角 */
    radius?: number | boolean

    /** 是否带阴影 */
    shadow?: boolean | 'lg'

    /** 是否有底色 */
    placeholder?: boolean

    /** 支持自动计算远端图片高度, 传递图片的宽度, 高度适应比例 */
    autoSize?: number | boolean

    /** 是否自动选择Bangumi图片质量 */
    quality?: boolean

    /** 是否点击显示全局的ImageViewer, 此值打开会覆盖onPress */
    imageViewer?: boolean

    /** 若有值, 打开ImageViewer时使用此src */
    imageViewerSrc?: string

    /** 埋点事件 */
    event?: EventType

    /** <Touchable> delay */
    delay?: boolean

    /** 是否本地缓存  */
    cache?: boolean

    /** 图片请求头 */
    headers?: object

    /** 开发模式，强制不显示图片 */
    textOnly?: boolean

    /** 获取本地缓存地址的方法是否同步进行 */
    sync?: boolean

    /** 是否退回使用 rn 的 <Image> (安卓 only) */
    fallback?: boolean

    /** 确定加载失败后若有值使用此地址 fallback */
    fallbackSrc?: string

    /** 确定加载失败后隐藏组件 */
    errorToHide?: boolean

    /** 点击中动画缩放比例 */
    scale?: number

    /** 图片点击回调 */
    onPress?: (arg0?: any) => any

    /** 图片长按回调 */
    onLongPress?: (arg0?: any) => any

    /** 图片加载失败回调 */
    onError?: (arg0?: any) => any
  }
>

export type State = {
  /** 加载是否已经失败 */
  error: boolean

  /** 图片加载实际地址 */
  uri: Source | string

  /** 图片当前宽度 */
  width: number

  /** 图片当前高度 */
  height: number

  loaded: boolean
}
