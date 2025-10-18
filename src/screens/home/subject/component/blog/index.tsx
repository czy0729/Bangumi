/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-19 21:58:31
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_BLOG } from '../../ds'
import Split from '../split'
import Blog from './blog'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function BlogWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default BlogWrap
