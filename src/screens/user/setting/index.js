/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 17:36:26
 */
import React from 'react'
import { InteractionManager, View } from 'react-native'
import AsyncStorage from '@components/@/react-native-async-storage'
import {
  ScrollView,
  Touchable,
  Flex,
  Text,
  Iconfont,
  SwitchPro,
  SegmentedControl,
  Heatmap
} from '@components'
import { Popover, ItemSetting, IconTouchable, NavigationBarEvents } from '@screens/_'
import Stores, { _, userStore, systemStore, rakuenStore } from '@stores'
import { toFixed, setStorage } from '@utils'
import { withHeader, ob } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { t } from '@utils/fetch'
import { confirm, info, loading, feedback } from '@utils/ui'
import {
  IOS,
  URL_FEEDBACK,
  GITHUB_PROJECT,
  GITHUB_RELEASE,
  VERSION_GITHUB_RELEASE,
  APP_ID_SAY_DEVELOP
} from '@constants'
import {
  MODEL_SETTING_FONTSIZEADJUST,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_SYNC,
  MODEL_SETTING_USER_GRID_NUM
} from '@constants/model'
import Tip from './tip'
import Split from './split'
import Type from './type'
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

const title = '设置'
const namespace = 'Setting'
const userGridNumDS = MODEL_SETTING_USER_GRID_NUM.data.map(({ label }) => label)
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
    this.setParams()
    systemStore.fetchAdvance()
    InteractionManager.runAfterInteractions(async () => {
      this.caculateStorageSize()
    })
  }

  setParams = () => {
    const { navigation } = this.props

    navigation.setParams({
      extra: <Type />
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

  clearStorage = () => {
    t('设置.清除缓存')

    Stores.clearStorage()
    setTimeout(() => {
      this.caculateStorageSize()
    }, 2400)
  }

  setQuality = label => {
    if (label) {
      t('设置.切换', {
        title: '质量',
        label
      })

      systemStore.setQuality(label)
    }
  }

  setFontSizeAdjust = label => {
    t('设置.切换', {
      title: '字号',
      label
    })

    _.changeFontSizeAdjust(MODEL_SETTING_FONTSIZEADJUST.getValue(label))
  }

  setTransition = label => {
    if (label) {
      t('设置.切换', {
        title: '切页动画',
        label
      })

      systemStore.setTransition(label)
    }
  }

  setInitialPage = label => {
    if (label) {
      t('设置.切换', {
        title: '启动页',
        label
      })

      systemStore.setInitialPage(label)
    }
  }

  setHomeLayout = label => {
    if (label) {
      t('设置.切换', {
        title: '首页布局',
        label
      })

      systemStore.setHomeLayout(label)
    }
  }

  setHomeSorting = label => {
    if (label) {
      t('设置.切换', {
        title: '首页排序',
        label
      })

      systemStore.setHomeSorting(label)
    }
  }

  setUserGridNum = label => {
    if (label) {
      t('设置.切换', {
        title: '网格布局个数',
        label
      })

      systemStore.setUserGridNum(label)
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

  setHomeRenderTabs = label => {
    if (label) {
      t('设置.切换', {
        title: '首页功能块',
        label
      })

      systemStore.setHomeRenderTabs(label)
    }
  }

  toggle = key => {
    const state = this.state[key]
    this.setState(
      {
        [key]: !state
      },
      () => setStorage(`${namespace}|state`, this.state)
    )
  }

  get userId() {
    return userStore.userInfo.id
  }

  get isLogin() {
    return userStore.isLogin
  }

  get simple() {
    return systemStore.setting.simple
  }

  renderSection(text) {
    return (
      <Flex style={this.styles.section}>
        <Flex.Item>
          <Text type='sub' bold>
            {text}
          </Text>
        </Flex.Item>
      </Flex>
    )
  }

  renderSystem() {
    const { navigation } = this.props
    const { storageSize, system } = this.state
    const { name } = systemStore.release
    const hasNewVersion = name !== VERSION_GITHUB_RELEASE
    return (
      <>
        {this.renderSection('系统')}
        {system && (
          <>
            <ItemSetting
              hd='版本'
              ft={
                hasNewVersion && !IOS ? (
                  <Text type='success' size={15}>
                    有新版本{name}
                    <Text type='sub' size={15}>
                      {' '}
                      / {VERSION_GITHUB_RELEASE}
                    </Text>
                  </Text>
                ) : (
                  <Text type='sub' size={15}>
                    {VERSION_GITHUB_RELEASE}
                  </Text>
                )
              }
              arrow={!IOS}
              onPress={
                IOS
                  ? undefined
                  : () =>
                      appNavigate(GITHUB_RELEASE, undefined, undefined, {
                        id: '设置.跳转'
                      })
              }
            />
            <ItemSetting
              hd='清除缓存'
              ft={
                <Text type='sub' size={15}>
                  {storageSize}
                </Text>
              }
              arrow
              highlight
              information='推荐大于10MB或遇到数据不刷新等情况进行清除'
              onPress={this.clearStorage}
            >
              <Heatmap id='设置.清除缓存' />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='网络探针'
              arrow
              highlight
              onPress={() => {
                t('设置.跳转', {
                  title: '网络探针',
                  to: 'ServerStatus'
                })

                navigation.push('ServerStatus')
              }}
            >
              <Heatmap
                id='设置.跳转'
                data={{
                  to: 'ServerStatus',
                  alias: '网络探针'
                }}
              />
            </ItemSetting>
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

  renderDangerZone() {
    const { navigation } = this.props
    return (
      <>
        <ItemSetting
          style={_.mt.md}
          hd={
            <Text type='danger' size={16} bold>
              退出登录
            </Text>
          }
          arrow
          highlight
          onPress={() => {
            t('设置.退出登录')

            Stores.logout(navigation)
          }}
        >
          <Heatmap id='设置.退出登录' />
        </ItemSetting>
        <Flex style={_.mt.md} justify='center'>
          <IconTouchable
            style={this.styles.transparent}
            name='md-more-horiz'
            onPress={() => navigation.push('DEV')}
          />
        </Flex>
      </>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <>
        <ScrollView
          style={_.container.plain}
          contentContainerStyle={this.styles.container}
        >
          <NavigationBarEvents />
          <Version navigation={navigation} />
          <Split />
          <Tip>基本</Tip>
          <Theme navigation={navigation} />
          <UI navigation={navigation} />
          <Custom navigation={navigation} />
          <CDN navigation={navigation} />
          <Route navigation={navigation} />
          <Katakana navigation={navigation} />
          <Split />
          <Tip>模块</Tip>
          <Home navigation={navigation} />
          <Rakuen navigation={navigation} />
          <User navigation={navigation} />
          <UserSetting navigation={navigation} />
          <Tinygrail navigation={navigation} />
          <Split />
          <Tip>联系</Tip>
          <Zhinan navigation={navigation} />
          <Contact navigation={navigation} />
          <Split />
          {this.renderSystem()}
          {this.renderDangerZone()}
        </ScrollView>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.bottom
  },
  section: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  },
  segmentedControl: {
    height: 28 * _.ratio,
    width: 164 * _.ratio
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  upload: {
    transform: [
      {
        rotate: '-90deg'
      }
    ]
  },
  transparent: {
    opacity: 0
  },
  blocks: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md - 2
  },
  tabs: {
    marginTop: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  tab: {
    paddingVertical: _.sm + 2,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  icon: {
    height: 24
  },
  iconStar: {
    marginTop: -1
  },
  disabledLine: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    bottom: 4,
    width: 5,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderLeftWidth: 2,
    borderRightWidth: 1,
    borderColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    transform: [
      {
        rotateZ: '45deg'
      }
    ]
  }
}))
