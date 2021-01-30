/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:24:37
 */
import React from 'react'
import { InteractionManager, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {
  ScrollView,
  Flex,
  Text,
  SwitchPro,
  SegmentedControl,
  Heatmap
} from '@components'
import {
  Popover,
  ItemSetting,
  IconTouchable,
  NavigationBarEvents
} from '@screens/_'
import Stores, { _, userStore, systemStore } from '@stores'
import { toFixed, setStorage } from '@utils'
import { withHeader, ob } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { t } from '@utils/fetch'
import { confirm, info } from '@utils/ui'
import {
  IOS,
  IS_BEFORE_ANDROID_10,
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
  MODEL_SETTING_SYNC
} from '@constants/model'
import Type from './type'

const title = '设置'
const namespace = 'Setting'
const tinygrailModeDS = ['绿涨红跌', '红涨绿跌']
const homeLayoutDS = MODEL_SETTING_HOME_LAYOUT.data.map(({ label }) => label)
const homeSortDS = MODEL_SETTING_HOME_SORTING.data.map(({ label }) => label)
const qualityDS = MODEL_SETTING_QUALITY.data.map(({ label }) => label)
const fontSizeAdjustDS = MODEL_SETTING_FONTSIZEADJUST.data.map(
  ({ label }) => label
)
const avatarDS = ['圆形', '方形']
const transitionDS = MODEL_SETTING_TRANSITION.data.map(({ label }) => label)

export default
@withHeader({
  screen: title,
  hm: ['settings', 'Setting']
})
@ob
class Setting extends React.Component {
  static navigationOptions = {
    title
  }

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
          info('上传需先登陆')
          return
        }

        setTimeout(() => {
          confirm('确定上传当前设置到云端?', async () => {
            const flag = await systemStore.uploadSetting()
            info(flag ? '已上传' : '上传失败')
          })
        }, 160)
        return
      }

      if (label === '下载') {
        if (!this.isLogin || !userStore.userInfo.id) {
          info('下载需先登陆')
          return
        }

        setTimeout(() => {
          confirm('确定恢复到云端的设置?', async () => {
            const flag = await systemStore.downloadSetting()
            info(flag ? '已恢复' : '下载设置失败')
          })
        }, 160)
      }
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
          <Text size={16} type='sub'>
            {text}
          </Text>
        </Flex.Item>
      </Flex>
    )
  }

  renderUser() {
    const { navigation } = this.props
    return (
      <ItemSetting
        style={_.mt.sm}
        hd='个人设置'
        arrow
        highlight
        information='时光机点击头像也能前往'
        onPress={() => {
          t('设置.跳转', {
            title: '个人设置',
            to: 'UserSetting'
          })

          navigation.push('UserSetting')
        }}
      >
        <Heatmap
          id='设置.跳转'
          data={{
            to: 'UserSetting',
            alias: '个人设置'
          }}
        />
      </ItemSetting>
    )
  }

  renderModule() {
    const { module: _module } = this.state
    const { cdn, tinygrail, katakana, autoColorScheme } = systemStore.setting
    return (
      <>
        {this.renderSection('特色', 'module')}
        {_module && (
          <>
            <ItemSetting
              hd='黑暗模式'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={_.isDark}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '黑暗模式',
                      checked: !_.isDark
                    })

                    _.toggleMode()
                    setTimeout(() => {
                      this.setParams()
                    }, 0)
                  }}
                />
              }
              information='点击顶部Logo可快速切换，长按则前往设置'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '黑暗模式'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!IS_BEFORE_ANDROID_10}
              hd='跟随系统'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={autoColorScheme}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '跟随系统',
                      checked: !autoColorScheme
                    })

                    systemStore.switchSetting('autoColorScheme')
                  }}
                />
              }
              information='启动时黑暗模式是否跟随系统'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '跟随系统'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='CDN加速'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={cdn}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: 'CDN加速',
                      checked: !cdn
                    })

                    systemStore.switchSetting('cdn')
                  }}
                />
              }
              information='建议开启，针对静态数据使用CDN快照加速渲染'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: 'CDN加速'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!userStore.isLimit}
              hd='小圣杯'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={tinygrail}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '小圣杯',
                      checked: !tinygrail
                    })
                    systemStore.switchSetting('tinygrail')
                  }}
                />
              }
              information='人物卡片交易系统'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '小圣杯'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!userStore.isLimit && tinygrail}
              hd='涨跌色'
              ft={
                <SegmentedControl
                  style={this.styles.segmentedControl}
                  size={12}
                  values={tinygrailModeDS}
                  selectedIndex={_.isWeb ? 2 : _.isGreen ? 0 : 1}
                  onValueChange={value => {
                    if (
                      (_.isGreen && value === tinygrailModeDS[0]) ||
                      (!_.isGreen && value === tinygrailModeDS[1]) ||
                      (_.isWeb && value === tinygrailModeDS[2])
                    ) {
                      return
                    }

                    t('设置.切换', {
                      title: '小圣杯涨跌色',
                      label: _.isWeb
                        ? '网页一致'
                        : _.isGreen
                        ? '红涨绿跌'
                        : '绿涨红跌'
                    })

                    if (value === tinygrailModeDS[2]) {
                      _.toggleTinygrailMode('web')
                      return
                    }
                    _.toggleTinygrailMode()
                  }}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '小圣杯涨跌色'
                }}
              />
            </ItemSetting>
            <ItemSetting
              hd='片假名终结者'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={katakana}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '片假名终结者',
                      checked: !katakana
                    })

                    systemStore.switchSetting('katakana')
                  }}
                />
              }
              information='[实验性] 在日语外来语上方标注英文原词，开启后资源消耗增大，非必要请勿开启'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '片假名终结者'
                }}
              />
            </ItemSetting>
          </>
        )}
      </>
    )
  }

  renderBasic() {
    const { basic } = this.state
    const {
      heatMap,
      filterDefault,
      hideScore,
      cnFirst,
      initialPage,
      filter18x
    } = systemStore.setting
    return (
      <>
        {this.renderSection('定制', 'basic')}
        {basic && (
          <>
            <ItemSetting
              hd='隐藏评分'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={hideScore}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '隐藏评分',
                      checked: !hideScore
                    })

                    systemStore.switchSetting('hideScore')
                  }}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '隐藏评分'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='优先中文'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={cnFirst}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '优先中文',
                      checked: !cnFirst
                    })

                    systemStore.switchSetting('cnFirst')
                  }}
                />
              }
              information='条目名称会自动匹配中文名'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '优先中文'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='章节讨论热力图'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={heatMap}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '章节讨论热力图',
                      checked: !heatMap
                    })

                    systemStore.switchSetting('heatMap')
                  }}
                />
              }
              information='章节按钮下方不同透明度的橙色条块, 可快速了解讨论激烈程度'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '章节讨论热力图'
                }}
              />
            </ItemSetting>
            <ItemSetting
              hd='屏蔽默认头像用户相关信息'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={filterDefault}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '屏蔽默认头像用户相关信息',
                      checked: !filterDefault
                    })

                    systemStore.switchSetting('filterDefault')
                  }}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '屏蔽默认头像用户相关信息'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='屏蔽敏感内容'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={filter18x}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '屏蔽敏感内容',
                      checked: !filter18x
                    })

                    systemStore.switchSetting('filter18x')
                  }}
                />
              }
              information='条目、小组、时间胶囊等，因网站规则建议注册少于3个月的用户开启'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '屏蔽敏感内容'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple && !userStore.isLimit}
              hd='启动页'
              ft={
                <Popover
                  data={MODEL_SETTING_INITIAL_PAGE.data.map(
                    ({ label }) => label
                  )}
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
          </>
        )}
      </>
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
      flat,
      vibration,
      coverThings
    } = systemStore.setting
    return (
      <>
        {this.renderSection('UI', 'ui')}
        {ui && (
          <>
            <ItemSetting
              show={!this.simple}
              hd='扁平'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={flat}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '扁平',
                      checked: !flat
                    })

                    systemStore.switchSetting('flat')
                  }}
                />
              }
              information='开启后尽量少出现线条，并适当增大元素间距'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '扁平'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='震动'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={vibration}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '震动',
                      checked: !vibration
                    })

                    systemStore.switchSetting('vibration')
                  }}
                />
              }
              information='操作请求后轻震动反馈'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '震动'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='封面拟物'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={coverThings}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '封面拟物',
                      checked: !coverThings
                    })

                    systemStore.switchSetting('coverThings')
                  }}
                />
              }
              information='能确定类型的条目封面拟物化，增加区分度'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '封面拟物'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='图片渐出动画'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={imageTransition}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '图片渐出动画',
                      checked: !imageTransition
                    })

                    systemStore.switchSetting('imageTransition')
                  }}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '图片渐出动画'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!IOS}
              hd='点击水纹效果'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={ripple}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '点击水纹',
                      checked: !ripple
                    })

                    systemStore.switchSetting('ripple')
                  }}
                />
              }
              information='按钮被按下时产生涟漪效果，关闭可提升性能'
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '点击水纹'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple}
              hd='看板娘吐槽'
              ft={
                <SwitchPro
                  style={this.styles.switch}
                  value={speech}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '看板娘吐槽',
                      checked: !speech
                    })

                    systemStore.switchSetting('speech')
                  }}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '看板娘吐槽'
                }}
              />
            </ItemSetting>
            <ItemSetting
              hd='头像'
              ft={
                <SegmentedControl
                  style={this.styles.segmentedControl}
                  size={12}
                  values={avatarDS}
                  selectedIndex={avatarRound ? 0 : 1}
                  onValueChange={value => {
                    if (
                      (avatarRound && value === avatarDS[0]) ||
                      (!avatarRound && value === avatarDS[1])
                    ) {
                      return
                    }

                    t('设置.切换', {
                      title: '圆形头像',
                      checked: !avatarRound
                    })

                    systemStore.switchSetting('avatarRound')
                  }}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '圆形头像'
                }}
              />
            </ItemSetting>
            <ItemSetting
              hd='字号'
              ft={
                <SegmentedControl
                  style={this.styles.segmentedControl}
                  size={12}
                  values={fontSizeAdjustDS}
                  selectedIndex={MODEL_SETTING_FONTSIZEADJUST.data.findIndex(
                    item => item.value == _.fontSizeAdjust
                  )}
                  onValueChange={this.setFontSizeAdjust}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '字号'
                }}
              />
            </ItemSetting>
            <ItemSetting
              show={!this.simple && !IOS}
              hd='切页动画'
              ft={
                <SegmentedControl
                  style={this.styles.segmentedControl}
                  size={12}
                  values={transitionDS}
                  selectedIndex={MODEL_SETTING_TRANSITION.data.findIndex(
                    item => item.value === transition
                  )}
                  onValueChange={this.setTransition}
                />
              }
            >
              <Heatmap
                id='设置.切换'
                data={{
                  title: '切页动画'
                }}
              />
            </ItemSetting>
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
    const {
      homeSorting,
      homeLayout,
      homeOrigin,
      showGame
    } = systemStore.setting
    return (
      <>
        {this.renderSection('首页收藏')}
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
          information='APP排序优先：放送中未看 > 放送中 > 明天放送 > 本季未完结新番 > 网页'
        >
          <Heatmap
            id='设置.切换'
            data={{
              title: '首页排序'
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
          hd='显示搜索源头按钮'
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
              title: '显示游戏'
            }}
          />
        </ItemSetting>
        <ItemSetting
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

  renderRakuen() {
    const { navigation } = this.props
    return (
      <ItemSetting
        hd='超展开设置'
        arrow
        highlight
        onPress={() => {
          t('设置.跳转', {
            title: '超展开',
            to: 'RakuenSetting'
          })

          navigation.push('RakuenSetting')
        }}
      >
        <Heatmap
          id='设置.跳转'
          data={{
            to: 'RakuenSetting',
            alias: '超展开设置'
          }}
        />
      </ItemSetting>
    )
  }

  renderContact() {
    const { navigation } = this.props
    const { contact } = this.state
    const { advance } = systemStore
    return (
      <>
        {this.renderSection('联系', 'contact')}
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
              show={!userStore.isLimit}
              hd='投食🍚'
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
        {this.renderSection('系统', 'system')}
        {system && (
          <>
            <ItemSetting
              hd='版本'
              ft={
                hasNewVersion && !IOS ? (
                  <Text type='success'>
                    有新版本{name}
                    <Text type='sub' size={15}>
                      {' '}
                      / {VERSION_GITHUB_RELEASE}
                    </Text>
                  </Text>
                ) : (
                  `${VERSION_GITHUB_RELEASE}`
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
              onPress={this.clearStorage}
            >
              <Heatmap id='设置.清除缓存' />
            </ItemSetting>
            <ItemSetting
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
              退出登陆
            </Text>
          }
          arrow
          highlight
          onPress={() => {
            t('设置.退出登陆')

            Stores.logout(navigation)
          }}
        >
          <Heatmap id='设置.退出登陆' />
        </ItemSetting>
        <Flex style={_.mt.md} justify='center'>
          <IconTouchable
            style={{
              opacity: 0
            }}
            name='more'
            onPress={() => navigation.push('DEV')}
          />
        </Flex>
      </>
    )
  }

  render() {
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        scrollToTop
      >
        <NavigationBarEvents />
        {this.renderUser()}
        {this.renderRakuen()}
        <View style={this.styles.split} />
        {this.renderModule()}
        <View style={this.styles.split} />
        {this.renderBasic()}
        <View style={this.styles.split} />
        {this.renderUI()}
        <View style={this.styles.split} />
        {this.renderHome()}
        <View style={this.styles.split} />
        {this.renderContact()}
        <View style={this.styles.split} />
        {this.renderSystem()}
        {this.renderDangerZone()}
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  section: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm
  },
  split: {
    marginTop: _.md,
    marginHorizontal: _.wind,
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  segmentedControl: {
    height: 28,
    width: 164
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: 0.8
      }
    ]
  },
  upload: {
    transform: [
      {
        rotate: '-90deg'
      }
    ]
  }
}))
