/*
 * @Author: czy0729
 * @Date: 2025-10-23 17:31:29
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-23 17:31:29
 */
import React from 'react'
import TabBarLabel from '../../../component/tab-bar-label'

export function renderLabel({ route, focused }) {
  return <TabBarLabel title={route.title} focused={focused} />
}
