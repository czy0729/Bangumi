/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:52:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-15 12:35:15
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { toFixed } from '@utils'

function Bar({ style, total, level, next }) {
  const styles = memoStyles()
  const percent = toFixed((total / next) * 100, 0)
  let backgroundColor
  switch (level) {
    case 0:
      backgroundColor = '#aaa'
      break
    case 1:
      backgroundColor = _.colorBid
      break
    case 2:
      backgroundColor = _.colorPrimary
      break
    case 3:
      backgroundColor = '#ffdc51'
      break
    case 4:
      backgroundColor = _.colorWarning
      break
    case 5:
      backgroundColor = _.colorMain
      break
    default:
      backgroundColor = _.colorAsk
      break
  }
  return (
    <View style={[styles.ico, style]}>
      <Text style={[styles.iconText, styles.iconTextDark]} align='center'>
        lv.{level} {percent}%
      </Text>
      <View style={[styles.icoBar, styles.icoBarDark]}>
        <View
          style={[
            styles.icoProcess,
            {
              width: `${percent}%`,
              backgroundColor
            }
          ]}
        />
      </View>
    </View>
  )
}

export default observer(Bar)

const memoStyles = _.memoStyles(_ => ({
  ico: {
    height: 24
  },
  icoBar: {
    width: '100%',
    height: 24,
    backgroundColor: _.colorBorder,
    borderRadius: 12,
    overflow: 'hidden'
  },
  icoBarDark: {
    backgroundColor: _.colorTinygrailBorder
  },
  icoProcess: {
    height: 24,
    borderRadius: 12,
    overflow: 'hidden'
  },
  iconText: {
    position: 'absolute',
    zIndex: 1,
    top: 3,
    right: _.wind
  },
  iconTextDark: {
    color: _.colorTinygrailPlain
  }
}))
