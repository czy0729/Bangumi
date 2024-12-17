/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:37:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:42:00
 */
import React from 'react'

import { ob } from '@utils/decorators'
import TabsComp from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  return <TabsComp routes={TABS} renderItem={renderItem} />
}

export default ob(Tabs, COMPONENT)
