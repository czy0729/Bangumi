/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 23:58:44
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page, ScrollView } from '@components'
import { _ } from '@stores'
import Base from './component/base'
import BigEmoji from './component/big-emoji'
import Blockeds from './component/blockeds'
import Likes from './component/likes'
import Media from './component/media'
import Slider from './component/slider'
import Topic from './component/topic'
import Header from './header'
import { useRakuenSettingPage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'

/** 超展开设置 */
function RakuenSetting({ navigation }: NavigationProps) {
  const { handleScroll } = useRakuenSettingPage()

  return (
    <Component id='screen-rakuen-setting'>
      <Page style={_.select(_.container.bg, _.container.plain)}>
        <HeaderPlaceholder />
        <ScrollView contentContainerStyle={styles.container} onScroll={handleScroll}>
          <Topic />
          <BigEmoji />
          <Likes />
          <Slider />
          <Media />
          <Base />
          <Blockeds navigation={navigation} />
        </ScrollView>
      </Page>
      <Header />
    </Component>
  )
}

export default observer(RakuenSetting)
