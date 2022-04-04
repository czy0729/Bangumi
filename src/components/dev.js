/*
 * @Author: czy0729
 * @Date: 2022-03-30 20:49:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-30 21:00:10
 */
import React from 'react'
import { View, DevSettings } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { DEV as dev } from '@constants'
import { Flex } from './flex'
import { Touchable } from './touchable'
import { Iconfont } from './iconfont'

export const DEV = observer(() => {
  if (!dev) return null

  const styles = memoStyles()
  return (
    <View style={styles.dev}>
      <Touchable style={styles.touch} onPress={() => DevSettings.reload()}>
        <Flex style={styles.icon} justify='center'>
          <Iconfont name='md-refresh' color={_.colorPlain} size={20} />
        </Flex>
      </Touchable>
    </View>
  )
})

const memoStyles = _.memoStyles(() => ({
  dev: {
    position: 'absolute',
    zIndex: 1000,
    right: _.wind,
    bottom: 40
  },
  touch: {
    backgroundColor: _.colorTitle,
    borderRadius: 20,
    overflow: 'hidden',
    opacity: 0.8
  },
  icon: {
    width: 40,
    height: 40
  }
}))
