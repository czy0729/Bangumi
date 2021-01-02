/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:17:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-03 04:15:30
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text } from '@components'
import { _, systemStore } from '@stores'

const nums = [1, 2, 3, 4, 5]

function Stars({ style, simple, value, size, type }) {
  if (systemStore.setting.hideScore || !value) {
    return null
  }

  if (simple) {
    return (
      <Flex style={style}>
        <Iconfont name='star-full' size={size} color={_.colorWarning} />
        <Text style={_.ml.xs} type={type} size={size} bold>
          {value}{' '}
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
      <Text style={_.ml.xs} type={type} size={size} lineHeight={size} bold>
        {value}{' '}
      </Text>
    </Flex>
  )
}

Stars.defaultProps = {
  simple: false,
  value: 0,
  size: 11,
  type: 'sub'
}

export default observer(Stars)

const styles = StyleSheet.create({
  half: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '48%',
    overflow: 'hidden'
  }
})
