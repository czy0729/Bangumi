/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 18:21:36
 */
import React from 'react'
import { SceneMap } from '@components'
import { BlurView } from '@_'
import { IOS } from '@constants'
import List from '../list'
import { TABS } from '../ds'
import { memoStyles } from './styles'

const renderScene =
  ({ title }, index: number) =>
  () =>
    (
      <>
        <List title={title} />
        {IOS && index === TABS.length - 1 && <BlurView style={memoStyles().blurView} />}
      </>
    )

export default SceneMap(
  TABS.reduce(
    (acc, tab) => ({
      ...acc,
      [tab.key]: renderScene(tab, TABS.indexOf(tab))
    }),
    {}
  )
)
