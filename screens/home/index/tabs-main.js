/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:33:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-21 10:35:31
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withTabsHeader, observer } from '@utils/decorators'
import Tabs from './tabs'
import List from './list'
import Grid from './grid'
import { tabs } from './store'

function TabsMain(props, { $ }) {
  const { grid } = $.state
  return (
    <Tabs $={$} tabBarStyle={withTabsHeader.tabBarStyle}>
      {tabs.map(({ title }) =>
        grid ? (
          <Grid key={title} title={title} />
        ) : (
          <List key={title} title={title} />
        )
      )}
    </Tabs>
  )
}

TabsMain.contextTypes = {
  $: PropTypes.object
}

export default observer(TabsMain)
