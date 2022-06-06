/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 18:53:53
 */
import React from 'react'
import { Header, Page, ScrollView, Flex } from '@components'
import { IconTouchable, NavigationBarEvents } from '@_'
import { _, systemStore } from '@stores'
import { useRunAfter, useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import Block from './block'
import Tip from './tip'
import Version from './version'
import Zhinan from './zhinan'
import User from './user'
import UserSetting from './user-setting'
import Rakuen from './rakuen'
import Subject from './subject'
import Theme from './theme'
import Custom from './custom'
import UI from './ui'
import CDN from './cdn'
import Tinygrail from './tinygrail'
import Katakana from './katakana'
import Origin from './origin'
import Route from './route'
import Home from './home'
import Contact from './contact'
import System from './system'
import DangerZone from './danger-zone'

const Setting = ({ navigation }) => {
  useRunAfter(() => {
    systemStore.fetchAdvance()
  })

  return useObserver(() => (
    <>
      <Header title={i18n.setting()} alias='设置' hm={['settings', 'Setting']} />
      <Page style={_.select(_.container.bg, _.container.plain)}>
        <NavigationBarEvents />
        <ScrollView contentContainerStyle={styles.container}>
          <Block>
            <Version navigation={navigation} />
          </Block>
          <Block>
            <Tip>基本</Tip>
            <Theme navigation={navigation} />
            <UI navigation={navigation} />
            <Custom navigation={navigation} />
            <CDN navigation={navigation} />
            <Route navigation={navigation} />
            <Katakana navigation={navigation} />
            <Origin navigation={navigation} />
          </Block>
          <Block>
            <Tip>模块</Tip>
            <Home navigation={navigation} />
            <Rakuen navigation={navigation} />
            <User navigation={navigation} />
            <UserSetting navigation={navigation} />
            <Subject navigation={navigation} />
            <Tinygrail navigation={navigation} />
          </Block>
          <Block>
            <Tip>{i18n.contact()}</Tip>
            <Contact navigation={navigation} />
            <Zhinan navigation={navigation} />
          </Block>
          <Block>
            <Tip>系统</Tip>
            <System navigation={navigation} />
            <DangerZone navigation={navigation} />
          </Block>
          <Flex style={_.mt.md} justify='center'>
            <IconTouchable
              style={styles.transparent}
              name='md-more-horiz'
              onPress={() => navigation.push('DEV')}
            />
          </Flex>
        </ScrollView>
      </Page>
    </>
  ))
}

export default Setting

const styles = _.create({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.md
  },
  transparent: {
    opacity: 0
  }
})
