/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:41:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-19 22:18:47
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import { _ } from '@stores'

function Tabs({ tabs, children, ...other }, { $ }) {
  const styles = memoStyles()
  const { page } = $.state
  return (
    <CompTabs
      style={styles.tabs}
      tabs={tabs}
      initialPage={page}
      tabBarStyle={styles.tabBarStyle}
      tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
      tabBarActiveTextColor={_.colorTinygrailPlain}
      tabBarInactiveTextColor={_.colorTinygrailText}
      onChange={$.onChange}
      {...other}
    >
      {children}
    </CompTabs>
  )
}

Tabs.contextTypes = {
  $: PropTypes.object
}

export default observer(Tabs)

const memoStyles = _.memoStyles(_ => ({
  tabs: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  tabBarStyle: {
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorTinygrailBorder
  },
  tabBarUnderlineStyle: {
    backgroundColor: _.colorWarning
  }
}))
