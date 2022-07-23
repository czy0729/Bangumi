/*
 * 评分
 *
 * @Author: czy0729
 * @Date: 2019-04-10 15:17:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 12:51:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as StarsProps } from './types'

export { StarsProps }

const NUMS = [1, 2, 3, 4, 5] as const

export const Stars = ob(
  ({ style, simple = false, value = 0, size = 11, type = 'sub' }: StarsProps) => {
    if (systemStore.setting.hideScore || !value) return null

    if (simple) {
      return (
        <Flex style={style}>
          <Iconfont name='md-star' size={size} color={_.colorWarning} />
          <Text style={_.ml.xxs} type={type} size={size} bold>
            {value}
          </Text>
        </Flex>
      )
    }

    return (
      <Flex style={style}>
        {NUMS.map(item => {
          if (Number(value) / 2 >= item) {
            return (
              <Iconfont key={item} name='md-star' size={size} color={_.colorWarning} />
            )
          }

          if (Number(value) / 2 >= item - 0.5) {
            return (
              <View key={item}>
                <Iconfont name='md-star' size={size} color={_.colorBorder} />
                <Iconfont
                  style={styles.half}
                  name='md-star-half'
                  size={size}
                  color={_.colorWarning}
                />
              </View>
            )
          }

          return (
            <Iconfont key={item} name='md-star' size={size} color={_.colorBorder} />
          )
        })}
        <Text style={_.ml.xxs} type={type} size={size} lineHeight={size} bold>
          {value}
        </Text>
      </Flex>
    )
  }
)
