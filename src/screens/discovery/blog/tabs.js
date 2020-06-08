/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 00:10:42
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Tabs as CompTabs } from '@components'

function Tabs({ tabs, children, ...other }, { $ }) {
  const { page } = $.state
  return (
    <CompTabs
      tabs={tabs}
      initialPage={page}
      onChange={$.onTabChange}
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
