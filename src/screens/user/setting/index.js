/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-07 20:06:53
 */
import React from 'react'
import { ScrollView, View, AsyncStorage } from 'react-native'
import { Flex, Text, SwitchPro, SegmentedControl } from '@components'
import {
  Popover,
  ItemSetting,
  IconTouchable,
  NavigationBarEvents
} from '@screens/_'
import Stores, { _, userStore, systemStore } from '@stores'
import { toFixed, setStorage } from '@utils'
import { withHeader, observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { t } from '@utils/fetch'
import { confirm, info } from '@utils/ui'
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
  MODEL_SETTING_HOME_SORTING
} from '@constants/model'

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
@observer
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
    // const state = await getStorage(`${namespace}|state`)
    // this.setState(
    //   {
    //     ...state
    //   },
    //   () => {
    //     this.caculateStorageSize()
    //     this.setParams()
    //   }
    // )
    this.caculateStorageSize()
    this.setParams()
  }

  setParams = () => {
    const { navigation } = this.props
    navigation.setParams({
      extra: (
        <IconTouchable
          style={{
            opacity: 0
          }}
          name='more'
          onPress={() => navigation.push('DEV')}
        />
      )
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
        storageSize: `${toFixed(storageSize / 1000, 1)} KB`
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

  renderModule() {
    const { module: _module } = this.state
    const { cdn, tinygrail, katakana } = systemStore.setting
    return (
      <>
        {this.renderSection('特色', 'module')}
        {_module && (
          <>
            <ItemSetting
              hd='黑暗模式'
              ft={
                <SwitchPro
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
            />
            <ItemSetting
              hd='CDN加速'
              ft={
                <SwitchPro
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
              information='建议开启，针对静态数据使用CDN访问快照加速渲染，但数据可能不会及时同步，流量稍微变高'
            />
            {!userStore.isLimit && (
              <ItemSetting
                hd='小圣杯'
                ft={
                  <SwitchPro
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
              />
            )}
            {!userStore.isLimit && tinygrail && (
              <ItemSetting
                hd='涨跌色'
                ft={
                  <SegmentedControl
                    values={tinygrailModeDS}
                    selectedIndex={_.isGreen ? 0 : 1}
                    onValueChange={value => {
                      if (
                        (_.isGreen && value === tinygrailModeDS[0]) ||
                        (!_.isGreen && value === tinygrailModeDS[1])
                      ) {
                        return
                      }

                      t('设置.切换', {
                        title: '小圣杯涨跌色',
                        label: !_.isGreen ? '绿涨红跌' : '红涨绿跌'
                      })

                      _.toggleTinygrailMode()
                    }}
                  />
                }
              />
            )}
            <ItemSetting
              hd='片假名终结者'
              ft={
                <SwitchPro
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
            />
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
            />
            <ItemSetting
              hd='优先中文'
              ft={
                <SwitchPro
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
            />
            <ItemSetting
              hd='章节讨论热力图'
              ft={
                <SwitchPro
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
            />
            <ItemSetting
              hd='屏蔽默认头像用户相关信息'
              ft={
                <SwitchPro
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
            />
            <ItemSetting
              hd='屏蔽敏感内容'
              ft={
                <SwitchPro
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
              information='条目、小组、时间胶囊等，因网站规则也建议注册少于2个月的用户开启'
            />
            {!userStore.isLimit && (
              <ItemSetting
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
              />
            )}
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
      flat
    } = systemStore.setting
    return (
      <>
        {this.renderSection('UI', 'ui')}
        {ui && (
          <>
            {/* {!IOS && (
              <ItemSetting
                hd='iOS风格菜单'
                ft={
                  <SwitchPro
                    value={iosMenu}
                    onSyncPress={() => {
                      t('设置.切换', {
                        title: 'iOS风格菜单',
                        checked: !iosMenu
                      })

                      systemStore.switchSetting('iosMenu')
                    }}
                  />
                }
                information='模拟菜单, 非原生性能略弱, 但显示信息更多并且支持黑暗模式'
              />
            )} */}
            <ItemSetting
              hd='扁平'
              ft={
                <SwitchPro
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
              information='[实验性] 开启后尽量少出现线条，适当增大元素间距'
            />
            <ItemSetting
              hd='图片渐出动画'
              ft={
                <SwitchPro
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
            />
            {!IOS && (
              <ItemSetting
                hd='点击水纹效果'
                ft={
                  <SwitchPro
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
              />
            )}

            <ItemSetting
              hd='看板娘吐槽'
              ft={
                <SwitchPro
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
            />
            <ItemSetting
              hd='头像'
              ft={
                <SegmentedControl
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
            />
            <ItemSetting
              hd='字号'
              ft={
                <SegmentedControl
                  values={fontSizeAdjustDS}
                  selectedIndex={MODEL_SETTING_FONTSIZEADJUST.data.findIndex(
                    item => item.value == _.fontSizeAdjust
                  )}
                  onValueChange={this.setFontSizeAdjust}
                />
              }
            />
            {!IOS && (
              <ItemSetting
                hd='切页动画'
                ft={
                  <SegmentedControl
                    values={transitionDS}
                    selectedIndex={MODEL_SETTING_TRANSITION.data.findIndex(
                      item => item.value === transition
                    )}
                    onValueChange={this.setTransition}
                  />
                }
              />
            )}
            <ItemSetting
              hd='图片质量'
              ft={
                <SegmentedControl
                  values={qualityDS}
                  selectedIndex={MODEL_SETTING_QUALITY.data.findIndex(
                    item => item.value === quality
                  )}
                  onValueChange={this.setQuality}
                />
              }
              information='建议默认，修改后不能享受图片CDN加速'
            />
          </>
        )}
      </>
    )
  }

  renderHome() {
    const {
      homeSorting,
      homeLayout
      // itemShadow
    } = systemStore.setting
    return (
      <>
        {this.renderSection('首页')}
        <ItemSetting
          hd='排序'
          ft={
            <SegmentedControl
              values={homeSortDS}
              selectedIndex={MODEL_SETTING_HOME_SORTING.data.findIndex(
                item => item.value === homeSorting
              )}
              onValueChange={this.setHomeSorting}
            />
          }
          information='APP排序优先：放送中未看 > 放送中 > 明天放送 > 本季未完结新番 > 网页'
        />
        <ItemSetting
          hd='布局'
          ft={
            <SegmentedControl
              values={homeLayoutDS}
              selectedIndex={MODEL_SETTING_HOME_LAYOUT.data.findIndex(
                item => item.value === homeLayout
              )}
              onValueChange={this.setHomeLayout}
            />
          }
        />
        {/* {!IOS && MODEL_SETTING_HOME_LAYOUT.getLabel(homeLayout) === '列表' && (
          <ItemSetting
            hd='首页阴影'
            ft={
              <SwitchPro
                value={itemShadow}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '首页阴影',
                    checked: !itemShadow
                  })

                  systemStore.switchSetting('itemShadow')
                }}
              />
            }
          />
        )} */}
      </>
    )
  }

  renderRakuen() {
    const { navigation } = this.props
    return (
      <>
        {this.renderSection('超展开')}
        <ItemSetting
          hd='更多设置'
          arrow
          highlight
          onPress={() => {
            t('设置.跳转', {
              title: '超展开',
              to: 'RakuenSetting'
            })

            navigation.push('RakuenSetting')
          }}
        />
      </>
    )
  }

  renderContact() {
    const { navigation } = this.props
    const { contact } = this.state
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
            />
            <ItemSetting
              hd='项目帖子'
              arrow
              highlight
              onPress={() =>
                appNavigate(URL_FEEDBACK, navigation, undefined, {
                  id: '设置.跳转'
                })
              }
            />
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
            />
            {!userStore.isLimit && (
              <ItemSetting
                hd='投食🍚'
                arrow
                highlight
                onPress={() => {
                  t('设置.跳转', {
                    to: 'Qiafan'
                  })

                  navigation.push('Qiafan')
                }}
              />
            )}
          </>
        )}
      </>
    )
  }

  renderSystem() {
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
            />
            <ItemSetting
              hd='恢复默认设置'
              arrow
              highlight
              onPress={() => {
                confirm('确定恢复默认设置?', () => {
                  t('设置.恢复默认设置')

                  systemStore.resetSetting()
                  setTimeout(() => {
                    info('已恢复')
                  }, 160)
                })
              }}
            />
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
        />
      </>
    )
  }

  render() {
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
      >
        <NavigationBarEvents />
        {this.renderModule()}
        <View style={this.styles.split} />
        {this.renderBasic()}
        <View style={this.styles.split} />
        {this.renderUI()}
        <View style={this.styles.split} />
        {this.renderHome()}
        <View style={this.styles.split} />
        {this.renderRakuen()}
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
    paddingTop: _.lg,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  split: {
    marginTop: _.md,
    marginHorizontal: _.wind,
    borderTopWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
