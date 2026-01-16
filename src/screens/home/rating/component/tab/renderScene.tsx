/*
 * @Author: czy0729
 * @Date: 2025-03-03 17:53:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-16 16:24:18
 */
import React from 'react'
import { SceneMap } from '@components'
import { TABS } from '../../ds'
import List from '../list'

export default SceneMap(
  Object.assign(
    {},
    ...TABS.map(item => ({
      [item.key]: () => <List title={item.title} />
    }))
  )
)
