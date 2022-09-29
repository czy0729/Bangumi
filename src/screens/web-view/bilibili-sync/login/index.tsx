/*
 * @Author: czy0729
 * @Date: 2022-02-18 06:37:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 18:38:31
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import Btn from '../btn'
import {
  TYPE_CHECK_LOGIN,
  TYPE_GET_LIST,
  TYPE_GET_REVIEW,
  injectedJavaScript
} from './utils'
import { memoStyles } from './styles'

const URL_ZONE = 'https://m.bilibili.com/space?from=headline'

let length: any

function Login({ hide, onToggleHide, setData, setReviews }) {
  const [key, setKey] = useState(0)
  const [message, setMessage] = useState('检查状态中...')
  const onMessage = useCallback(
    event => {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case TYPE_CHECK_LOGIN:
          setMessage(
            data?.data?.isLogin
              ? `已${i18n.login()}`
              : `检查${i18n.login()}状态失败，请先${i18n.login()}`
          )
          break

        case TYPE_GET_LIST:
          setMessage('已获取番剧列表')
          setData(data)
          length = data.length
          break

        case TYPE_GET_REVIEW:
          setMessage(`已获取${length}个番剧信息，请收起${i18n.login()}框进行操作`)
          setReviews(data)
          break

        default:
          break
      }
    },
    [setData, setReviews]
  )
  const onRefresh = useCallback(() => {
    setMessage('检查状态中...')
    setKey(key + 1)
  }, [key])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        {!hide && <View style={styles.mask} />}
        <View style={[styles.fixed, hide && styles.hide]}>
          <View style={styles.container}>
            <WebView
              key={key}
              source={{
                uri: URL_ZONE
              }}
              containerStyle={[styles.webview, hide && styles.webviewHide]}
              androidHardwareAccelerationDisabled
              androidLayerType='software'
              javaScriptEnabled
              injectedJavaScript={injectedJavaScript()}
              onMessage={onMessage}
            />
          </View>
          <View style={styles.body}>
            <Text bold size={15}>
              {message}
            </Text>
            <Text style={_.mt.md} size={11} type='sub'>
              因bilibili对鉴权信息做了保护加密，目前同步番剧需要通过在WebView内部发起带鉴权的请求，获得数据后通知APP。
            </Text>
            <Text style={_.mt.sm} size={11} type='sub'>
              完成同步前需要一直保持bilibil{i18n.login()}
              状态，完成后你可以手动登出账号。
            </Text>
            <Flex style={_.mt.md} justify='center'>
              <Btn
                style={styles.btn}
                btnStyle={styles.btnStyle}
                text='重新获取数据'
                size={13}
                onPress={onRefresh}
              />
              <Btn
                style={[styles.btn, _.ml.lg]}
                btnStyle={styles.btnStyle}
                text={`收起${i18n.login()}框`}
                size={13}
                onPress={onToggleHide}
              />
            </Flex>
          </View>
        </View>
      </>
    )
  })
}

export default Login
