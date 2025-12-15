/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 22:51:56
 */
import React from 'react'
import { Component, Empty, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import RelationGraph from './component/relation-graph'
import Header from './header'
import { useSubjectLinkPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目关联 */
const SubjectLink = (props: NavigationProps) => {
  const { id, $ } = useSubjectLinkPage(props)

  return useObserver(() => {
    const { map, error, _loaded } = $.state

    return (
      <Component id='screen-subject-link'>
        <StoreContext.Provider value={id}>
          <Page style={_.container.header} loaded={_loaded && map._loaded}>
            {error ? (
              <Empty text='该条目没有足够的同类型关联数据' />
            ) : (
              <RelationGraph data={map} focusId={$.subjectId} />
            )}
          </Page>
          <Header />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default SubjectLink
