/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:49:10
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_BLOG } from '../../ds'
import { Ctx } from '../../types'
import Blog from './blog.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function BlogWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showBlog[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-blog'>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_BLOG)} />
        <Blog
          navigation={navigation}
          styles={memoStyles()}
          showBlog={systemStore.setting.showBlog}
          subjectId={$.subjectId}
          blog={$.filterBlog}
          onSwitchBlock={$.onSwitchBlock}
        />
      </Component>
    </Suspense>
  )
}

export default obc(BlogWrap, COMPONENT)
