/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 10:21:41
 */
import React from 'react'
import { View } from 'react-native'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { TITLE_BLOG } from '../ds'
import { Ctx } from '../types'
import Blog from './blog'
import { memoStyles } from './styles'

export default obc(({ onBlockRef }, { $, navigation }: Ctx) => {
  rerender('Subject.Blog')

  if (!$.showBlog[1]) return null

  const { showBlog } = systemStore.setting
  return (
    <>
      <View ref={ref => onBlockRef(ref, TITLE_BLOG)} />
      <Blog
        navigation={navigation}
        styles={memoStyles()}
        showBlog={showBlog}
        subjectId={$.subjectId}
        blog={$.filterBlog}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
})
