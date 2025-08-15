/*
 * @Author: czy0729
 * @Date: 2020-03-11 11:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 21:19:02
 */
import React from 'react'
import { AppState, AppStateStatus, Clipboard, NativeEventSubscription } from 'react-native'
import { Component } from '@components'
import { appNavigate, confirm, matchBgmUrl, navigationReference } from '@utils'
import { r } from '@utils/dev'
import { IOS, WEB } from '@constants'
import { COMPONENT } from './ds'

let lastUrl = ''

/** 监听剪贴板疑似 bgm 链接 */
export const ListenClipboard = class ListenClipboardComponent extends React.Component {
  state = {
    appState: AppState.currentState
  }

  appStateListener: NativeEventSubscription

  componentDidMount() {
    // 从 iOS 14 开始会有粘贴板读取提示, 很烦人暂时屏蔽
    if (IOS || WEB) return

    this.appStateListener = AppState.addEventListener('change', this.onAppStateChange)
    setTimeout(() => {
      this.checkContent()
    }, 2800)
  }

  componentWillUnmount() {
    if (IOS || WEB) return

    try {
      this.appStateListener.remove()
    } catch (error) {}
  }

  onAppStateChange = (nextAppState: AppStateStatus) => {
    const { appState } = this.state
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkContent()
    }

    this.setState({
      appState: nextAppState
    })
  }

  checkContent = async () => {
    const content = await Clipboard.getString()
    const urls = (matchBgmUrl(content, true) || []) as string[]
    const url = urls[0]
    if (url && url !== lastUrl) {
      lastUrl = url

      // 排除多个角色 小圣杯粘贴板逻辑
      const { length } = urls.filter(item => item.includes('/character/'))
      if (!(length > 1)) {
        confirm(`检测到链接 ${url}, 前往页面?`, () => {
          appNavigate(content, navigationReference())
        })
        Clipboard.setString('')
      }
    }
  }

  render() {
    r(COMPONENT)

    return <Component id='base-listen-clipboard' />
  }
}

export default ListenClipboard
