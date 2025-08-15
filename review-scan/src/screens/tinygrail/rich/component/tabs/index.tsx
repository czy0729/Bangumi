/*
 * @Author: czy0729
 * @Date: 2024-03-11 17:06:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-11 17:06:32
 */
import React from 'react'
import { ob } from '@utils/decorators'
import TinygrailTabs from '@tinygrail/_/tabs-v2'
import { TABS } from '../../ds'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function Tabs() {
  return <TinygrailTabs routes={TABS} renderItem={renderItem} />
}

export default ob(Tabs, COMPONENT)
