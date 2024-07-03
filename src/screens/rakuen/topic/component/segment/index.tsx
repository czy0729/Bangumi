/*
 * @Author: czy0729
 * @Date: 2021-01-20 19:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-03 16:22:29
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, SegmentedControl } from '@components'
import { _, rakuenStore } from '@stores'
import { feedback, info } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Segement(props, { $ }: Ctx) {
  const segmentedControlDS = ['全部']
  if ($.state.filterPost) {
    segmentedControlDS.push('跳转')
  } else {
    if (rakuenStore.setting.likes) {
      const likesCounts = $.likesFloorIds?.length || 0
      if (likesCounts) segmentedControlDS.push(`贴贴 ${likesCounts}`)
    }

    const hasLogin = !!$.myId
    if (hasLogin && $.commentMeCount) segmentedControlDS.push(`我 ${$.commentMeCount}`)
    if (hasLogin && $.commentFriendsCount) segmentedControlDS.push(`好友 ${$.commentFriendsCount}`)
  }
  if (segmentedControlDS.length <= 1) return null

  let selectedIndex = 0
  if ($.state.filterPost) {
    selectedIndex = segmentedControlDS.length - 1
  } else if (segmentedControlDS.length > 1) {
    const { filterType } = $.state
    if (filterType === 'likes') {
      selectedIndex = segmentedControlDS.findIndex(item => item.includes('贴贴'))
    } else if (filterType === 'me') {
      selectedIndex = segmentedControlDS.findIndex(item => item.includes('我'))
    } else if (filterType === 'friends') {
      selectedIndex = segmentedControlDS.findIndex(item => item.includes('好友'))
    }
  }
  if (selectedIndex === -1) selectedIndex = 0

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
          if ($.state.filterPost) {
            info('取消仅显示跳转楼层')
            feedback()
            setTimeout(() => {
              $.clearFilterPost()
            }, 0)
            return
          }

          const { filterType } = $.state
          if (title.includes('贴贴') && filterType !== 'likes') {
            $.onFilterLikes()
            return
          }

          if (title.includes('我') && filterType !== 'me') {
            $.onFilterMe()
            return
          }

          if (title.includes('好友') && filterType !== 'friends') {
            $.onFilterFriends()
            return
          }

          $.onFilterClear()
        }}
      />
      <Heatmap right={74} bottom={24} id='帖子.好友相关' />
      <Heatmap right={24} bottom={24} id='帖子.与我相关' />
    </View>
  )
}

export default obc(Segement, COMPONENT)
