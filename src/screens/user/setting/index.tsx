/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:15:25
 */
import React, { useState } from 'react'
import { Component, Flex, Header, Input, Page, ScrollView, Text } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore, userStore } from '@stores'
import { date } from '@utils'
import { useObserver, useRunAfter } from '@utils/hooks'
import { DEVICE_MODEL_NAME } from '@constants'
import i18n from '@constants/i18n'
import { NavigationProps } from '@types'
import Block from './component/block'
import Blocks from './component/blocks'
import CDN from './component/cdn'
import Contact from './component/contact'
import Custom from './component/custom'
import DangerZone from './component/danger-zone'
import Discovery from './component/discovery'
import Home from './component/home'
import Katakana from './component/katakana'
import Rakuen from './component/rakuen'
// import Origin from './origin'
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
import { styles } from './styles'

const Setting = ({ navigation, route }: NavigationProps) => {
  const [filter, setFilter] = useState('')
  useRunAfter(() => {
    systemStore.fetchAdvance()
  })

  return useObserver(() => {
    const ts = String(userStore.userCookie.userAgent).match(/(\d{10})/g)
    const open = route?.params?.open || ''
    return (
      <Component id='screen-setting'>
        <Header title={i18n.setting()} alias='设置' hm={['settings', 'Setting']} />
        <Page style={_.select(_.container.bg, _.container.plain)}>
          <ScrollView contentContainerStyle={styles.container}>
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
              <Theme navigation={navigation} filter={filter} />
              <UI filter={filter} />
              <Custom filter={filter} />
              <CDN navigation={navigation} filter={filter} />
              <Route filter={filter} />
              <Blocks navigation={navigation} filter={filter} />
              <Katakana navigation={navigation} filter={filter} />
              {/* <Origin navigation={navigation} filter={filter} /> */}
            </Block>
            <Block>
              <Tip>模块</Tip>
              <Home filter={filter} />
              <Discovery filter={filter} open={open === 'Discovery'} />
              <Timeline filter={filter} />
              <Rakuen navigation={navigation} filter={filter} />
              <User filter={filter} />
              <UserSetting navigation={navigation} filter={filter} />
              <Subject filter={filter} />
              <Tinygrail filter={filter} />
            </Block>
            <Block>
              <Tip>相关</Tip>
              <Contact navigation={navigation} filter={filter} />
              <Zhinan navigation={navigation} filter={filter} />
            </Block>
            <Block>
              <Tip>系统</Tip>
              <Storage filter={filter} />
              <System navigation={navigation} filter={filter} />
              <Timezone filter={filter} />
              <DangerZone navigation={navigation} filter={filter} />
            </Block>
            {!!ts?.[0] && (
              <Text style={_.mt.xs} size={10} type='icon' bold align='center'>
                last logged on: {date('y-m-d H:i', ts[0])}, {DEVICE_MODEL_NAME}
              </Text>
            )}
            <Flex style={_.mt.lg} justify='center'>
              <IconTouchable
                style={styles.transparent}
                name='md-more-horiz'
                onPress={() => navigation.push('DEV')}
              />
            </Flex>
          </ScrollView>
        </Page>
      </Component>
    )
  })
}

export default Setting
