/*
 * @Author: czy0729
 * @Date: 2022-03-22 16:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-13 00:03:25
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page, ScrollView, Text } from '@components'
import { Notice } from '@_'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Cloud from './component/cloud'
import List from './component/list'
import Header from './header'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

/** 自定义源头 */
const OriginSetting = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-origin-setting'>
        <Header />
        <Page loaded={$.state._loaded}>
          <ScrollView>
            <Notice style={styles.hd}>客户端内仅提供辅助跳转，均不提供直接播放等功能</Notice>
            <View style={styles.scrollView}>
              <Cloud
                isLogin={$.isLogin}
                active={$.state.active}
                onToggle={$.onToggle}
                onDownloaded={$.init}
              />
              <List />
            </View>
            <Text style={styles.ft} type='sub' size={10} align='center'>
              - 预设数据均来源自互联网 -
            </Text>
          </ScrollView>
        </Page>
      </Component>
    )
  })
}

export default ic(Store, OriginSetting)
