/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-09 16:40:58
 */
import React from 'react'
import { rakuenStore, systemStore } from '@stores'
import { getTimestamp } from '@utils'
import { obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import { Ctx } from '../types'
import Blog from './blog'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  // global.rerender('Subject.Blog')

  const { showBlog } = systemStore.setting
  if (showBlog === -1) return null

  const { blog } = $.subject
  let _blog = blog || []
  if ($.filterDefault || $.isLimit) {
    _blog = _blog.filter(item => {
      if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) return false
      return true
    })
  }

  if (!_blog.length) {
    try {
      const reviews = rakuenStore.reviews($.subjectId)
      if (reviews?.list?.length) {
        // @ts-ignore
        _blog = reviews.list.map(item => ({
          dateline: item.time,
          id: Number(item.id),
          image: '',
          replies: Number(item.replies.replace('+', '') || 0),
          summary: item.content,
          timestamp: getTimestamp(item.time),
          title: item.title,
          url: `//bgm.tv/blog/${item.id}`,
          user: {
            avatar: {
              large: item.avatar,
              medium: item.avatar,
              small: item.avatar
            },
            id: item.userId,
            nickname: item.userName,
            sign: '',
            url: `//bgm.tv/user/${item.userId}`,
            username: item.userId
          }
        }))
      }
    } catch (error) {}
  }

  if (!_blog.length) return null

  return (
    <Blog
      navigation={navigation}
      styles={memoStyles()}
      showBlog={showBlog}
      subjectId={$.subjectId}
      blog={_blog}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
