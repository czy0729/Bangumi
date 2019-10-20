/*
 * @Author: czy0729
 * @Date: 2019-04-14 20:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-20 18:52:46
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Iconfont } from '@components'
import { Popover } from '@screens/_'
import { observer } from '@utils/decorators'
import _ from '@styles'

function TabBarRight({ $ }) {
  return (
    <Popover data={['列表布局', '方格布局']} onSelect={$.selectLayout}>
      <Iconfont style={styles.icon} name='extra' size={14} />
    </Popover>
  )
}

export default observer(TabBarRight)

const styles = StyleSheet.create({
  icon: {
    marginRight: _.wind + 2,
    marginLeft: _.xs
  }
})
