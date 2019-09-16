/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:41:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-16 20:00:59
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'
import _ from '@styles'
import { colorText } from '../styles'

function Tabs({ tabs, children, ...other }, { $ }) {
  const { page } = $.state
  return (
    <CompTabs
      style={_.container.flex}
      tabs={tabs}
      initialPage={page}
      tabBarUnderlineStyle={{
        backgroundColor: _.colorWarning
      }}
      tabBarActiveTextColor={_.colorPlain}
      tabBarInactiveTextColor={colorText}
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
