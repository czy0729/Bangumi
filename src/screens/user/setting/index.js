/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 11:35:22
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
  MODEL_SETTING_QUALITY,
  MODEL_SETTING_FONTSIZEADJUST,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_INITIAL_PAGE,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  MODEL_SETTING_SYNC,
  MODEL_SETTING_USER_GRID_NUM
} from '@constants/model'
import Split from './split'
import Type from './type'
import Zhinan from './zhinan'
import User from './user'
import Rakuen from './rakuen'
import Theme from './theme'
import Custom from './custom'
import UI from './ui'
import CDN from './cdn'
import Tinygrail from './tinygrail'
import Katakana from './katakana'

const title = '设置'
const namespace = 'Setting'
const homeLayoutDS = MODEL_SETTING_HOME_LAYOUT.data.map(({ label }) => label)
const homeSortDS = MODEL_SETTING_HOME_SORTING.data.map(({ label }) => label)
const userGridNumDS = MODEL_SETTING_USER_GRID_NUM.data.map(({ label }) => label)
const qualityDS = MODEL_SETTING_QUALITY.data.map(({ label }) => label)
const fontSizeAdjustDS = MODEL_SETTING_FONTSIZEADJUST.data.map(({ label }) => label)
const avatarDS = ['圆形', '方形']
const transitionDS = MODEL_SETTING_TRANSITION.data.map(({ label }) => label)
const hitSlop = {
  top: 16,
  right: 32,
  bottom: 16,
  left: 32
}
const homeSortingInformation = {
  APP: 'APP：放送中未看 > 放送中 > 明天放送 > 本季未完结新番 > 网页',
  网页: '网页: 与bangumi网页版一致',
  放送: '放送: 放送中 > 明天放送 > 默认'
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

  renderUI() {
    const { ui } = this.state
    const {
      // iosMenu,
      avatarRound,
      ripple,
      imageTransition,
      quality,
      speech,
      transition,
      // flat,
      vibration,
      coverThings
    } = systemStore.setting
    return (
      <>
        {this.renderSection('UI')}
        {ui && (
          <>
            <ItemSetting
              show={!this.simple}
              hd='图片质量'
              ft={
                <SegmentedControl
                  style={this.styles.segmentedControl}
                  size={12}
                  values={qualityDS}
                  selectedIndex={MODEL_SETTING_QUALITY.data.findIndex(
                    item => item.value === quality
                  )}
                  onValueChange={this.setQuality}
                />
              }
              information='建议默认，修改后不能享受图片CDN加速'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '质量'
                }}
              />
            </ItemSetting>
          </>
        )}
      </>
    )
  }

  renderHome() {
    const { homeSorting, homeSortSink, homeLayout, homeFilter, homeOrigin, showGame } =
      systemStore.setting
    return (
      <>
        {this.renderSection('进度')}
        <ItemSetting
          hd='排序'
          ft={
            <SegmentedControl
              style={this.styles.segmentedControl}
              size={12}
              values={homeSortDS}
              selectedIndex={MODEL_SETTING_HOME_SORTING.data.findIndex(
                item => item.value === homeSorting
              )}
              onValueChange={this.setHomeSorting}
            />
          }
          information={
            homeSortingInformation[MODEL_SETTING_HOME_SORTING.getLabel(homeSorting)]
          }
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '首页排序'
            }}
          />
        </ItemSetting>
        <ItemSetting
          show={homeSorting !== MODEL_SETTING_HOME_SORTING.getValue('网页')}
          hd='条目自动下沉'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={homeSortSink}
              onSyncPress={() => {
                t('设置.切换', {
                  title: '自动下沉',
                  checked: !homeSortSink
                })

                systemStore.switchSetting('homeSortSink')
              }}
            />
          }
          information='当条目没有未观看的已放送章节时，自动下沉到底'
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '自动下沉'
            }}
          />
        </ItemSetting>
        <ItemSetting
          hd='布局'
          ft={
            <SegmentedControl
              style={this.styles.segmentedControl}
              size={12}
              values={homeLayoutDS}
              selectedIndex={MODEL_SETTING_HOME_LAYOUT.data.findIndex(
                item => item.value === homeLayout
              )}
              onValueChange={this.setHomeLayout}
            />
          }
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '首页布局'
            }}
          />
        </ItemSetting>
        <ItemSetting
          hd='列表搜索框'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={homeFilter}
              onSyncPress={() => {
                t('设置.切换', {
                  title: '显示列表搜索框',
                  checked: !homeFilter
                })

                systemStore.switchSetting('homeFilter')
              }}
            />
          }
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '显示列表搜索框'
            }}
          />
        </ItemSetting>
        <ItemSetting
          show={!this.simple && !userStore.isLimit}
          hd='搜索源头按钮'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={homeOrigin}
              onSyncPress={() => {
                t('设置.切换', {
                  title: '显示搜索源头按钮',
                  checked: !homeOrigin
                })

                systemStore.switchSetting('homeOrigin')
              }}
            />
          }
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '显示搜索源头按钮'
            }}
          />
        </ItemSetting>
        <ItemSetting
          show={!this.simple}
          hd='游戏标签页'
          ft={
            <SwitchPro
              style={this.styles.switch}
              value={showGame}
              onSyncPress={() => {
                t('设置.切换', {
                  title: '显示游戏',
                  checked: !showGame
                })

                systemStore.switchSetting('showGame')
              }}
            />
          }
          information='首页收藏显示在玩的游戏'
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '显示游戏'
            }}
          />
        </ItemSetting>
      </>
    )
  }

  renderMe() {
    const { userGridNum } = systemStore.setting
    return (
      <>
        {this.renderSection('时光机')}
        <ItemSetting
          hd='网格布局个数'
          ft={
            <SegmentedControl
              style={this.styles.segmentedControl}
              size={12}
              values={userGridNumDS}
              selectedIndex={MODEL_SETTING_USER_GRID_NUM.data.findIndex(
                item => item.value === userGridNum
              )}
              onValueChange={this.setUserGridNum}
            />
          }
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '网格布局个数'
            }}
          />
        </ItemSetting>
        <Split />
      </>
    )
  }

  renderContact() {
    const { navigation } = this.props
    const { contact } = this.state
    const { advance } = systemStore
    return (
      <>
        {this.renderSection('联系')}
        {contact && (
          <>
            <ItemSetting
              hd='反馈'
              arrow
              highlight
              information='欢迎提BUG提需求'
              onPress={() => {
                t('设置.跳转', {
                  to: 'Say'
                })

                navigation.push('Say', {
                  id: APP_ID_SAY_DEVELOP
                })
              }}
            >
              <Heatmap
                id='设置.跳转'
                data={{
                  to: 'Say',
                  alias: '吐槽'
                }}
              />
            </ItemSetting>
            <ItemSetting
              hd='项目帖子'
              arrow
              highlight
              onPress={() =>
                appNavigate(URL_FEEDBACK, navigation, undefined, {
                  id: '设置.跳转'
                })
              }
            >
              <Heatmap
                id='设置.跳转'
                data={{
                  to: 'Topic',
                  alias: '帖子'
                }}
              />
            </ItemSetting>
            <ItemSetting
              hd='Github'
              arrow
              highlight
              information='欢迎⭐️'
              onPress={() =>
                appNavigate(GITHUB_PROJECT, undefined, undefined, {
                  id: '设置.跳转'
                })
              }
            >
              <Heatmap
                id='设置.跳转'
                data={{
                  to: 'WebBrowser',
                  alias: '浏览器'
                }}
              />
            </ItemSetting>
            <ItemSetting
              hd={userStore.isLimit ? '关于' : '投食🍚'}
              arrow
              highlight
              information={advance && '已收到巨款，您已成为高级会员，感谢支持'}
              informationType='success'
              onPress={() => {
                t('设置.跳转', {
                  to: 'Qiafan'
                })

                navigation.push('Qiafan')
              }}
            >
              <Heatmap
                id='设置.跳转'
                data={{
                  to: 'Qiafan',
                  alias: '投食'
                }}
              />
            </ItemSetting>
          </>
        )}
      </>
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

  renderRoutes() {
    if (this.simple) return null

    const { initialPage } = systemStore.setting
    return (
      <>
        <Split />
        <ItemSetting
          show={!userStore.isLimit}
          hd='启动页'
          ft={
            <Popover
              data={MODEL_SETTING_INITIAL_PAGE.data.map(({ label }) => label)}
              hitSlop={hitSlop}
              onSelect={this.setInitialPage}
            >
              <Text type='sub' size={15}>
                {MODEL_SETTING_INITIAL_PAGE.getLabel(initialPage)}
              </Text>
            </Popover>
          }
          arrow
          highlight
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '启动页'
            }}
          />
        </ItemSetting>
        {this.renderTabs()}
      </>
    )
  }

  renderTabs() {
    const { homeRenderTabs } = systemStore.setting
    const showDiscovery = homeRenderTabs.includes('Discovery')
    const showTimeline = homeRenderTabs.includes('Timeline')
    const showRakuen = homeRenderTabs.includes('Rakuen')
    return (
      <View style={this.styles.blocks}>
        <Text type='title' size={16} bold>
          功能块
        </Text>
        <Text style={_.mt.sm} type='sub' size={12}>
          点击切换是否显示，切换后需要重新启动才能生效
        </Text>
        <Flex style={this.styles.tabs}>
          <Flex.Item>
            <Touchable onPress={() => this.setHomeRenderTabs('Discovery')}>
              <Flex style={this.styles.tab} justify='center' direction='column'>
                <View style={this.styles.icon}>
                  <Iconfont
                    name='home'
                    color={showDiscovery ? _.colorDesc : _.colorIcon}
                    size={18}
                  />
                </View>
                <Text type={showDiscovery ? undefined : 'icon'} size={11} bold>
                  发现
                </Text>
                {!showDiscovery && <View style={this.styles.disabledLine} />}
              </Flex>
            </Touchable>
          </Flex.Item>
          <Flex.Item>
            <Touchable onPress={() => this.setHomeRenderTabs('Timeline')}>
              <Flex style={this.styles.tab} justify='center' direction='column'>
                <View style={this.styles.icon}>
                  <Iconfont
                    name='md-access-time'
                    color={showTimeline ? _.colorDesc : _.colorIcon}
                    size={19}
                  />
                </View>
                <Text type={showTimeline ? undefined : 'icon'} size={11} bold>
                  时间胶囊
                </Text>
                {!showTimeline && <View style={this.styles.disabledLine} />}
              </Flex>
            </Touchable>
          </Flex.Item>
          <Flex.Item>
            <Touchable onPress={() => info('进度暂不允许关闭')}>
              <Flex style={this.styles.tab} justify='center' direction='column'>
                <View style={this.styles.icon}>
                  <Iconfont
                    style={this.styles.iconStar}
                    name='md-star-outline'
                    color={_.colorDesc}
                    size={21}
                  />
                </View>
                <Text size={11} bold>
                  进度
                </Text>
              </Flex>
            </Touchable>
          </Flex.Item>
          <Flex.Item>
            <Touchable onPress={() => this.setHomeRenderTabs('Rakuen')}>
              <Flex style={this.styles.tab} justify='center' direction='column'>
                <View style={this.styles.icon}>
                  <Iconfont
                    style={_.mt.xxs}
                    name='md-chat-bubble-outline'
                    color={showRakuen ? _.colorDesc : _.colorIcon}
                    size={17}
                  />
                </View>
                <Text type={showRakuen ? undefined : 'icon'} size={11} bold>
                  超展开
                </Text>
                {!showRakuen && <View style={this.styles.disabledLine} />}
              </Flex>
            </Touchable>
          </Flex.Item>
          <Flex.Item>
            <Touchable onPress={() => info('时光机暂不允许关闭')}>
              <Flex style={this.styles.tab} justify='center' direction='column'>
                <View style={this.styles.icon}>
                  <Iconfont name='md-person-outline' color={_.colorDesc} size={21} />
                </View>
                <Text size={11} bold>
                  时光机
                </Text>
              </Flex>
            </Touchable>
          </Flex.Item>
        </Flex>
      </View>
    )
  }

  render() {
    const { navigation } = this.props
    return (
      <>
        <ScrollView
          style={_.container.plain}
          contentContainerStyle={this.styles.container}
          scrollToTop
        >
          <NavigationBarEvents />
          <Zhinan navigation={navigation} />
          <User navigation={navigation} />
          <Rakuen navigation={navigation} />
          <Split />
          <Theme navigation={navigation} />
          <Custom navigation={navigation} />
          <UI navigation={navigation} />
          <CDN navigation={navigation} />
          <Katakana navigation={navigation} />
          <Tinygrail navigation={navigation} />
          <Split />
          {this.renderUI()}
          {this.renderRoutes()}
          <Split />
          {this.renderHome()}
          <Split />
          {this.renderMe()}
          {this.renderContact()}
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
