/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-18 11:52:16
 */
import React from 'react'
import { Component, HeaderV2, Input, Page, ScrollView } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { NavigationProps } from '@types'
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
import UI from './component/ui'
import User from './component/user'
import UserSetting from './component/user-setting'
import Version from './component/version'
import Zhinan from './component/zhinan'
import { useSettingPage } from './hooks'
import { HM } from './ds'
import { styles } from './styles'

/** 设置 */
const Setting = (props: NavigationProps) => {
  const { filter, setFilter, open, forwardRef, onBlockRef } = useSettingPage(props)

  const { navigation } = props
  return useObserver(() => (
    <Component id='screen-setting'>
      <Page style={_.select(_.container.bg, _.container.plain)}>
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
            <Route filter={filter} />
            <Blocks navigation={navigation} filter={filter} />
            <Katakana navigation={navigation} filter={filter} />
            {/* <Origin navigation={navigation} filter={filter} /> */}
          </Block>
          <Block title='module' onBlockRef={onBlockRef}>
            <Tip>模块</Tip>
            <Home filter={filter} />
            <Discovery filter={filter} open={open === 'Discovery'} />
            <Timeline filter={filter} />
            <Rakuen navigation={navigation} filter={filter} />
            <User filter={filter} />
            <UserSetting navigation={navigation} filter={filter} />
            <Subject filter={filter} open={open === 'Subject'} />
            <Tinygrail filter={filter} open={open === 'Tinygrail'} />
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
            <DangerZone navigation={navigation} filter={filter} />
          </Block>
          <Lasttime />
          <Dev navigation={navigation} />
        </ScrollView>
      </Page>
      <HeaderV2 title={i18n.setting()} alias='设置' hm={HM} />
    </Component>
  ))
}

export default Setting
