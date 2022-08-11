/*
 * 自定义按钮
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 05:16:07
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { titleCase } from '@utils'
import { ViewStyle, TextStyle } from '@types'
import { Activity } from '../activity'
import { Flex } from '../flex'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'
import { Props as ButtonProps } from './types'

export { ButtonProps }

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
  }: ButtonProps) => {
    const styles = memoStyles()
    const wrapStyle: ViewStyle[] = [styles.button]
    const textStyle: TextStyle[] = [styles.text]
    let textBold = false

    if (shadow && !_.isDark) wrapStyle.push(styles.shadow)
    if (type) {
      wrapStyle.push(styles[type])
      textStyle.push(styles[`text${titleCase(type)}`])
    }
    if (size) {
      const textSize = `text${titleCase(size)}`
      wrapStyle.push(styles[size])
      textStyle.push(styles[textSize])
      if (textSize === 'textSm') textBold = true
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
          bold={textBold}
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
