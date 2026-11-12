/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 07:36:57
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { EmptyGuide } from '@_'
import { _, StoreContext } from '@stores'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useCalendarPage } from './hooks'

import type { NavigationProps } from '@types'

/** 每日放送 */
function Calendar(props: NavigationProps) {
  const { id, $, handleForwardRef, handleScrollToOffset } = useCalendarPage(props)

  /** 当前筛选下的总数 (sections 的 data 是包着当天对象的单元素壳数组, 条目在 data[0].items) */
  const total = $.sections.reduce((sum, section) => sum + (section.data[0]?.items.length || 0), 0)
  const hasFilter = !!($.state.adapt || $.state.tag || $.state.origin)

  /** 清空三个筛选维度 (选中值已回显在 Popover 触发器上, 不另设已选行); 单次 setState, 避免逐维触发的多条埋点 */
  const handleClear = () => {
    $.setState({
      adapt: '',
      tag: '',
      origin: ''
    })
  }

  return (
    <Component id='screen-calendar'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.calendar._loaded}>
          <HeaderPlaceholder style={_.mt.xs} />
          <ToolBar />
          {total === 0 ? (
            <EmptyGuide
              icon='md-inbox'
              title={hasFilter ? '没有符合条件的番剧' : '暂无放送数据'}
              description={hasFilter ? '调整或清除筛选条件后重试' : '下拉刷新或稍后再试'}
              buttonText={hasFilter ? '清除筛选' : undefined}
              onPress={handleClear}
            />
          ) : (
            <List forwardRef={handleForwardRef} />
          )}
        </Page>
        <Header onScrollToOffset={handleScrollToOffset} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Calendar)
