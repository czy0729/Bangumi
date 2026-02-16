/*
 * @Author: czy0729
 * @Date: 2021-01-20 19:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-02 07:15:30
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { _, rakuenStore, userStore, useStore } from '@stores'
import { feedback, info } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import {
  COMPONENT,
  FILTER_ALL,
  FILTER_FOLLOW,
  FILTER_FRIENDS,
  FILTER_LIKES,
  FILTER_MAP,
  FILTER_ME,
  FILTER_POST
} from './ds'
import { styles } from './styles'
import { DATA } from './types'

function Segement() {
  const { $ } = useStore<Ctx>()
  const data: DATA = [FILTER_ALL]
  if ($.state.filterPost) {
    data.push(FILTER_POST)
  } else {
    // 使用变量保存结果, 能避免可能发生的重复计算
    let count = $.commentFollowCount
    if (count) data.push(`${FILTER_FOLLOW} ${count}`)

    if (userStore.myId) {
      count = $.commentMeCount
      if (count) data.push(`${FILTER_ME} ${count}`)

      count = $.commentFriendsCount
      if (count) data.push(`${FILTER_FRIENDS} ${count}`)
    }

    if (rakuenStore.setting.likes) {
      count = $.likesFloorIds?.length || 0
      if (count) data.push(`${FILTER_LIKES} ${count}`)
    }
  }
  if (data.length <= 1) return null

  let selectedIndex = 0
  if ($.state.filterPost) {
    selectedIndex = data.length - 1
  } else if (data.length > 1) {
    const text = FILTER_MAP[$.state.filterType] || ''
    if (text) selectedIndex = data.findIndex(item => item.includes(text))
  }
  if (selectedIndex === -1) selectedIndex = 0

  const { length } = data
  let width: number = 52
  let size: number = 11
  if (length >= 5) {
    width = 44
    size = 10
  } else if (length === 4) {
    width = 48
  }

  return (
    <SegmentedControl
      key={selectedIndex}
      style={[
        styles.segmentedControl,
        {
          width: length * _.r(width)
        }
      ]}
      size={size}
      values={data}
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
        if (title.includes(FILTER_FOLLOW) && filterType !== 'follow') {
          $.onFilterFollow()
          return
        }

        if (title.includes(FILTER_LIKES) && filterType !== 'likes') {
          $.onFilterLikes()
          return
        }

        if (title.includes(FILTER_ME) && filterType !== 'me') {
          $.onFilterMe()
          return
        }

        if (title.includes(FILTER_FRIENDS) && filterType !== 'friends') {
          $.onFilterFriends()
          return
        }

        $.onFilterClear()
      }}
    />
  )
}

export default ob(Segement, COMPONENT)
