/*
 * @Author: czy0729
 * @Date: 2022-09-03 10:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 19:03:09
 */
import React from 'react'
import { SceneMap } from 'react-native-tab-view'
import { BlurView } from '@_'
import { IOS } from '@constants'
import List from '../list'
import { TABS } from '../ds'
import { styles } from './styles'

const renderScene = (item, index: number) => () =>
  (
    <>
      <List index={index} />
      {IOS && index === TABS.length - 1 && <BlurView style={styles.blurView} />}
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
