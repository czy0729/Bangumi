/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 19:35:50
 */
import React from 'react'
import { Header, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import ToolBar from '@tinygrail/_/tool-bar'
import IconGo from '@tinygrail/_/icon-go'
import { SORT_DS } from '@tinygrail/overview/ds'
import List from './list'
import Store from './store'
import { TABS } from './ds'
import { Ctx } from './types'

class TinygrailNew extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  renderContentHeaderComponent() {
    const { $ }: Ctx = this.context
    const { level, sort, direction } = $.state
    return (
      <ToolBar
        data={SORT_DS}
        level={level}
        levelMap={$.levelMap}
        sort={sort}
        direction={direction}
        onLevelSelect={$.onLevelSelect}
        onSortPress={$.onSortPress}
      />
    )
  }

  render() {
    const { $ }: Ctx = this.context
    const { _loaded } = $.state
    return (
      <>
        <StatusBarEvents />
        <Header
          title='新番榜单'
          hm={['tinygrail/new', 'TinygrailNew']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => <IconGo $={$} />}
        />
        <Page style={_.container.tinygrail} loaded={_loaded}>
          <Tabs
            routes={TABS}
            renderContentHeaderComponent={this.renderContentHeaderComponent()}
            renderItem={item => <List key={item.key} id={item.key} />}
          />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailNew))
