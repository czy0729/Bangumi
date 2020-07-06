/*
 * 统一iOS和安卓的阴影效果 (很多问题, 待废弃)
 * @Author: czy0729
 * @Date: 2019-04-01 07:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-03 10:21:22
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'

function Shadow({ style, children }) {
  const styles = memoStyles()
  return (
    <View style={style ? [styles.shadow, style] : styles.shadow}>
      {children}
    </View>
  )
}

export default observer(Shadow)

const memoStyles = _.memoStyles(_ => ({
  shadow: IOS
    ? {
        shadowColor: _.colorShadow,
        shadowOffset: {
          height: 4
        },
        shadowOpacity: 0.08,
        shadowRadius: 8
      }
    : {
        elevation: 12
      }
}))
