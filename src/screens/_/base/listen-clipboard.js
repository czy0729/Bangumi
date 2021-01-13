/*
 * @Author: czy0729
 * @Date: 2020-03-11 11:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 23:17:09
 */
import React from 'react'
import { AppState, Clipboard } from 'react-native'
import { matchBgmUrl } from '@utils/match'
import { navigationReference, appNavigate } from '@utils/app'
import { confirm } from '@utils/ui'
import { IOS } from '@constants'

let lastUrl = ''

class ListenClipboard extends React.Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    // iOS14会有粘贴板读取提示, 很烦人暂时屏蔽
    if (IOS) {
      return
    }

    AppState.addEventListener('change', this.onAppStateChange)
    setTimeout(() => {
      this.checkContent()
    }, 1200)
  }

  componentWillUnmount() {
    if (IOS) {
      return
    }

    AppState.removeEventListener('change', this.onAppStateChange)
  }

  onAppStateChange = nextAppState => {
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
    const urls = matchBgmUrl(content, true) || []
    const url = urls[0]
    if (url && url !== lastUrl) {
      lastUrl = url

      // 排除多个角色 小圣杯粘贴板逻辑
      if (!urls.filter(item => item.includes('/character/')).length > 1) {
        confirm(`检测到链接${url}, 前往页面?`, () => {
          appNavigate(url, navigationReference())
        })
        Clipboard.setString('')
      }
    }
  }

  render() {
    return null
  }
}

export default ListenClipboard
