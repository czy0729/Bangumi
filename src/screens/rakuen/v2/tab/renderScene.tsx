/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:06:33
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import List from '../list'
import { TABS } from '../ds'

const renderScene = (item: any, index: number) => () => <List index={index} />

export default SceneMap(
  TABS.reduce(
    (acc, tab) => ({
      ...acc,
      [tab.key]: renderScene(tab, TABS.indexOf(tab))
    }),
    {}
  )
)
