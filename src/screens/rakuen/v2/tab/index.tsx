/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-28 15:56:27
 */
import React from 'react'
import { View } from 'react-native'
import { TabView } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import TabBar from './tab-bar'
import { Ctx } from '../types'
import renderScene from './renderScene'
import { memoStyles } from './styles'

function Tab(props, { $ }: Ctx) {
  const { _loaded } = $.state
  if (!_loaded) return null

  const styles = memoStyles()
  return (
    <TabView
      key={_.orientation}
      style={_.mt._sm}
      sceneContainerStyle={styles.sceneContainerStyle}
      lazy
      lazyPreloadDistance={0}
      navigationState={$.navigationState}
      renderTabBar={renderTabBar}
      renderBackground={
        <View style={_.ios(styles.blurViewIOS, styles.blurViewAndroid)}>
          {IOS && <BlurView style={_.absoluteFill} />}
        </View>
      }
      renderScene={renderScene}
      onIndexChange={$.onChange}
    />
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} />
}
