/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-20 01:29:36
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl, titleCase } from '@utils'
import { r } from '@utils/dev'
import { TextStyle, ViewStyle } from '@types'
import { Component } from '../component'
import { Activity } from '../activity'
import { Flex } from '../flex'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ButtonProps } from './types'

export { ButtonProps }

/** 自定义按钮 */
export const Button = observer(
  ({
    style,
    styleText,
    type = 'plain',
    size = 'md',
    shadow = false,
    radius = true,
    loading = false,
    bold = false,
    animate = true,
    noWrap = true,
    children,
    extra,
    onPress,
    onLongPress,
    'data-title': dataTitle,
    ...other
  }: ButtonProps) => {
    r(COMPONENT)

    const styles = memoStyles()
    const wrapStyle: ViewStyle[] = [styles.button]
    const textStyle: TextStyle[] = [styles.text]
    let textBold = false

    if (shadow && !_.isDark && (type === 'plain' || type === 'ghostPlain')) {
      wrapStyle.push(styles.shadow)
    }

    if (type) {
      wrapStyle.push(styles[type])
      textStyle.push(styles[`text${titleCase(type)}`])
    }

    if (radius) {
      wrapStyle.push(styles.radius)
    }

    if (size) {
      const textSize = `text${titleCase(size)}`
      wrapStyle.push(styles[size])

      if (textSize === 'textSm') {
        textBold = true

        if (
          (typeof children === 'string' || typeof children === 'number') &&
          String(children).length >= 5
        ) {
          textStyle.push(styles.textXs)
        } else {
          textStyle.push(styles.textSm)
        }
      } else {
        textStyle.push(styles[textSize])
      }
    }

    if (style) {
      wrapStyle.push(style)
    }

    const content = (
      <Flex justify='center'>
        {loading ? (
          <View style={styles.loading}>
            <Activity color={type === 'plain' ? 'rgb(128, 128, 128)' : 'white'} size='small' />
          </View>
        ) : (
          <>
            {!!children && (
              <Text
                style={stl(
                  // 部分安卓机不写具体 width 会导致文字显示不全
                  size === 'sm' && styles.androidFixed,
                  textStyle,
                  styleText
                )}
                align='center'
                bold={textBold || bold}
                selectable={false}
                noWrap={noWrap}
              >
                {children}
              </Text>
            )}
            {extra}
          </>
        )}
      </Flex>
    )

    if (!loading && onPress) {
      const passProps = {
        id: 'component-button' as const
      }
      if (dataTitle) passProps['data-title'] = dataTitle
      return (
        <Component {...passProps}>
          <Touchable animate={animate} onPress={onPress} onLongPress={onLongPress} {...other}>
            <View style={wrapStyle}>{content}</View>
          </Touchable>
        </Component>
      )
    }

    return (
      <Component id='component-button'>
        <View style={wrapStyle} {...other}>
          {content}
        </View>
      </Component>
    )
  }
)

export default Button
