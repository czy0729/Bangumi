/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:00:50
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import {
  FixedTextarea,
  Flex,
  Heatmap,
  Touchable,
  Text,
  Iconfont
} from '@components'
import { NavigationBarEvents, Avatar } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { HOST } from '@constants'
import Chat from './chat'
import Heatmaps from './heatmaps'
import Store from './store'

const title = '吐槽'
const event = {
  id: '吐槽.跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title
})
@obc
class Say extends React.Component {
  static navigationOptions = {
    title
  }

  state = {
    expand: false
  }

  scrollView
  fixedTextarea

  async componentDidMount() {
    const { $, navigation } = this.context
    const { userId, id } = $.params
    await $.init(this.scrollView)

    navigation.setParams({
      title: $.isNew ? '新吐槽' : '吐槽',
      heatmap: '吐槽.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('吐槽.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open(
                $.isNew
                  ? `${HOST}/timeline?type=say`
                  : `${HOST}/user/${userId}/timeline/status/${id}`
              )
              break
            default:
              break
          }
        }
      }
    })

    setTimeout(() => {
      $.scrollToBottom(this.scrollView)
    }, 160)

    hm(
      $.isNew
        ? `${HOST}/timeline?type=say`
        : `/user/${userId}/timeline/status/${id}`,
      'Say'
    )
  }

  connectRefScrollView = ref => (this.scrollView = ref)

  connectRefFixedTextarea = ref => (this.fixedTextarea = ref)

  showFixedTextare = () => this.fixedTextarea.onFocus()

  onExpand = () =>
    this.setState({
      expand: true
    })

  renderNew() {
    const { $, navigation } = this.context
    const { value } = $.state
    return (
      <>
        <ScrollView
          ref={this.connectRefScrollView}
          style={_.container.screen}
          contentContainerStyle={_.container.bottom}
        >
          <Chat />
        </ScrollView>
        {$.isWebLogin && (
          <FixedTextarea
            ref={this.connectRefFixedTextarea}
            placeholder='新吐槽'
            simple
            value={value}
            onChange={$.onChange}
            onClose={$.closeFixedTextarea}
            onSubmit={value => $.doSubmit(value, this.scrollView, navigation)}
          />
        )}
      </>
    )
  }

  renderList() {
    const { $ } = this.context
    const { _loaded } = $.say
    if (!_loaded) {
      return (
        <Flex style={_.container.screen} justify='center'>
          <ActivityIndicator />
        </Flex>
      )
    }

    return (
      <>
        <ScrollView
          ref={this.connectRefScrollView}
          style={_.container.screen}
          contentContainerStyle={this.styles.list}
          scrollToTop
        >
          <Chat />
        </ScrollView>
        {this.renderUsers()}
        {this.renderTextarea()}
      </>
    )
  }

  renderExpand() {
    const { $ } = this.context
    return (
      <Touchable onPress={this.onExpand}>
        <ScrollView
          style={this.styles.expand}
          contentContainerStyle={this.styles.contentContainerStyle}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Flex>
            <Text style={_.ml.sm} size={12} bold>
              {$.users.length}人参与
            </Text>
            <Iconfont name='extra' />
          </Flex>
        </ScrollView>
      </Touchable>
    )
  }

  renderUsers() {
    const { expand } = this.state
    if (!expand) {
      return this.renderExpand()
    }

    const { $, navigation } = this.context
    return (
      <ScrollView
        style={this.styles.users}
        contentContainerStyle={this.styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {$.users.map(item => {
          const { avatar = {} } = $.usersInfo(item.id)
          return (
            <Avatar
              style={_.mr.sm}
              navigation={navigation}
              src={item.avatar || avatar.medium}
              size={34}
              userId={item.id}
              name={item.name}
              border={0}
              round
              event={event}
              onLongPress={() => $.at(item.id)}
            />
          )
        })}
        <Heatmap id='吐槽.at' />
      </ScrollView>
    )
  }

  renderTextarea() {
    const { $, navigation } = this.context
    const { value } = $.state
    return (
      $.isWebLogin && (
        <FixedTextarea
          ref={this.connectRefFixedTextarea}
          placeholder='回复吐槽, 长按头像@某人'
          simple
          value={value}
          onChange={$.onChange}
          onClose={$.closeFixedTextarea}
          onSubmit={value => $.doSubmit(value, this.scrollView, navigation)}
        />
      )
    )
  }

  render() {
    const { $ } = this.context
    return (
      <View style={_.container.screen}>
        <NavigationBarEvents />
        {$.isNew ? this.renderNew() : this.renderList()}
        <Heatmaps />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  expand: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 52,
    height: 50,
    paddingVertical: _.sm,
    backgroundColor: _.colorPlain,
    borderRadius: 28
  },
  users: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 52,
    left: _.wind,
    height: 50,
    paddingVertical: _.sm,
    backgroundColor: _.colorPlain,
    borderRadius: 28
  },
  contentContainerStyle: {
    height: 34,
    paddingHorizontal: 8
  },
  list: {
    paddingBottom: _.bottom + _.lg
  }
}))
