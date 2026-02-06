/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:14:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 15:06:40
 */
import React from 'react'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailTabs from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  r(COMPONENT)

  return useObserver(() => <TinygrailTabs routes={TABS} tabBarLength={6} renderItem={renderItem} />)
}

export default Tabs
