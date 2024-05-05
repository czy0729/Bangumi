/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:55:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:36:41
 */
import React from 'react'
import { Header, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import IconGo from '@tinygrail/_/icon-go'
import ToolBar from '@tinygrail/_/tool-bar'
import { SORT_DS } from '@tinygrail/overview/ds'
import List from './list'
import Store from './store'
import { Ctx } from './types'

/** 英灵殿 */
class TinygrailValhall extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  renderContentHeaderComponent() {
    const { $ } = this.context as Ctx
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
    const { $ } = this.context as Ctx
    return (
      <>
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
