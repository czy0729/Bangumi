/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-26 04:24:51
 */
import React from 'react'
import { TabView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../types'
import TabBar from './tab-bar'
import { memoStyles } from './styles'

function Tab({ renderScene }, { $ }: Ctx) {
  global.rerender('Home.Tab.Main')

  const styles = memoStyles()
  return (
    <TabView
      style={_.mt._sm}
      sceneContainerStyle={styles.sceneContainerStyle}
      lazy={!IOS}
      lazyPreloadDistance={0}
      // @ts-expect-error
      navigationState={$.navigationState}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={$.onChange}
    />
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} />
}
