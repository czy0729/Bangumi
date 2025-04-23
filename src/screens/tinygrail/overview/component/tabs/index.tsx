/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 07:57:30
 */
import React from 'react'
import { ob } from '@utils/decorators'
import TinygrailTabs from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  return (
    <TinygrailTabs
      routes={TABS}
      renderContentHeaderComponent={<ToolBar />}
      renderItem={renderItem}
    />
  )
}

export default ob(Tabs, COMPONENT)
