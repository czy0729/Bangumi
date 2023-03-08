/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 20:35:20
 */
import React from 'react'
import { NavigationEvents } from '@components'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SETTING_INITIAL_PAGE } from '@constants'
import { SettingInitialPage } from '@types'
import { Ctx } from '../types'

let rendered = false

function CheckLogin(props, { $, navigation }: Ctx) {
  global.rerender('Home.CheckLogin')

  const { initialPage } = systemStore.setting
  return (
    <NavigationEvents
      onWillFocus={() => {
        const { _loaded } = $.state
        if (!_loaded) $.init()

        // popToTop回来时需要延时才能获得正确的登出后的isLogin状态
        setTimeout(() => {
          // 当用户设置了App启动首页非进度页时, 第一次渲染前非登录不能跳转到登录页
          if (!rendered) {
            if (
              !$.isLogin &&
              initialPage ===
                MODEL_SETTING_INITIAL_PAGE.getValue<SettingInitialPage>('进度')
            ) {
              navigation.navigate('Auth')
            }
          } else if (!$.isLogin) {
            navigation.navigate('Auth')
          }

          rendered = true
        }, 800)
      }}
    />
  )
}

export default obc(CheckLogin)
