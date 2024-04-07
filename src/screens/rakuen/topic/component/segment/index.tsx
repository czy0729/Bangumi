/*
 * @Author: czy0729
 * @Date: 2021-01-20 19:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 09:35:06
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Segement(props, { $ }: Ctx) {
  const segmentedControlDS = ['全部']
  const hasLogin = !!$.myId
  if (hasLogin && $.commentMeCount) segmentedControlDS.push(`我 ${$.commentMeCount}`)
  if (hasLogin && $.commentFriendsCount) segmentedControlDS.push(`好友 ${$.commentFriendsCount}`)

  let selectedIndex = 0
  if (segmentedControlDS.length > 1) {
    if ($.state.filterMe && segmentedControlDS.find(item => item.includes('我'))) {
      selectedIndex = 1
    } else if ($.state.filterFriends) {
      selectedIndex = segmentedControlDS.length - 1
    }
  }

  if (segmentedControlDS.length <= 1) return null

  return (
    <View>
      <SegmentedControl
        key={selectedIndex}
        style={[
          styles.segmentedControl,
          {
            width: segmentedControlDS.length * _.r(56)
          }
        ]}
        size={11}
        values={segmentedControlDS}
        selectedIndex={selectedIndex}
        onValueChange={title => {
          if (
            (title.includes('我') && !$.state.filterMe) ||
            (title === '全部' && $.state.filterMe)
          ) {
            return $.toggleFilterMe()
          }

          if (
            (title.includes('好友') && !$.state.filterFriends) ||
            (title === '全部' && $.state.filterFriends)
          ) {
            $.toggleFilterFriends()
          }
        }}
      />
      <Heatmap right={74} bottom={24} id='帖子.好友相关' />
      <Heatmap right={24} bottom={24} id='帖子.与我相关' />
    </View>
  )
}

export default obc(Segement, COMPONENT)
