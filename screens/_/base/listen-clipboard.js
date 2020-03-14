/*
 * @Author: czy0729
 * @Date: 2020-03-11 11:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-14 17:30:10
 */
import React from 'react'
import { AppState, Clipboard } from 'react-native'
import { matchBgmUrl } from '@utils/match'
import { navigationReference, appNavigate } from '@utils/app'
import { confirm } from '@utils/ui'

let lastUrl = ''

class ListenClipboard extends React.Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this.onAppStateChange)
    setTimeout(() => {
      this.checkContent()
    }, 1200)
  }

  componentWillUnmount() {
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
    const url = matchBgmUrl(content)
    if (url && url !== lastUrl) {
      lastUrl = url
      confirm(`检测到链接${url}, 前往页面?`, () => {
        appNavigate(url, navigationReference())
        Clipboard.setString('')
      })
    }
  }

  render() {
    return null
  }
}

export default ListenClipboard
