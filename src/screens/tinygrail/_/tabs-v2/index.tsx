/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:41:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:39:00
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { AnyObject } from '@types'

function Tabs({ routes, renderItem, ...other }, { $ }: AnyObject) {
  return (
    <TabsV2
      key={_.orientation}
      style={_.mt._sm}
      routes={routes}
      page={$.state.page}
      textColor={_.colorTinygrailPlain}
      backgroundColor={_.colorTinygrailContainer}
      borderBottomColor={_.colorTinygrailBorder}
      underlineColor={_.colorWarning}
      renderItem={renderItem}
      onChange={$.onChange}
      {...other}
    />
  )
}

export default obc(Tabs)
