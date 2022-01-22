/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 21:23:12
 */
import React from 'react'
import { InteractionManager } from 'react-native'
import AsyncStorage from '@components/@/react-native-async-storage'
import { Page, ScrollView, Flex, Text, Heatmap } from '@components'
import { Popover, ItemSetting, IconTouchable, NavigationBarEvents } from '@screens/_'
import { _, userStore, systemStore, rakuenStore } from '@stores'
import { toFixed } from '@utils'
import { withHeader, ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { confirm, info, loading, feedback } from '@utils/ui'
import { MODEL_SETTING_SYNC } from '@constants/model'
import Block from './block'
import Tip from './tip'
import Version from './version'
import Zhinan from './zhinan'
import User from './user'
import UserSetting from './user-setting'
import Rakuen from './rakuen'
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
const hitSlop = {
  top: 16,
  right: 32,
  bottom: 16,
  left: 32
}

export default
@withHeader({
  screen: title,
  hm: ['settings', 'Setting']
})
@ob
class Setting extends React.Component {
  state = {
    storageSize: '',
    module: true,
    basic: true,
    ui: true,
    contact: true,
    system: true
  }

  async componentDidMount() {
    systemStore.fetchAdvance()
    InteractionManager.runAfterInteractions(async () => {
      this.caculateStorageSize()
    })
  }

  caculateStorageSize = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys()
      const storages = await AsyncStorage.multiGet(keys)
      let storageSize = 0
      storages.forEach(item => {
        storageSize += item[0].length + item[1].length
      })
      this.setState({
        storageSize: `${toFixed(storageSize / 1000 / 1000, 1)} MB`
      })
    } catch (error) {
      warn('Setting', 'caculateStorageSize', error)
    }
  }

  setSync = label => {
    if (label) {
      t('设置.恢复默认设置', {
        label
      })

      if (label === '恢复默认') {
        setTimeout(() => {
          confirm('确定恢复默认设置?', () => {
            systemStore.resetSetting()
            setTimeout(() => {
              info('已恢复')
            }, 160)
          })
        }, 160)
        return
      }

      if (label === '上传') {
        if (!this.isLogin || !userStore.userInfo.id) {
          info('上传需先登录')
          return
        }

        setTimeout(() => {
          confirm('确定上传当前设置到云端?', async () => {
            let hide = loading('上传设置(1/2)...')
            const flag = await systemStore.uploadSetting()
            hide()

            hide = loading('超展开设置(2/2)...')
            await rakuenStore.uploadSetting()
            hide()
            feedback()

            info(flag ? '已上传' : '上传失败，云服务异常，请待作者修复')
          })
        }, 160)
        return
      }

      if (label === '下载') {
        if (!this.isLogin || !userStore.userInfo.id) {
          info('下载需先登录')
          return
        }

        setTimeout(() => {
          confirm('确定恢复到云端的设置?', async () => {
            let hide = loading('下载设置(1/2)...')
            const flag = await systemStore.downloadSetting()
            hide()

            hide = loading('超展开设置(2/2)...')
            await rakuenStore.downloadSetting()
            hide()
            feedback()

            info(flag ? '已恢复' : '下载设置失败')
          })
        }, 160)
      }
    }
  }

  get isLogin() {
    return userStore.isLogin
  }

  get simple() {
    return systemStore.setting.simple
  }

  renderSystem() {
    const { system } = this.state
    return (
      <>
        {system && (
          <>
            <ItemSetting
              hd='同步设置'
              ft={
                <Popover
                  data={MODEL_SETTING_SYNC.data.map(({ label }) => label)}
                  hitSlop={hitSlop}
                  onSelect={this.setSync}
                >
                  <Text type='sub' size={15}>
                    选择
                  </Text>
                </Popover>
              }
              arrow
              highlight
            >
              <Heatmap id='设置.恢复默认设置' />
            </ItemSetting>
          </>
        )}
      </>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <Page style={_.select(_.container.bg, _.container.plain)}>
        <NavigationBarEvents />
        <ScrollView contentContainerStyle={this.styles.container}>
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
              style={this.styles.transparent}
              name='md-more-horiz'
              onPress={() => navigation.push('DEV')}
            />
          </Flex>
        </ScrollView>
      </Page>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  page: {
    paddingHorizontal: _.wind,
    backgroundColor: _.colorBorder
  },
  container: {
    paddingTop: _.sm,
    paddingBottom: _.bottom
  },
  transparent: {
    opacity: 0
  }
}))
