/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:30:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-10 17:30:34
 */
import React from 'react'
import WebView from '@components/@/web-view'
import { SafeAreaView } from '@screens/_'
import { _ } from '@stores'
import { withHeader, ob } from '@utils/decorators'
import { info } from '@utils/ui'
import { IOS } from '@constants'
import { html } from './utils'

const title = 'iOS暂请自行截屏'

export default
@withHeader({
  screen: title
})
@ob
class WebViewShare extends React.Component {
  get source() {
    const { navigation } = this.props
    const { _url, _cover, _title, _content, _detail } = navigation.state.params
    return {
      html: html
        .replace(/\$url/g, _url)
        .replace(/\$cover/g, _cover)
        .replace(/\$title/g, _title)
        .replace(/\$content/g, _content)
        .replace(/\$detail/g, _detail)
    }
  }

  saved = false

  onMessage = async event => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case 'base64':
          if (IOS) return

          if (data?.dataUrl) {
            if (this.saved) {
              info('已保存到相册')
              return
            }
          }
          break
        default:
          break
      }
    } catch (ex) {
      this.onError()
    }
  }

  render() {
    return (
      <SafeAreaView style={_.container.flex}>
        <WebView
          originWhitelist={['*']}
          source={this.source}
          onMessage={this.onMessage}
        />
      </SafeAreaView>
    )
  }
}
