/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:17:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:54:15
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Iconfont, Text } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { fontSize } from '@styles'
import { COMPONENT, NUMS } from './ds'
import { styles } from './styles'
import { Props as StarsProps } from './types'

export { StarsProps }

/** 评分 */
export const Stars = ob(
  ({ style, simple = false, value = 0, size = 11, type = 'sub' }: StarsProps) => {
    if (systemStore.setting.hideScore || !value) return null

    const transform = STORYBOOK && size < 12
    const webStyle = transform && fontSize(size, size, true)
    if (simple) {
      return (
        <Component id='base-stars' data-simple={simple}>
          <Flex style={style}>
            <Iconfont style={webStyle} name='md-star' size={size} color={_.colorWarning} />
            <Text style={stl(_.ml.xxs, webStyle)} type={type} size={size} bold>
              {value}
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
                  color={_.colorWarning}
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
                    color={_.colorWarning}
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
            style={stl(_.ml.xxs, transform && fontSize(size, size, true))}
            type={type}
            size={size}
            lineHeight={size}
            bold
          >
            {value}
          </Text>
        </Flex>
      </Component>
    )
  },
  COMPONENT
)
