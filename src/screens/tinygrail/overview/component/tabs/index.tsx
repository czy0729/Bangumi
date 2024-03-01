/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-02 05:00:10
 */
import React from 'react'
import { ob } from '@utils/decorators'
import TabsComp from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import List from '../list'
import ToolBar from '../tool-bar'
import { COMPONENT } from './ds'

function Tabs() {
  return (
    <TabsComp routes={TABS} renderContentHeaderComponent={<ToolBar />} renderItem={renderItem} />
  )
}

export default ob(Tabs, COMPONENT)

function renderItem(item: any) {
  return <List key={item.key} id={item.key} />
}
