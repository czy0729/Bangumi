/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-27 12:23:11
 */
import React from 'react'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import * as ScreenOrientation from 'expo-screen-orientation'
import { ScrollView, Text, Switch, Touchable, Iconfont } from '@components'
import { ItemSetting } from '@screens/_'
import { _, systemStore, userStore } from '@stores'
import { withHeader, ob } from '@utils/decorators'
import {
  getHashSubjectOTA,
  getHashAvatarOTA,
  initXsbRelationOTA,
  getXsbRelationOTA
} from '@constants/cdn'
import hashSubject from '@constants/json/hash/subject.min.json'
import hashAvatar from '@constants/json/hash/avatar.min.json'
import UpdateTourist from './update-tourist'

const title = '开发菜单'

export default
@withHeader({
  screen: title,
  hm: ['dev', 'DEV']
})
@ob
class DEV extends React.Component {
  state = {
    showDetail: false
  }

  componentDidMount() {
    initXsbRelationOTA()
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
          hd='Dev Mode'
          ft={
            <Switch
              style={this.styles.switch}
              checked={dev}
              onChange={systemStore.toggleDev}
            />
          }
          withoutFeedback
        />
        <ItemSetting
          hd='Track Points'
          ft={
            <Switch
              style={this.styles.switch}
              checked={devEvent.enabled}
              onChange={() => systemStore.toggleDevEvent('enabled')}
            />
          }
          withoutFeedback
        />
        <ItemSetting
          hd='JS Exception Test'
          ft={
            // eslint-disable-next-line no-undef
            <Touchable onPress={() => yijianmaojiao()}>
              <Text>一键猫叫</Text>
            </Touchable>
          }
          withoutFeedback
        />
        <ItemSetting
          hd='Screen Orientation Lock'
          ft={
            <Touchable onPress={() => ScreenOrientation.unlockAsync()}>
              <Text>解锁旋转</Text>
            </Touchable>
          }
          withoutFeedback
        />
        <UpdateTourist />
        <ItemSetting hd='Update Advance' />
        <ItemSetting hd='Advance Users' />
      </>
    )
  }

  renderIcons() {
    return (
      <Text style={[this.styles.code, _.mt.md]} selectable>
        {[
          'ios-star',
          'ios-star-outline',
          'ios-star-half',
          'ios-moon',
          'ios-sunny',
          'md-videogame-asset',
          'md-link'
        ].map(item => (
          <Iconfont key={item} name={item} />
        ))}
      </Text>
    )
  }

  renderView(title, content) {
    return (
      <Text style={[this.styles.code, _.mt.md]} size={12} lineHeight={16} selectable>
        <Text size={12} lineHeight={16} type='sub'>
          {title}
        </Text>
        {typeof content === 'string'
          ? content
          : content.map(item => `\n${JSON.stringify(item, null, 2)}`)}
      </Text>
    )
  }

  render() {
    const { ota } = systemStore.state
    return (
      <ScrollView
        style={this.styles.screen}
        contentContainerStyle={this.styles.container}
        scrollToTop
      >
        {this.rederOptions()}
        {/* {this.renderIcons()} */}
        {this.renderView(
          'AUTH\n',
          JSON.stringify({
            tourist: 1,
            accessToken: userStore.accessToken,
            userCookie: userStore.userCookie
          })
        )}
        {this.renderView('OTA', [
          {
            hashSubject: Object.keys(hashSubject).length,
            hashSubjectOTA: Object.keys(getHashSubjectOTA()).length,
            hashAvatar: Object.keys(hashAvatar).length,
            hashAvatarOTA: Object.keys(getHashAvatarOTA()).length,
            xsbRelationOTA: Object.keys(getXsbRelationOTA().data).length
          }
        ])}
        {this.renderView('CDN', [ota])}
        {this.renderView('设备视窗', [_.window])}
        {this.renderView('登录信息', [
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
        {this.renderView('平台常量', [Constants])}
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  screen: {
    backgroundColor: _.colorPlain
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: _.bottom
  },
  code: {
    paddingVertical: _.space,
    paddingHorizontal: _.md,
    marginHorizontal: _.wind,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  }
}))
