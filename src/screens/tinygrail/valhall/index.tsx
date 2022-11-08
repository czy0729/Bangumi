/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:55:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 19:51:20
 */
import React from 'react'
import { Header, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import ToolBar from '@tinygrail/_/tool-bar'
import IconGo from '@tinygrail/_/icon-go'
import { SORT_DS } from '@tinygrail/overview/ds'
import List from './list'
import Store from './store'
import { Ctx } from './types'

class TinygrailValhall extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  renderContentHeaderComponent() {
    const { $ }: Ctx = this.context
    const { level, sort, direction } = $.state
    return (
      <ToolBar
        style={_.mt._sm}
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
    return (
      <>
        <StatusBarEvents />
        <Header
          title='英灵殿'
          hm={['tinygrail/valhall', 'TinygrailValhall']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => <IconGo $={$} />}
        />
        <Page style={_.container.tinygrail}>
          {this.renderContentHeaderComponent()}
          <List />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailValhall))
