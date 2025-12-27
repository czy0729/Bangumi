/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:41:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 06:10:39
 */
import React from 'react'
import { TabsV2 } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'

function Tabs({ routes, renderItem, ...other }) {
  const { $ } = useStore<any>()

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
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
  ))
}

export default Tabs
