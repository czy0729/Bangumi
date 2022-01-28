/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-29 03:16:32
 */
import React from 'react'
import { Page, ScrollView, Flex } from '@components'
import { IconTouchable, NavigationBarEvents } from '@screens/_'
import { _, systemStore } from '@stores'
import { withHeader, ob } from '@utils/decorators'
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
import Route from './route'
import Home from './home'
import Contact from './contact'
import System from './system'
import DangerZone from './danger-zone'

const title = '设置'

export default
@withHeader({
  screen: title,
  hm: ['settings', 'Setting']
})
@ob
class Setting extends React.Component {
  componentDidMount() {
    systemStore.fetchAdvance()
  }

  render() {
    const { navigation } = this.props
    return (
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
            <Tip>联系</Tip>
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
    )
  }
}

const styles = _.create({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.bottom
  },
  transparent: {
    opacity: 0
  }
})
