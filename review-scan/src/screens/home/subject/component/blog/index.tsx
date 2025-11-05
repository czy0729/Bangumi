/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:31:59
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_BLOG } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Blog from './blog.lazy'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function BlogWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showBlog[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-blog'>
        <View
          ref={ref => onBlockRef(ref, TITLE_BLOG)}
          style={_.container.layout}
          collapsable={false}
        />
        <Blog
          navigation={navigation}
          styles={memoStyles()}
          showBlog={systemStore.setting.showBlog}
          subjectId={$.subjectId}
          blog={$.filterBlog}
          onSwitchBlock={$.onSwitchBlock}
        />
        <Split />
      </Component>
    </Suspense>
  )
}

export default ob(BlogWrap, COMPONENT)
