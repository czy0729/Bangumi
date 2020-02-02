/*
 * @Author: czy0729
 * @Date: 2020-02-02 02:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-02 02:48:53
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
      style={_.container.flex}
      tabs={tabs}
      initialPage={page}
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
