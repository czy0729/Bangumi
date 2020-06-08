/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:48:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-05 09:46:28
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
