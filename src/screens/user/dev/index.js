/*
 * @Author: czy0729
 * @Date: 2020-01-13 11:23:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-01 10:52:44
 */
import React from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import { ScrollView, Text, Switch, Touchable } from '@components'
import { ItemSetting } from '@screens/_'
import { _, systemStore } from '@stores'
import { withHeader, ob } from '@utils/decorators'
import { initXsbRelationOTA } from '@constants/cdn'
import UpdateTourist from './update-tourist'
import UpdateAdvance from './update-advance'
import Detail from './detail'

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
        <UpdateAdvance />
        <ItemSetting hd='Advance Users' />
      </>
    )
  }

  render() {
    return (
      <ScrollView
        style={this.styles.screen}
        contentContainerStyle={this.styles.container}
        scrollToTop
      >
        {this.rederOptions()}
        <Detail />
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
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  }
}))
