/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:19:10
 */
import React from 'react'
import { Component, Empty, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Options from './component/options'
import RelationGraph from './component/relation-graph'
import Header from './header'
import { useSubjectLinkPage } from './hooks'

import type { NavigationProps } from '@types'

/** 条目关联 */
const SubjectLink = (props: NavigationProps) => {
  const { id, $ } = useSubjectLinkPage(props)

  return useObserver(() => {
    const { error, hideRelates, _loaded } = $.state

    return (
      <Component id='screen-subject-link'>
        <StoreContext.Provider value={id}>
          <Page loaded={_loaded && $.map._loaded}>
            <HeaderPlaceholder />
            {error ? (
              <Empty text='当前没有足够的关联数据' />
            ) : !!$.map.node.length && !$.filterMap.node.length ? (
              <Empty text='请注意，没有符合当前筛选条件的结果' />
            ) : (
              <RelationGraph
                key={$.key}
                data={$.filterMap}
                focusId={$.subjectId}
                hideRelates={hideRelates}
                onScroll={$.onScroll}
              />
            )}
          </Page>
          <Header />
          <Options />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default SubjectLink
