/*
 * 自定义按钮
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-11 15:24:45
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { titleCase } from '@utils'
import { ViewStyle, TextStyle, ReactNode } from '@types'
import { Activity } from '../activity'
import { Flex } from '../flex'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'

type Props = {
  /** 按钮重置样式 */
  style?: ViewStyle

  /** 文字重置样式 */
  styleText?: TextStyle

  /** 预设主题 */
  type?:
    | 'plain'
    | 'main'
    | 'primary'
    | 'warning'
    | 'wait'
    | 'disabled'
    | 'bid'
    | 'ask'
    | 'ghostMain'
    | 'ghostPrimary'
    | 'ghostSuccess'
    | 'ghostPlain'

  /** 预设大小 */
  size?: 'sm' | 'md'

  /** 是否显示阴影 */
  shadow?: boolean

  /** 是否圆角 */
  radius?: boolean

  /** 是否显示加载指示器 */
  loading?: boolean

  /** 放在文字右边 */
  extra?: ReactNode

  /** 点击回调 */
  onPress?: (arg0?: any) => any

  /** 文字 */
  children?: any
}

export const Button = observer(
  ({
    style,
    styleText,
    type = 'plain',
    size = 'md',
    shadow = false,
    radius = true,
    loading = false,
    children,
    extra,
    onPress,
    ...other
  }: Props) => {
    const styles = memoStyles()
    const wrapStyle: ViewStyle[] = [styles.button]
    const textStyle: TextStyle[] = [styles.text]

    if (shadow && !_.isDark) wrapStyle.push(styles.shadow)
    if (type) {
      wrapStyle.push(styles[type])
      textStyle.push(styles[`text${titleCase(type)}`])
    }
    if (size) {
      wrapStyle.push(styles[size])
      textStyle.push(styles[`text${titleCase(size)}`])
    }
    if (radius) wrapStyle.push(styles.radius)
    if (style) wrapStyle.push(style)

    const content = (
      <Flex justify='center'>
        {loading && (
          <View style={styles.scale}>
            <Activity
              color={type === 'plain' ? 'rgb(128, 128, 128)' : 'white'}
              size='small'
            />
          </View>
        )}
        <Text
          style={[
            // 部分安卓机不写具体width会导致文字显示不全
            size === 'sm' && styles.androidFixed,
            textStyle,
            styleText
          ]}
          align='center'
          selectable={false}
        >
          {children}
        </Text>
        {extra}
      </Flex>
    )

    if (onPress) {
      return (
        <Touchable style={wrapStyle} onPress={onPress} {...other}>
          {content}
        </Touchable>
      )
    }

    return (
      <View style={wrapStyle} {...other}>
        {content}
      </View>
    )
  }
)
