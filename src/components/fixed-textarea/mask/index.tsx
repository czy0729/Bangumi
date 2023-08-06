/*
 * @Author: czy0729
 * @Date: 2023-07-30 18:30:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 06:09:29
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '../../touchable'
import { memoStyles } from './styles'

function Mask({ showTextarea, showBgm, onMask }) {
  if (!(showTextarea || showBgm)) return null

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Touchable withoutFeedback onPress={onMask}>
        <View style={styles.mask} />
      </Touchable>
    </View>
  )
}

export default observer(Mask)
