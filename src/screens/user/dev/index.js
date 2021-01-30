/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:11:21
 */
import React from 'react'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { ScrollView, Text, Switch, Touchable, Button } from '@components'
import { ItemSetting } from '@screens/_'
import { _, systemStore, userStore } from '@stores'
import { withHeader, ob } from '@utils/decorators'

const title = '开发菜单'

export default
@withHeader({
  screen: title,
  hm: ['dev', 'DEV']
})
@ob
class DEV extends React.Component {
  static navigationOptions = {
    title
  }

  state = {
    showDetail: false
  }

  onShow = () => {
    this.setState({
      showDetail: true
    })
  }

  rederOptions() {
    const { dev, devEvent } = systemStore.state
    return (
      <>
        <ItemSetting
          hd='调试'
          ft={<Switch checked={dev} onChange={systemStore.toggleDev} />}
          withoutFeedback
        />
        <ItemSetting
          hd='显示埋点'
          ft={
            <Switch
              checked={devEvent.enabled}
              onChange={() => systemStore.toggleDevEvent('enabled')}
            />
          }
          withoutFeedback
        />
        <ItemSetting
          hd='JSException'
          ft={
            // eslint-disable-next-line no-undef
            <Touchable onPress={() => yijianmaojiao()}>
              <Text>一键猫叫</Text>
            </Touchable>
          }
          withoutFeedback
        />
      </>
    )
  }

  renderView(title, content) {
    return (
      <Text
        style={[this.styles.code, _.mt.md]}
        size={12}
        lineHeight={16}
        selectable
      >
        <Text size={12} lineHeight={16} type='sub'>
          {title}
        </Text>
        {content.map(item => `\n\n${JSON.stringify(item, null, 2)}`)}
      </Text>
    )
  }

  render() {
    const { showDetail } = this.state
    const { ota } = systemStore.state
    return (
      <ScrollView
        style={this.styles.screen}
        contentContainerStyle={this.styles.container}
        scrollToTop
      >
        {this.rederOptions()}
        {this.renderView('CDN', [ota])}
        {this.renderView('设备视窗', [_.window])}
        {this.renderView('登陆信息', [
          {
            accessToken: userStore.accessToken
          },
          {
            userCookie: userStore.userCookie
          },
          {
            setCookie: userStore.setCookie
          }
        ])}
        {this.renderView('平台信息', [Platform])}
        {showDetail ? (
          this.renderView('平台常量', [Constants])
        ) : (
          <Button style={_.mt.md} onPress={this.onShow}>
            显示平台常量
          </Button>
        )}
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  screen: {
    backgroundColor: _.colorPlain
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  code: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
