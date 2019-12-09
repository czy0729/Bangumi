/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:41:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 15:14:52
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import { _ } from '@stores'

function Tabs({ tabs, children, ...other }, { $ }) {
  const { page } = $.state
  return (
    <CompTabs
      style={[
        _.container.flex,
        {
          backgroundColor: _.colorTinygrailContainer
        }
      ]}
      tabs={tabs}
      initialPage={page}
      tabBarStyle={{
        borderBottomWidth: 1,
        borderBottomColor: _.colorTinygrailBorder
      }}
      tabBarUnderlineStyle={{
        backgroundColor: _.colorWarning
      }}
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
