/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:55:55
 */
import React from 'react'
import { SceneMap } from '@components'
import { TABS } from '../../ds'
import List from '../list'

const renderScene =
  ({ title }) =>
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
