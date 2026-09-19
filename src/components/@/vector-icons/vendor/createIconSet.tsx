/*
 * @Author: czy0729
 * @Date: 2026-09-19 07:22:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-20 00:47:41
 *
 * Vendored from @expo/vector-icons@15.0.2 build/createIconSet.js (2026-09-19)
 * 改动: 相对 import 随目录层级平移到 vendor/react-native-vector-icons/lib/ 并补齐 TS 类型;
 * static Button 因 TS 下类表达式自引用不便, 改为类定义后挂载 (行为不变);
 * 字体未加载时的占位补最小尺寸 (minWidth / minHeight), 并对齐真实渲染的 allowFontScaling / selectable;
 * 外层类由 Component 改为 PureComponent, 同 props 时跳过重渲染
 * 依赖闭包仅 react / react-native / expo-font, 不再依赖 @expo/vector-icons 包本体
 */
import { PureComponent } from 'react'
import { PixelRatio, Text } from 'react-native'
import * as Font from 'expo-font'
import createRNVIconSet, {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE
} from './react-native-vector-icons/lib/create-icon-set'
import createIconButtonComponent from './react-native-vector-icons/lib/icon-button'

import type { ComponentClass, ComponentRef } from 'react'
import type { ColorValue, TextProps, TextStyle } from 'react-native'
import type { GlyphMap, IconImageSource } from './react-native-vector-icons/lib/create-icon-set'
import type {
  IconButtonProps,
  IconComponentProps
} from './react-native-vector-icons/lib/icon-button'

export { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE }

/** 图标组件 props */
export interface IconProps<G extends string> extends TextProps {
  /** 图标名 */
  name: G | (string & {})
  /** 字号 */
  size?: number
  /** 颜色 */
  color?: ColorValue
  /** 行高 (透传字段, 供 iconfont 记录, RN Text 本身不消费该 prop) */
  lineHeight?: number
}

type IconState = { fontIsLoaded: boolean }

/** createIconSet 返回的图标组件 (附带静态方法) */
export interface IconComponent<G extends string, FN extends string>
  extends ComponentClass<IconProps<G>> {
  Button: ComponentClass<IconButtonProps<G>>
  glyphMap: GlyphMap<G>
  getRawGlyphMap: () => GlyphMap<G>
  getFontFamily: () => FN
  getImageSource: (
    name: G | (string & {}),
    size: number,
    color?: string
  ) => Promise<IconImageSource | null>
  loadFont: () => Promise<void>
  font: Record<FN, number | string>
}

export default function createIconSet<G extends string, FN extends string>(
  glyphMap: GlyphMap<G>,
  fontName: FN,
  expoAssetId: number | string,
  fontStyle?: TextStyle
): IconComponent<G, FN> {
  const font = { [fontName]: expoAssetId } as Record<FN, number | string>
  const RNVIconComponent = createRNVIconSet(glyphMap, fontName, null, fontStyle)
  let didWarn = false

  const Icon = class extends PureComponent<IconProps<G>, IconState> {
    static defaultProps = RNVIconComponent.defaultProps
    static glyphMap = glyphMap
    static getRawGlyphMap = () => glyphMap
    static getFontFamily = () => fontName
    static loadFont = () => Font.loadAsync(font)
    static font = font

    static getImageSource = async (
      name: G | (string & {}),
      size: number,
      color?: string
    ): Promise<IconImageSource | null> => {
      if (__DEV__ && !(name in glyphMap)) {
        // eslint-disable-next-line no-console
        console.warn(`"${name}" is not a valid icon name for family "${fontName}"`)
        return null
      }
      if (typeof Font.renderToImageAsync !== 'function') {
        // eslint-disable-next-line no-console
        console.warn('Font.renderToImageAsync is not available. Please update expo-font.')
        return null
      }
      await Font.loadAsync(font)
      const renderToImageResult = await Font.renderToImageAsync(
        String.fromCodePoint(glyphMap[name as G] as number),
        {
          fontFamily: fontName,
          color,
          size
        }
      )
      if (typeof renderToImageResult === 'string') {
        if (__DEV__ && !didWarn) {
          didWarn = true
          // eslint-disable-next-line no-console
          console.warn(
            'Font.renderToImageAsync() did not return image dimensions, because an outdated version of ' +
              'expo-font was used. The reported width and height are estimates, instead of real ' +
              'image dimension. Update expo-font to resolve this.'
          )
        }
        return {
          uri: renderToImageResult,
          width: size,
          height: size,
          scale: PixelRatio.get()
        }
      }
      return { scale: PixelRatio.get(), ...renderToImageResult }
    }

    _mounted = false
    _icon: ComponentRef<typeof RNVIconComponent> | null = null
    state: IconState = {
      fontIsLoaded: Font.isLoaded(fontName)
    }

    async componentDidMount() {
      this._mounted = true
      if (!this.state.fontIsLoaded) {
        await Font.loadAsync(font)
        this._mounted && this.setState({ fontIsLoaded: true })
      }
    }

    componentWillUnmount() {
      this._mounted = false
    }

    setNativeProps(props: Record<string, unknown>) {
      // 类组件实例未实现 setNativeProps (上游同样仅运行时才暴露), 保留 API 兼容旧调用方
      const host = this._icon as unknown as {
        setNativeProps?: (props: Record<string, unknown>) => void
      }
      host?.setNativeProps?.(props)
    }

    render() {
      if (__DEV__ && this.props.name && !(this.props.name in glyphMap)) {
        // eslint-disable-next-line no-console
        console.warn(`"${this.props.name}" is not a valid icon name for family "${fontName}"`)
      }
      if (!this.state.fontIsLoaded) {
        const size = this.props.size ?? DEFAULT_ICON_SIZE

        // 只给尺寸下限, 不固定宽高, 避免约束真实字形
        return (
          <Text
            style={[{ minWidth: size, minHeight: size }, this.props.style]}
            selectable={false}
            allowFontScaling={false}
          >
            {this.props.children}
          </Text>
        )
      }
      return (
        <RNVIconComponent
          ref={view => {
            this._icon = view
          }}
          {...this.props}
        />
      )
    }
  }

  const IconWithStatics = Icon as unknown as IconComponent<G, FN>
  IconWithStatics.Button = createIconButtonComponent<G>(Icon as ComponentClass<IconComponentProps>)
  return IconWithStatics
}
