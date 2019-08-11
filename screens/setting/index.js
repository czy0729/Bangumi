/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 13:20:45
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Switch } from '@ant-design/react-native'
import { Text } from '@components'
import { StatusBar, Popover, ItemSetting } from '@screens/_'
import Stores, { systemStore } from '@stores'
import { withHeader, observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { appNavigate } from '@utils/app'
import { hm } from '@utils/fetch'
import {
  FEEDBACK_URL,
  GITHUB_URL,
  GITHUB_RELEASE_URL,
  GITHUB_RELEASE_VERSION,
  CODE_PUSH_VERSION
} from '@constants'
import { MODEL_SETTING_QUALITY } from '@constants/model'
import _ from '@styles'

const title = '设置'

export default
@withHeader()
@observer
class Setting extends React.Component {
  static navigationOptions = {
    title
  }

  state = {
    showDev: false
  }

  componentDidMount() {
    hm('settings', title)
  }

  setQuality = label => {
    if (label) {
      systemStore.setQuality(label)
    }
  }

  toggleDev = () => {
    const { showDev } = this.state
    this.setState({
      showDev: !showDev
    })
    info(`调式模式 ${!showDev ? '开' : '关'}`)
    systemStore.toggleDev()
  }

  render() {
    const { navigation } = this.props
    const { showDev } = this.state
    const { quality, cnFirst, autoFetch, speech } = systemStore.setting
    const { name } = systemStore.release
    const hasNewVersion = name !== GITHUB_RELEASE_VERSION
    let version = GITHUB_RELEASE_VERSION
    if (CODE_PUSH_VERSION) {
      version += `-${CODE_PUSH_VERSION}`
    }
    return (
      <>
        <StatusBar />
        <ScrollView
          style={_.container.screen}
          contentContainerStyle={_.container.flex}
        >
          <ItemSetting
            style={_.mt.md}
            hd='图片质量'
            ft={
              <Popover
                data={MODEL_SETTING_QUALITY.data.map(({ label }) => label)}
                onSelect={this.setQuality}
              >
                <Text size={16} type='sub'>
                  {MODEL_SETTING_QUALITY.getLabel(quality)}
                </Text>
              </Popover>
            }
            arrow
            highlight
          />
          <ItemSetting
            border
            hd='优先使用中文'
            ft={
              <Switch checked={cnFirst} onChange={systemStore.switchCnFirst} />
            }
            withoutFeedback
          />
          <ItemSetting
            border
            hd='Bangumi娘话语'
            ft={<Switch checked={speech} onChange={systemStore.switchSpeech} />}
            withoutFeedback
          />
          <ItemSetting
            border
            hd='优化请求量(部分页面需手动刷新)'
            ft={
              <Switch
                checked={!autoFetch}
                onChange={systemStore.switchAutoFetch}
              />
            }
            withoutFeedback
          />

          <ItemSetting
            style={_.mt.md}
            hd='问题反馈'
            arrow
            highlight
            onPress={() => appNavigate(FEEDBACK_URL, navigation)}
          />
          <ItemSetting
            border
            hd='检测更新'
            ft={
              hasNewVersion ? (
                <Text type='success' size={16}>
                  有新版本({name})
                </Text>
              ) : (
                `当前版本(${version})`
              )
            }
            arrow
            onPress={() => appNavigate(GITHUB_RELEASE_URL)}
          />
          <ItemSetting
            border
            hd='项目地址'
            ft='喜欢可Star'
            arrow
            highlight
            onPress={() => appNavigate(GITHUB_URL)}
          />

          <ItemSetting
            style={_.mt.md}
            hd='清除缓存'
            arrow
            highlight
            onPress={Stores.clearStorage}
          />

          <ItemSetting
            style={_.mt.md}
            hd='退出登陆'
            arrow
            highlight
            onPress={() => Stores.logout(navigation)}
          />

          <ItemSetting
            style={[
              _.mt.md,
              {
                opacity: showDev ? 1 : 0
              }
            ]}
            hd='调试模式'
            arrow
            highlight
            onPress={this.toggleDev}
          />
        </ScrollView>
      </>
    )
  }
}
