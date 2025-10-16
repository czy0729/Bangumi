/*
 * @Author: czy0729
 * @Date: 2021-01-20 19:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 23:31:23
 */
import React, { useCallback, useMemo } from 'react'
import { SegmentedControl } from '@components'
import { _, rakuenStore, userStore, useStore } from '@stores'
import { feedback, info } from '@utils'
import { useObserver } from '@utils/hooks'
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

import type { Data } from './types'
import type { Ctx } from '../../types'

function Segement() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { state, commentFollowCount, commentMeCount, commentFriendsCount, likesFloorIds } = $
    const { filterPost, filterType } = state

    // 构造分段按钮数据
    const data: Data = useMemo(() => {
      const list: Data = [FILTER_ALL]

      if (filterPost) {
        list.push(FILTER_POST)
      } else {
        let count = commentFollowCount
        if (count) list.push(`${FILTER_FOLLOW} ${count}`)

        if (userStore.myId) {
          count = commentMeCount
          if (count) list.push(`${FILTER_ME} ${count}`)

          count = commentFriendsCount
          if (count) list.push(`${FILTER_FRIENDS} ${count}`)
        }

        if (rakuenStore.setting.likes) {
          count = likesFloorIds?.length || 0
          if (count) list.push(`${FILTER_LIKES} ${count}`)
        }
      }

      return list
    }, [filterPost, commentFollowCount, commentMeCount, commentFriendsCount, likesFloorIds?.length])

    // 当前选中的分段索引
    const selectedIndex = useMemo(() => {
      if (filterPost) return data.length - 1

      const text = FILTER_MAP[filterType] || ''
      if (!text) return 0

      const index = data.findIndex(item => item.includes(text))
      return index === -1 ? 0 : index
    }, [filterPost, filterType, data])

    // 动态宽度 & 字体大小
    const { length } = data
    const { width, size } = useMemo(() => {
      if (length >= 5) return { width: 44, size: 10 }
      if (length === 4) return { width: 48, size: 11 }
      return { width: 52, size: 11 }
    }, [length])

    // 点击事件逻辑
    const handleChange = useCallback(
      (title: string) => {
        if (filterPost) {
          info('取消仅显示跳转楼层')
          feedback()
          setTimeout(() => $.clearFilterPost(), 0)
          return
        }

        if (title.includes(FILTER_FOLLOW) && filterType !== 'follow') return $.onFilterFollow()
        if (title.includes(FILTER_LIKES) && filterType !== 'likes') return $.onFilterLikes()
        if (title.includes(FILTER_ME) && filterType !== 'me') return $.onFilterMe()
        if (title.includes(FILTER_FRIENDS) && filterType !== 'friends') return $.onFilterFriends()

        $.onFilterClear()
      },
      [filterPost, filterType]
    )

    if (data.length <= 1) return null

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
        onValueChange={handleChange}
      />
    )
  })
}

export default Segement
