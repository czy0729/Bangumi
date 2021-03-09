/*
 * 统一iOS和安卓的阴影效果 (很多问题, 待废弃)
 * @Author: czy0729
 * @Date: 2019-04-01 07:54:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 11:46:57
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS } from '@constants'

export const Shadow = observer(({ style, children }) => {
  const styles = memoStyles()
  return (
    <View style={style ? [styles.shadow, style] : styles.shadow}>
      {children}
    </View>
  )
})

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
