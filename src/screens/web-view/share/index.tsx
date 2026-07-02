/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:30:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 06:25:24
 */
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2 } from '@components'
import { IconTouchable, SafeAreaView } from '@_'
import { _ } from '@stores'
import { feedback, getStorage, info, loading, setStorage } from '@utils'
import { saveBase64ImageToCameraRoll, saveBase64ImageToShareSheet } from '@utils/android'
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
          if (data?.dataUrl) {
            if (this.saved) {
              info(IOS ? '已保存' : '已保存到相册')
              return
            }

            IOS ? this.saveToShareSheet(data.dataUrl) : this.saveToCameraRoll(data.dataUrl)
          }
          break

        default:
          break
      }
    } catch (ex) {}
  }

  saveToShareSheet = (dataUrl: string) => {
    saveBase64ImageToShareSheet(
      dataUrl,
      () => {
        this.saved = true
        info('已保存')
        feedback()
      },
      () => {
        info('保存失败，请重试')
      }
    )
  }

  saveToCameraRoll = (dataUrl: string) => {
    saveBase64ImageToCameraRoll(
      dataUrl,
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
          style={{
            flex: 1,
            backgroundColor: '#000'
          }}
        >
          <HeaderPlaceholder />
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
          title='长按保存图片'
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

export default observer(WebViewShare)
