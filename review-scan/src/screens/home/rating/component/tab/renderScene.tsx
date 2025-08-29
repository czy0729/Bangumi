/*
 * @Author: czy0729
 * @Date: 2025-03-03 17:53:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 17:53:47
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
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
