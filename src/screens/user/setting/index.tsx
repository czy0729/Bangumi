/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 00:17:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Input, Page, ScrollView } from '@components'
import { _ } from '@stores'
import Block from './component/block'
import Blocks from './component/blocks'
import CDN from './component/cdn'
import Contact from './component/contact'
import Custom from './component/custom'
import DangerZone from './component/danger-zone'
import Dev from './component/dev'
import Discovery from './component/discovery'
import Home from './component/home'
import Katakana from './component/katakana'
import Lasttime from './component/lasttime'
import Rakuen from './component/rakuen'
import Route from './component/route'
import Storage from './component/storage'
import Subject from './component/subject'
import System from './component/system'
import Theme from './component/theme'
import Timeline from './component/timeline'
import Timezone from './component/timezone'
import Tinygrail from './component/tinygrail'
import Tip from './component/tip'
import Worker from './component/worker'
import Track from './component/track'
import UI from './component/ui'
import User from './component/user'
import Version from './component/version'
import Zhinan from './component/zhinan'
import Header from './header'
import { useSettingPage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'
import type { Params } from './types'

/** 设置 */
function Setting(props: NavigationProps<Params>) {
  const { navigation, filter, setFilter, open, forwardRef, onBlockRef } = useSettingPage(props)

  return (
    <Component id='screen-setting'>
      <Page style={_.select(_.container.bg, _.container.plain)}>
        <HeaderPlaceholder />

        <ScrollView forwardRef={forwardRef} contentContainerStyle={styles.container}>
          <Block>
            <Input
              style={styles.input}
              placeholder='搜索'
              defaultValue={filter}
              onChangeText={setFilter}
            />
          </Block>

          <Block>
            <Version filter={filter} />
          </Block>

          <Block>
            <Tip>基本</Tip>
            <Theme filter={filter} />
            <UI filter={filter} />
            <Custom filter={filter} />
            <CDN navigation={navigation} filter={filter} />
            <Blocks navigation={navigation} filter={filter} />
            <Track navigation={navigation} filter={filter} open={open === 'Track'} />
            <Katakana navigation={navigation} filter={filter} />
          </Block>

          <Block title='module' onBlockRef={onBlockRef}>
            <Tip>模块</Tip>
            <Route filter={filter} />
            <Discovery filter={filter} open={open === 'Discovery'} />
            <Timeline filter={filter} />
            <Home filter={filter} />
            <Rakuen navigation={navigation} filter={filter} />
            <User filter={filter} open={open === 'User'} />
            <Tinygrail filter={filter} open={open === 'Tinygrail'} />
            <Subject filter={filter} open={open === 'Subject'} />
            {/* {userStore.isLogin && <UserSetting navigation={navigation} filter={filter} />} */}
          </Block>

          <Block>
            <Tip>相关</Tip>
            <Contact navigation={navigation} filter={filter} />
            <Zhinan navigation={navigation} filter={filter} />
          </Block>

          <Block>
            <Tip>系统</Tip>
            <Storage filter={filter} />
            <System filter={filter} />
            <Timezone filter={filter} />
            <Worker navigation={navigation} filter={filter} open={open === 'Worker'} />
            <DangerZone navigation={navigation} filter={filter} />
          </Block>

          <Lasttime />
          <Dev navigation={navigation} />
        </ScrollView>
      </Page>

      <Header navigation={navigation} />
    </Component>
  )
}

export default observer(Setting)
