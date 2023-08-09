/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-09 01:08:46
 */
import React from 'react'
import { View } from 'react-native'
import {
  Page,
  HardwareTextureRootBlurView,
  HardwareTextureBlurView,
  StatusBarEvents,
  Track
} from '@components'
import { Login } from '@_'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { _, userStore } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Wrap from './wrap'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

const User = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|User`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  return useObserver(() => {
    // 自己并且没登录
    const { id } = $.usersInfo
    if (!id && !userStore.isLogin) return <Login style={_.container.plain} />

    const { _loaded } = $.state
    return (
      <>
        <StatusBarEvents barStyle='light-content' backgroundColor='transparent' />
        <Page>
          <HardwareTextureRootBlurView style={_.container.flex}>
            {!!_loaded && <Wrap />}
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
        </Page>
        <Track title='时光机' hm={[`user/${$.myUserId}?route=user`, 'User']} />
        <Heatmaps />
      </>
    )
  })
}

export default ic(Store, User)
