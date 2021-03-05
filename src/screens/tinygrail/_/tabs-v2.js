/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:41:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-05 13:58:16
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

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

export default obc(Tabs)
