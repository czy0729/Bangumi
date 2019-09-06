/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:19:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-27 16:16:57
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconTabsHeader } from '@screens/_'
import { observer } from '@utils/decorators'
import _ from '@styles'

function Notify({ onPress }) {
  return (
    <View>
      <View style={styles.dot} />
      <IconTabsHeader name='mail' onPress={onPress} />
    </View>
  )
}

export default observer(Notify)

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    zIndex: 2,
    top: 5,
    right: 4,
    width: 12,
    height: 12,
    backgroundColor: _.colorMain,
    borderWidth: 2,
    borderColor: _.colorPlain,
    borderRadius: 12
  }
})
