/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:12:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:24:07
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import TabsComp from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import ToolBar from '../tool-bar'
import { renderItem, renderLabel } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  return (
    <TabsComp
      style={_.container.header}
      routes={TABS}
      renderContentHeaderComponent={<ToolBar />}
      renderItem={renderItem}
      renderLabel={renderLabel}
    />
  )
}

export default ob(Tabs, COMPONENT)
