/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:17:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 16:12:48
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Iconfont, Text } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { fontSize } from '@styles'
import { COMPONENT, NUMS } from './ds'
import { styles } from './styles'
import { Props as StarsProps } from './types'

export { StarsProps }

/** 评分 */
export const Stars = ob(
  ({
    style,
    textStyle,
    simple = false,
    value = 0,
    size = 11,
    type = 'sub',
    color,
    extraText,
    hideScore
  }: StarsProps) => {
    if (hideScore || !value) return null
    if (hideScore === undefined && systemStore.setting.hideScore) return null

    const transform = WEB && size < 12
    const webStyle = transform && fontSize(size, size, true)
    if (simple) {
      return (
        <Component id='base-stars' data-simple={simple}>
          <Flex style={style}>
            <Iconfont style={webStyle} name='md-star' size={size} color={color || _.colorWarning} />
            <Text style={stl(_.ml.xxs, textStyle, webStyle)} type={type} size={size} bold>
              {value}
              {extraText}
            </Text>
          </Flex>
        </Component>
      )
    }

    return (
      <Component id='base-stars' data-simple={simple}>
        <Flex style={style} align={transform ? 'start' : 'center'}>
          {NUMS.map(item => {
            if (Number(value) / 2 >= item) {
              return (
                <Iconfont
                  key={item}
                  style={webStyle}
                  name='md-star'
                  size={size}
                  color={color || _.colorWarning}
                />
              )
            }

            if (Number(value) / 2 >= item - 0.5) {
              return (
                <View key={item}>
                  <Iconfont
                    style={webStyle}
                    name='md-star'
                    size={size}
                    color={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.4)')}
                  />
                  <Iconfont
                    style={stl(styles.half, webStyle)}
                    name='md-star-half'
                    size={size}
                    color={color || _.colorWarning}
                  />
                </View>
              )
            }

            return (
              <Iconfont
                key={item}
                style={webStyle}
                name='md-star'
                size={size}
                color={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.4)')}
              />
            )
          })}
          <Text
            style={stl(_.ml.xxs, textStyle, transform && fontSize(size, size, true))}
            type={type}
            size={size}
            lineHeight={size}
            bold
          >
            {value}
            {extraText}
          </Text>
        </Flex>
      </Component>
    )
  },
  COMPONENT
)

export default Stars
