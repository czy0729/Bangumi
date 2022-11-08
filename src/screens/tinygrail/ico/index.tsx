/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 17:46:07
 */
import React from 'react'
import { Header, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Tabs from '@tinygrail/_/tabs-v2'
import List from './list'
import Store from './store'
import { TABS } from './ds'
import { Ctx } from './types'

class TinygrailICO extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  render() {
    const { $ }: Ctx = this.context
    const { _loaded } = $.state
    return (
      <>
        <StatusBarEvents />
        <Header
          title='ICO榜单'
          hm={['tinygrail/ico', 'TinygrailICO']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
        />
        <Page style={_.container.tinygrail} loaded={_loaded}>
          <Tabs
            routes={TABS}
            renderItem={item => <List key={item.key} id={item.key} />}
          />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailICO))
