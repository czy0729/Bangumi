/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:41:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-24 20:45:24
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { TabsV2 } from '@components'
import { _ } from '@stores'

function Tabs({ routes, ...other }, { $ }) {
  const { page } = $.state
  return (
    <TabsV2
      routes={routes}
      page={page}
      textColor={_.colorTinygrailPlain}
      backgroundColor={_.colorTinygrailContainer}
      borderBottomColor={_.colorTinygrailBorder}
      underlineColor={_.colorWarning}
      onChange={$.onChange}
      {...other}
    />
  )
}

Tabs.contextTypes = {
  $: PropTypes.object
}

export default observer(Tabs)
