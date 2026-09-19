/*
 * @Author: czy0729
 * @Date: 2026-09-19 07:24:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 07:56:19
 */
import { PureComponent } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { omit, pick } from './object-utils'

import type { ComponentClass } from 'react'
import type {
  ColorValue,
  StyleProp,
  TextProps,
  TextStyle,
  TouchableHighlightProps
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8
  },
  touchable: {
    overflow: 'hidden'
  },
  icon: {
    marginRight: 10
  },
  text: {
    fontWeight: '600',
    backgroundColor: 'transparent'
  }
})

const IOS7_BLUE = '#007AFF'

/** 透传给图标 (Text) 的 props */
const TEXT_PROP_NAMES = [
  'ellipsizeMode',
  'numberOfLines',
  'textBreakStrategy',
  'selectable',
  'suppressHighlighting',
  'allowFontScaling',
  'adjustsFontSizeToFit',
  'minimumFontScale'
]

/** 透传给 TouchableHighlight 的 props */
const TOUCHABLE_PROP_NAMES = [
  'accessible',
  'accessibilityLabel',
  'accessibilityHint',
  'accessibilityComponentType',
  'accessibilityRole',
  'accessibilityStates',
  'accessibilityTraits',
  'onFocus',
  'onBlur',
  'disabled',
  'onPress',
  'onPressIn',
  'onPressOut',
  'onLayout',
  'onLongPress',
  'nativeID',
  'testID',
  'delayPressIn',
  'delayPressOut',
  'delayLongPress',
  'activeOpacity',
  'underlayColor',
  'selectionColor',
  'onShowUnderlay',
  'onHideUnderlay',
  'hasTVPreferredFocus',
  'tvParallaxProperties'
]

export type IconButtonProps<G extends string> = TouchableHighlightProps & {
  /** 按钮背景色 */
  backgroundColor?: string | ColorValue
  /** 图标圆角 */
  borderRadius?: number
  /** 图标颜色 */
  color?: ColorValue
  /** 图标独立样式 */
  iconStyle?: StyleProp<TextStyle>
  name?: G | (string & {})
  /** 字号 */
  size?: number
}

/** Button 内部渲染的图标组件所需的最小 props 契约 (pressRetentionOffset 与 Text 语义冲突, 已排除) */
export type IconComponentProps = Omit<TextProps, 'pressRetentionOffset'> & {
  name?: string
  size?: number
  color?: ColorValue
}

/** 给图标组件挂 Button 子组件 */
export default function createIconButtonComponent<G extends string>(
  Icon: ComponentClass<IconComponentProps>
): ComponentClass<IconButtonProps<G>> {
  return class IconButton extends PureComponent<IconButtonProps<G>> {
    static defaultProps = {
      backgroundColor: IOS7_BLUE,
      borderRadius: 5,
      color: 'white',
      size: 20
    }

    render() {
      const { style, iconStyle, children, ...restProps } = this.props

      const iconProps: IconComponentProps = {
        ...pick(restProps, TEXT_PROP_NAMES, 'name', 'size', 'color'),
        style: iconStyle ? [styles.icon, iconStyle] : styles.icon
      }
      const touchableProps = pick(restProps, TOUCHABLE_PROP_NAMES)
      const viewProps = omit(
        restProps,
        Object.keys(iconProps),
        Object.keys(touchableProps),
        'iconStyle',
        'borderRadius',
        'backgroundColor'
      )

      const colorStyle = pick(restProps, 'color')
      const blockStyle = pick(restProps, 'backgroundColor', 'borderRadius')

      return (
        <TouchableHighlight style={[styles.touchable, blockStyle]} {...touchableProps}>
          <View style={[styles.container, blockStyle, style]} {...viewProps}>
            <Icon {...iconProps} />
            {typeof children === 'string' ? (
              <Text style={[styles.text, colorStyle]} selectable={false}>
                {children}
              </Text>
            ) : (
              children
            )}
          </View>
        </TouchableHighlight>
      )
    }
  }
}
