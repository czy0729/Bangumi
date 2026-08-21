/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 09:00:30
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Activity } from '../activity'
import { Flex } from '../flex'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { getButtonStyles } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ButtonProps } from './types'
export type { ButtonProps }

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
    const { wrapStyle, textStyle, textBold } = getButtonStyles(
      styles,
      { type, size, shadow, radius, style },
      children
    )

    const elContent = (
      <Flex justify='center'>
        {loading ? (
          <View style={styles.loading}>
            <Activity color={type === 'plain' ? 'rgb(128, 128, 128)' : 'white'} size='small' />
          </View>
        ) : (
          <>
            {!!children && (
              <Text
                style={stl(size === 'sm' && styles.androidFixed, textStyle, styleText)}
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

    return (
      <Component id='component-button' {...(dataTitle ? { 'data-title': dataTitle } : {})}>
        {!loading && onPress ? (
          <Touchable animate={animate} onPress={onPress} onLongPress={onLongPress} {...other}>
            <View style={wrapStyle}>{elContent}</View>
          </Touchable>
        ) : (
          <View style={wrapStyle} {...other}>
            {elContent}
          </View>
        )}
      </Component>
    )
  }
)

export default Button
