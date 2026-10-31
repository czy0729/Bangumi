/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * Tab 场景渲染映射
 */
import { SceneMap } from '@components'
import { TABS } from '../../ds'
import List from '../list'

import type { TabLabel } from '../../types'

const renderScene =
  ({ title }: { title: TabLabel }) =>
  () =>
    <List title={title} />

export default SceneMap(
  TABS.reduce(
    (acc, tab) => ({
      ...acc,
      [tab.key]: renderScene(tab)
    }),
    {}
  )
)
