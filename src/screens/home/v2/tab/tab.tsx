/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-09 01:05:25
 */
import React from 'react'
import { View } from 'react-native'
import {
  TabView,
  HardwareTextureRootBlurView,
  HardwareTextureBlurView
} from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import TabBar from './tab-bar'
import { memoStyles } from './styles'

function Tab({ renderScene }, { $ }: Ctx) {
  // global.rerender('Home.Tab.Main')

  const styles = memoStyles()
  return (
    <HardwareTextureRootBlurView style={_.container.flex}>
      <TabView
        style={_.mt._sm}
        sceneContainerStyle={styles.sceneContainerStyle}
        lazy
        lazyPreloadDistance={0}
        // @ts-expect-error
        navigationState={$.navigationState}
        renderTabBar={renderTabBar}
        renderBackground={
          <HardwareTextureBlurView
            style={_.ios(
              $.tabs.length === 5 ? styles.blurViewIOS5 : styles.blurViewIOS4,
              styles.blurViewAndroid
            )}
          />
        }
        renderScene={renderScene}
        onIndexChange={$.onChange}
      />
      <HardwareTextureBlurView
        style={{
          position: 'absolute',
          zIndex: 1,
          right: 0,
          bottom: 0,
          left: 0,
          height: _.tabBarHeight,
          backgroundColor: _.select('transparent', 'rgba(0, 0, 0, 0.5)'),
          overflow: 'hidden'
        }}
        containerStyle={{
          marginTop: -1
        }}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          right: 0,
          bottom: 0,
          left: 0,
          height: 1,
          backgroundColor: _.select('#fff', '#000')
        }}
      />
    </HardwareTextureRootBlurView>
  )
}

export default obc(Tab)

function renderTabBar(props) {
  return <TabBar {...props} />
}
