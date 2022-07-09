/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-09 16:40:58
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import { Ctx } from '../types'
import Blog from './blog'
import { memoStyles } from './styles'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Subject.Blog')

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
  if (!_blog.length) return null

  return (
    <Blog
      navigation={navigation}
      styles={memoStyles()}
      showBlog={showBlog}
      subjectId={$.subjectId}
      blog={_blog}
      onSwitchBlock={$.switchBlock}
    />
  )
})
