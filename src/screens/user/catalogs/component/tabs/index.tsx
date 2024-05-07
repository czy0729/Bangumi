/*
 * @Author: czy0729
 * @Date: 2020-03-22 19:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 21:43:49
 */
import React, { useCallback } from 'react'
import { TabsV2 } from '@components'
import { _ } from '@stores'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import List from '../list'
import { COMPONENT } from './ds'

function Tabs(props, { $ }: Ctx) {
  r(COMPONENT)

  const renderItem = useCallback(item => <List key={item.key} id={item.key} />, [])

  return useObserver(() => (
    <TabsV2
      key={_.orientation}
      routes={TABS}
      page={$.state.page}
      renderItem={renderItem}
      onChange={$.onChange}
    />
  ))
}

export default c(Tabs)
