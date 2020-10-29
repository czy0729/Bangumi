/*
 * @Author: czy0729
 * @Date: 2020-10-29 15:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-29 19:45:39
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import Flex from './flex'

const d1ts = 24 * 60 * 60
const d3ts = 3 * d1ts

function UserStatus({ style, last, children }) {
  if (!last) {
    return children
  }

  const ts = getTimestamp()
  const distance = ts - last
  if (distance > d3ts) {
    return children
  }

  const styles = memoStyles()
  return (
    <View>
      {children}
      <Flex style={[styles.wrap, style]} justify='center' pointerEvents='none'>
        <View style={[styles.badge, distance >= d1ts && styles.badgeWarning]} />
      </Flex>
    </View>
  )
}

export default observer(UserStatus)

const memoStyles = _.memoStyles(_ => ({
  wrap: {
    position: 'absolute',
    zIndex: 10,
    right: -3,
    bottom: -3,
    width: 14,
    height: 14,
    backgroundColor: _.colorPlain,
    borderRadius: 14
  },
  badge: {
    width: 8,
    height: 8,
    backgroundColor: _.colorSuccess,
    borderRadius: 8
  },
  badgeWarning: {
    backgroundColor: _.colorWarning
  }
}))
