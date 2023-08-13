/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:12:16
 */
import React from 'react'
import { Header, Page } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import Tabs from '@tinygrail/_/tabs-v2'
import IconGo from '@tinygrail/_/icon-go'
import List from './list'
import Store from './store'
import { TABS } from './ds'
import { Ctx } from './types'

class TinygrailLogs extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  render() {
    const { $ } = this.context as Ctx
    const { _loaded } = $.state
    return (
      <>
        <Header
          title='资金日志'
          hm={['tinygrail/logs', 'TinygrailLogs']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => <IconGo $={$} />}
        />
        <Page
          style={_.container.tinygrail}
          loaded={_loaded}
          loadingColor={_.colorTinygrailText}
        >
          <Tabs
            routes={TABS}
            tabBarLength={6}
            renderItem={(item: (typeof TABS)[number]) => (
              <List key={item.key} title={item.title} />
            )}
          />
        </Page>
      </>
    )
  }
}

export default inject(Store)(obc(TinygrailLogs))
