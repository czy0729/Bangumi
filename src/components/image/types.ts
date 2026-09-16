/*
 * @Author: czy0729
 * @Date: 2022-05-03 21:15:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 15:55:04
 */
import type {
  ColorValue,
  ImageErrorEvent,
  ImageProps,
  TouchableWithoutFeedbackProps
} from 'react-native'
import type { EventType, ImageSource, ImageStyle, Override, ViewStyle } from '@types'
import type { TouchableHandlePress } from '../touchable/types'
import type { SkeletonProps } from '../skeleton'

export type Props = Override<
  Omit<ImageProps, 'source'>,
  {
    /** 图片容器的样式 */
    style?: ViewStyle

    /** 强制传递给图片的样式 */
    imageStyle?: ImageStyle | ViewStyle | ViewStyle[]

    /** 图片地址 */
    src?: ImageSource | string

    /** 大小 | 宽度 */
    size?: number

    /** 宽度, 优先级比 size 高 */
    width?: number

    /** 高度, 优先级比 size 高 */
    height?: number

    /** 是否带边框, truely 则显示 */
    border?: number | boolean | ColorValue

    /** 边框大小 */
    borderWidth?: number

    /** 是否带圆角 */
    radius?: number | boolean

    /** @deprecated 是否带阴影 */
    shadow?: boolean | 'lg'

    /** 是否有默认底色 */
    placeholder?: boolean

    /** 支持自动计算远端图片高度, 传递图片的宽度, 高度适应比例 */
    autoSize?: number | boolean

    /** 支持自动计算远端图片高度, 传递图片的高度, 宽度适应比例 */
    autoHeight?: number

    /** 是否点击显示全局的 ImageViewer, 此值打开会覆盖 onPress */
    imageViewer?: boolean

    /** 若有值, 打开 ImageViewer 时使用此 src */
    imageViewerSrc?: string

    /** 埋点事件 */
    event?: EventType

    /** Touchable 禁用触摸效果 */
    withoutFeedback?: boolean

    /** Touchable 是否防止快速多次点击 */
    delay?: boolean

    /** Touchable 点击中动画缩放比例 */
    scale?: number

    /** 是否本地缓存 */
    cache?: boolean

    /**
     * 缓存策略 (iOS / expo-image 生效, 安卓与 Web 忽略)
     * 默认 memory-disk, 长列表场景传 disk 可避免大量解码位图常驻内存
     */
    cachePolicy?: 'disk' | 'memory' | 'memory-disk'

    /** 图片请求头 */
    headers?: Record<string, string>

    /** 开发模式, 强制不显示图片 */
    textOnly?: boolean

    /** 图片同一时间有复数加载时的优先级 */
    priority?: 'low' | 'normal' | 'high'

    /**
     * 模糊半径
     *  - iOS 走 expo-image 的 blurRadius (其内部半径为传入值的一半)
     *  - 安卓引擎是 FastImage, 不支持模糊; 需要安卓模糊只能用 RN 核心 Image
     * */
    blurRadius?: number

    /** 是否退回使用 rn 的 Image (安卓 only) */
    fallback?: boolean

    /** 确定加载失败后若有值使用此地址 fallback */
    fallbackSrc?: string

    /** 确定加载失败后隐藏组件 */
    errorToHide?: boolean

    /** 是否显示骨架屏动画 */
    skeleton?: boolean

    /** 骨架屏渐变颜色风格 */
    skeletonType?: SkeletonProps['type']

    /**
     * 失败后的退避重试次数上限
     *  - 不传 / 非有限数 / 负数 = 不限制 (保持默认的无限指数退避)
     *  - 传 0 = 失败后不重试
     *  - 只影响「失败后的重试次数」, 不影响首屏加载与错误 UI
     * */
    retryLimit?: number

    /** 图片点击回调 */
    onPress?: TouchableHandlePress

    /** 图片长按回调 */
    onLongPress?: TouchableWithoutFeedbackProps['onLongPress']

    /**
     * 图片加载失败回调
     *  - `retry.willRetry` 透出「是否还会自动重试」, 消费侧据此决定失败指示器去留,
     *    不需要自己复刻重试计数 (计数在 hook 内, 且成功时会自清零)
     *  - 参数均可选, 只声明第一个参数的旧消费方不受影响
     * */
    onError?: (evt?: ImageErrorEvent, retry?: ImageRetryInfo) => void

    /**
     * 下载进度回调 (仅远端图片, 且仅引擎真实回调时才有)
     *  - 统一形态: iOS (expo-image) 与 Android (FastImage) 的事件结构差异由入口层解包
     *  - 命中缓存 / 服务端无 content-length 时不会回调, 消费方需自备不确定态
     * */
    onProgress?: (event: ImageProgressEvent) => void
  }
>

/** 图片确定失败后的重试信息 (onError 的第二个参数) */
export type ImageRetryInfo = {
  /** 是否还会自动重试 (false = 重试次数已耗尽, 不会再发起请求) */
  willRetry: boolean
}

/** 统一的图片下载进度事件 */
export type ImageProgressEvent = {
  /** 已下载字节数 */
  loaded: number

  /** 总字节数, 服务端未提供 content-length 时为 0 */
  total: number
}

export type State = {
  /** 加载是否已经失败 */
  error: boolean

  /** 图片加载实际地址 */
  uri: ImageSource | string | undefined

  /** 图片当前宽度 */
  width: number

  /** 图片当前高度 */
  height: number

  /** 加载步骤是否完成 */
  loaded: boolean

  /** 图片加载完成且动画结束 (用于移除背景色防止安卓过度绘制) */
  animFinished: boolean
}

/** useImageAutoSize 参数 */
export type UseImageAutoSizeOptions = {
  /** 当前解析出的图片地址 */
  uri: State['uri']

  /** 初始图片地址 */
  src?: Props['src']

  /** 自动计算宽度 */
  autoSize?: Props['autoSize']

  /** 自动计算高度 */
  autoHeight?: Props['autoHeight']

  /** 请求头 */
  headers: Record<string, string>

  /** 宽高获取成功回调 */
  onSize: (width: number, height: number) => void

  /** 宽高获取失败回调 */
  onError: (errorInfo?: string) => void
}

/** computeImageStyles 注入项, 由调用方传入可观察值保持函数纯净 */
export type ComputeImageStylesOptions = {
  /** 当前圆角值 */
  borderRadius: number

  /** 是否开发模式 */
  dev: boolean

  /** 是否已回退到 fallbackSrc */
  fallbacked: boolean

  /** 下载到本地的文件大小 (bytes) */
  fileSize: number

  /** memoStyles 生成的样式表 */
  styles: Record<string, ViewStyle>

  /** 是否暗色模式 */
  isDark: boolean

  /** hairline 边框宽度 */
  hairlineWidth: number

  /** 安卓 devEvent 可视化文字开启 (隐藏阴影避免遮挡) */
  devEventText: boolean
}
