/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:37:06
 */
import { BackHandler } from 'react-native'
import { info, navigationReference } from '@utils'
import { r } from '@utils/dev'
import { useMount } from '@utils/hooks'
import { Component } from '../component'
import { COMPONENT } from './ds'

let lastBackPressed: number

/** 安卓退后拦截器 */
export const BackAndroid = () => {
  r(COMPONENT)

  useMount(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const navigation = navigationReference()
      if (!navigation) return false

      // 可以认为 index 为 0 时, 在最外的 Tab 页面
      if (navigation?.getRootState()?.index === 0) {
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          setTimeout(() => {
            BackHandler.exitApp()
          }, 0)
          return true
        }

        lastBackPressed = Date.now()
        info('再按一次退出应用')
        return true
      }

      return false
    })

    return () => {
      backHandler.remove()
    }
  })

  return <Component id='component-back-android' />
}

export default BackAndroid
