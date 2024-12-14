/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:30:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:41:50
 */
import React from 'react'
import { View } from 'react-native'
import { Component, HeaderV2 } from '@components'
import WebView from '@components/@/web-view'
import { IconTouchable, SafeAreaView } from '@_'
import { _ } from '@stores'
import { feedback, getStorage, info, loading, setStorage } from '@utils'
import { saveBase64ImageToCameraRoll } from '@utils/android'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { html } from './utils'
import { styles } from './styles'

const NAMESPACE = 'ScreenWebViewShare'

/** 条目分享 */
class WebViewShare extends React.Component<{
  route: any
}> {
  state = {
    captured: false,
    dark: false
  }

  hide = null

  saved = false

  async componentDidMount() {
    const dark: boolean = (await getStorage(`${NAMESPACE}|dark`)) || false
    this.setState(
      {
        dark
      },
      () => {
        if (!this.hide) this.hide = loading('生成中...')
      }
    )
  }

  onToggleTheme = () => {
    const { dark } = this.state
    if (!this.hide) this.hide = loading('生成中...')

    const value = !dark
    this.setState({
      captured: false,
      dark: value
    })
    setStorage(`${NAMESPACE}|dark`, value)
  }

  onMessage = async (event: { nativeEvent: { data: string } }) => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case 'captured':
          setTimeout(() => {
            this.setState({
              captured: true
            })

            if (this.hide) {
              this.hide()
              this.hide = null
            }
          }, 400)
          break

        case 'base64':
          if (IOS) return

          if (data?.dataUrl) {
            if (this.saved) {
              info('已保存到相册')
              return
            }

            saveBase64ImageToCameraRoll(
              data.dataUrl,
              () => {
                this.saved = true
                info('已保存到相册')
                feedback()
              },
              () => {
                info('保存失败, 请确保给与读写权限')
              }
            )
          }
          break

        default:
          break
      }
    } catch (ex) {}
  }

  get source() {
    const { route } = this.props
    const { _url, _type, _cover, _title, _content, _detail } = route.params || {}
    const { dark } = this.state
    return {
      html: html(dark, _type)
        .replace(/\$url/g, _url)
        .replace(/\$cover/g, _cover)
        .replace(/\$title/g, _title)
        .replace(/\$content/g, _content)
        .replace(/\$detail/g, _detail)
    }
  }

  render() {
    const { route } = this.props
    const { captured, dark } = this.state
    const backgroundColor = dark ? '#000' : '#fff'
    return (
      <Component id='screen-webview-share'>
        <SafeAreaView
          style={[
            _.container.header,
            {
              flex: 1,
              backgroundColor: '#000'
            }
          ]}
        >
          <WebView
            key={String(dark)}
            originWhitelist={['*']}
            source={this.source}
            onMessage={this.onMessage}
          />
          {!captured && (
            <View
              style={[
                styles.mask,
                {
                  backgroundColor
                }
              ]}
            />
          )}
        </SafeAreaView>
        <HeaderV2
          title={IOS ? 'iOS 暂请自行截屏' : '长按保存图片'}
          alias='条目分享'
          hm={[`share/subject/${route?.params?._subjectId}`, 'Share']}
          headerRight={() => (
            <IconTouchable
              style={_.mr.xs}
              name={dark ? 'moon' : 'sunny'}
              size={19}
              color={_.colorDesc}
              onPress={this.onToggleTheme}
            />
          )}
        />
      </Component>
    )
  }
}

export default ob(WebViewShare)
