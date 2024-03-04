/*
 * @Author: czy0729
 * @Date: 2024-03-05 03:12:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 03:53:53
 */
import React from 'react'
import { ob } from '@utils/decorators'
import TabsComp from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import ToolBar from '../tool-bar'
import Label from './label'
import { renderItem, renderLabel } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  return (
    <TabsComp
      routes={TABS}
      renderContentHeaderComponent={<ToolBar />}
      renderItem={renderItem}
      renderLabel={renderLabel}
    />
  )
}

export default ob(Tabs, COMPONENT)
