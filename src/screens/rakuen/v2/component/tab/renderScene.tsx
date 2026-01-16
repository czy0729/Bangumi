/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-16 16:23:22
 */
import React from 'react'
import { SceneMap } from '@components'
import { TABS } from '../../ds'
import List from '../list'

const renderScene = (_item: any, index: number) => () => <List index={index} />

export default SceneMap(
  TABS.reduce(
    (acc, tab) => ({
      ...acc,
      [tab.key]: renderScene(tab, TABS.indexOf(tab))
    }),
    {}
  )
)
