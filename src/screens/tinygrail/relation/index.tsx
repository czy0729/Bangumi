/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:48:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:25:45
 */
import React from 'react'
import { Header, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import IconGo from '../_/icon-go'
import ToolBar from '../_/tool-bar'
import List from './list'
import Store, { SORT_DS } from './store'
import { Ctx } from './types'

/** 关联角色 */
class TinygrailRelation extends React.Component {
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
          title={$.params?.name || '关联角色'}
          alias='关联角色'
          hm={['tinygrail/relation', 'TinygrailRelation']}
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

export default inject(Store)(obc(TinygrailRelation))
