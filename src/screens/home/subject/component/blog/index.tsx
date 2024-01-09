/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 16:21:57
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_BLOG } from '../../ds'
import { Ctx } from '../../types'
import Blog from './blog'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function BlogWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showBlog[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_BLOG)} />
      <Blog
        navigation={navigation}
        styles={memoStyles()}
        showBlog={systemStore.setting.showBlog}
        subjectId={$.subjectId}
        blog={$.filterBlog}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(BlogWrap, COMPONENT)
