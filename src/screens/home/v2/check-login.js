/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-25 10:42:00
 */
import React from 'react'
import { NavigationEvents } from 'react-navigation'
import { obc } from '@utils/decorators'
import { MODEL_SETTING_INITIAL_PAGE } from '@constants/model'

let rendered = false

function CheckLogin(props, { $, navigation }) {
  rerender('Home.CheckLogin')

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
              $.initialPage === MODEL_SETTING_INITIAL_PAGE.getValue('进度')
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
