/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:28:02
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
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
