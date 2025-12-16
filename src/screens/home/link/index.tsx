/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 00:45:57
 */
import React from 'react'
import { Component, Empty, Page } from '@components'
import { _, StoreContext } from '@stores'
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
    const { error, map, hideRelates, _loaded } = $.state

    return (
      <Component id='screen-subject-link'>
        <StoreContext.Provider value={id}>
          <Page style={_.container.header} loaded={_loaded && map._loaded}>
            {error ? (
              <Empty text='当前没有足够的关联数据' />
            ) : !!map.node.length && !$.filterMap.node.length ? (
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
