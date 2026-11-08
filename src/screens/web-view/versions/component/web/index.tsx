/*
 * @Author: czy0729
 * @Date: 2023-06-23 03:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 云文档 WebView: 加载完成后淡入, 注入去广告与暗色样式
 */
import { useCallback, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import WebView from 'react-native-webview'
import { Loading, Text } from '@components'
import { SafeAreaView } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useBoolean, useMount } from '@utils/hooks'
import { HTML_SINGLE_DOC } from '@constants'
import { injectedJavaScript } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TimerRef } from '@types'
import type { Props } from './types'

/** 云文档 WebView */
function Web({ uri }: Props) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const timerRef = useRef<TimerRef>(null)
  const styles = memoStyles()
  const html = HTML_SINGLE_DOC(uri)

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // 切换文档时重置加载态, 并丢弃上一篇文档挂起的淡入定时器
  useEffect(() => {
    clearTimer()
    setFalse()
  }, [clearTimer, setFalse, uri])

  const handleLoadEnd = useCallback(() => {
    clearTimer()

    timerRef.current = setTimeout(() => {
      timerRef.current = null
      setTrue()
    }, 1000)
  }, [clearTimer, setTrue])

  useMount(() => clearTimer)

  return (
    <SafeAreaView style={styles.webview}>
      {!state && (
        <Loading style={styles.loading}>
          <Text style={stl(styles.text, _.mt.md)} type='sub' size={13} align='center'>
            正在加载网页...
          </Text>
          <Text style={styles.text} type='sub' size={11} align='center'>
            {html}
          </Text>
        </Loading>
      )}
      <WebView
        style={stl(styles.webview, !state && styles.hidden)}
        originWhitelist={['*']}
        source={{ uri: html }}
        injectedJavaScript={injectedJavaScript()}
        bounces={false}
        onLoadEnd={handleLoadEnd}
      />
    </SafeAreaView>
  )
}

export default observer(Web)
