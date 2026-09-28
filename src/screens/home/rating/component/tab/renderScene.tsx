/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 各评分状态标签页的场景映射
 */
import { SceneMap } from '@components'
import { TABS } from '../../ds'
import List from '../list'

import type { ComponentType } from 'react'

const SCENES: Record<string, ComponentType> = {}
TABS.forEach(item => {
  SCENES[item.key] = () => <List title={item.title} />
})

export default SceneMap(SCENES)
