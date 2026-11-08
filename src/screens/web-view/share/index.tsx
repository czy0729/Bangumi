/*
 * @Author: czy0729
 * @Date: 2021-07-09 23:30:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 条目拼图分享: WebView 生成分享图, 长按保存
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, HeaderV2 } from '@components'
import { IconTouchable, SafeAreaView } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { useWebViewSharePage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'

/** 条目分享 */
function ScreenWebViewShare(props: NavigationProps) {
  const { captured, dark, source, hm, onMessage, handleToggleTheme } = useWebViewSharePage(props)

  const handleHeaderRight = useCallback(
    () => (
      <IconTouchable
        style={_.mr.xs}
        name={dark ? 'moon' : 'sunny'}
        size={19}
        color={_.colorDesc}
        onPress={handleToggleTheme}
      />
    ),
    [dark, handleToggleTheme]
  )

  return (
    <Component id='screen-webview-share'>
      <SafeAreaView style={styles.screen}>
        <HeaderPlaceholder />
        <WebView key={String(dark)} originWhitelist={['*']} source={source} onMessage={onMessage} />
        {!captured && <View style={stl(styles.mask, dark ? styles.maskDark : styles.maskLight)} />}
      </SafeAreaView>
      <HeaderV2 title='长按保存图片' alias='条目分享' hm={hm} headerRight={handleHeaderRight} />
    </Component>
  )
}

export default observer(ScreenWebViewShare)
