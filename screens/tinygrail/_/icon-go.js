/*
 * @Author: czy0729
 * @Date: 2020-02-14 03:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-20 12:10:02
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'

const data = ['K线', '买入', '卖出', '资产重组']

function IconGo({ $ }) {
  const { go } = $.state
  return (
    <Popover style={styles.icon} data={data} onSelect={$.onSelectGo}>
      <Text type='tinygrailText'>→ {go}</Text>
    </Popover>
  )
}

export default observer(IconGo)

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
