/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 07:09:42
 */
import React, { useState } from 'react'
import { Header, Page, ScrollView, Flex, Input, Text } from '@components'
import { IconTouchable, NavigationBarEvents } from '@_'
import { _, systemStore, userStore } from '@stores'
import { date } from '@utils'
import { useRunAfter, useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { NavigationProps } from '@types'
import Block from './block'
import Tip from './tip'
import Version from './version'
import Zhinan from './zhinan'
import User from './user'
import UserSetting from './user-setting'
import Rakuen from './rakuen'
import Subject from './subject'
import Discovery from './discovery'
import Timeline from './timeline'
import Theme from './theme'
import Custom from './custom'
import UI from './ui'
import CDN from './cdn'
import Tinygrail from './tinygrail'
import Katakana from './katakana'
// import Origin from './origin'
import Route from './route'
import Blocks from './blocks'
import Home from './home'
import Contact from './contact'
import Storage from './storage'
import System from './system'
import Timezone from './timezone'
import DangerZone from './danger-zone'
import { styles } from './styles'
import { DEVICE_MODEL_NAME } from '@constants'

const Setting = ({ navigation, route }: NavigationProps) => {
  const [filter, setFilter] = useState('')
  useRunAfter(() => {
    systemStore.fetchAdvance()
  })

  return useObserver(() => {
    const ts = String(userStore.userCookie.userAgent).match(/(\d{10})/g)
    const open = route?.params?.open || ''
    return (
      <>
        <Header title={i18n.setting()} alias='设置' hm={['settings', 'Setting']} />
        <Page style={_.select(_.container.bg, _.container.plain)}>
          <NavigationBarEvents />
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
      </>
    )
  })
}

export default Setting
