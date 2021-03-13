/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:17:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-13 19:09:39
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text } from '@components'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'

const nums = [1, 2, 3, 4, 5]

export const Stars = ob(
  ({ style, simple = false, value = 0, size = 11, type = 'sub' }) => {
    if (systemStore.setting.hideScore || !value) {
      return null
    }

    if (simple) {
      return (
        <Flex style={style}>
          <Iconfont name='star-full' size={size} color={_.colorWarning} />
          <Text style={_.ml.xxs} type={type} size={size} bold>
            {value}
          </Text>
        </Flex>
      )
    }

    return (
      <Flex style={style}>
        {nums.map(item => {
          if (value / 2 >= item) {
            return (
              <Iconfont
                key={item}
                name='star-full'
                size={size}
                color={_.colorWarning}
              />
            )
          }

          if (value / 2 >= item - 0.5) {
            return (
              <View key={item}>
                <Iconfont name='star-full' size={size} color={_.colorBorder} />
                <Iconfont
                  style={styles.half}
                  name='star-half'
                  size={size}
                  color={_.colorWarning}
                />
              </View>
            )
          }

          return (
            <Iconfont
              key={item}
              name='star-full'
              size={size}
              color={_.colorBorder}
            />
          )
        })}
        <Text style={_.ml.xxs} type={type} size={size} lineHeight={size} bold>
          {value}
        </Text>
      </Flex>
    )
  }
)

const styles = _.create({
  half: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '48%',
    overflow: 'hidden'
  }
})
