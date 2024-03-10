/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:14:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 17:27:05
 */
import React from 'react'
import { obc } from '@utils/decorators'
import TabsComp from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  return <TabsComp routes={TABS} tabBarLength={6} renderItem={renderItem} />
}

export default obc(Tabs, COMPONENT)
