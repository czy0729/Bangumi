/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:14:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:50:45
 */
import React from 'react'
import { ob } from '@utils/decorators'
import TinygrailTabs from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  return <TinygrailTabs routes={TABS} tabBarLength={6} renderItem={renderItem} />
}

export default ob(Tabs, COMPONENT)
