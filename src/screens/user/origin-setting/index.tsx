/*
 * @Author: czy0729
 * @Date: 2022-03-22 16:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:51:54
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page, ScrollView, Text } from '@components'
import { Notice } from '@_'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Cloud from './component/cloud'
import List from './component/list'
import Header from './header'
import { useOriginSettingPage } from './hooks'
import { memoStyles } from './styles'

/** 自定义源头 */
const OriginSetting = (props: NavigationProps) => {
  const { id, $ } = useOriginSettingPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-origin-setting'>
        <StoreContext.Provider value={id}>
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
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default OriginSetting
