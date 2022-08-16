/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 16:09:42
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import {
  FixedTextarea,
  Flex,
  Heatmap,
  Iconfont,
  Loading,
  Page,
  Text,
  Touchable
} from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { API_AVATAR, SCROLL_VIEW_RESET_PROPS } from '@constants'
import Chat from './chat'

const event = {
  id: '吐槽.跳转'
}

class Say extends React.Component {
  state = {
    expand: false
  }

  scrollView
  fixedTextarea

  async componentDidMount() {
    const { $ } = this.context
    await $.init(this.scrollView)

    setTimeout(() => {
      $.scrollToBottom(this.scrollView)
    }, 160)
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
          {...SCROLL_VIEW_RESET_PROPS}
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
          <Loading />
        </Flex>
      )
    }

    return (
      <View style={_.container.flex}>
        <ScrollView
          ref={this.connectRefScrollView}
          style={_.container.screen}
          contentContainerStyle={this.styles.list}
          {...SCROLL_VIEW_RESET_PROPS}
        >
          <Chat />
        </ScrollView>
        {this.renderUsers()}
        {this.renderTextarea()}
      </View>
    )
  }

  renderExpand() {
    const { $ } = this.context
    return (
      <ScrollView
        style={this.styles.expand}
        contentContainerStyle={this.styles.contentContainerStyle}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
      >
        <Flex>
          <Text style={_.ml.sm} size={12} bold>
            {$.users.length}人参与
          </Text>
          <Touchable style={this.styles.touch} onPress={this.onExpand}>
            <Flex style={this.styles.icon}>
              <Iconfont name='md-more-vert' />
            </Flex>
          </Touchable>
        </Flex>
      </ScrollView>
    )
  }

  renderUsers() {
    const { expand } = this.state
    if (!expand) {
      // return this.renderExpand()
      return null
    }

    const { $, navigation } = this.context
    return (
      <ScrollView
        style={this.styles.users}
        contentContainerStyle={this.styles.contentContainerStyle}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {$.users.map(item => (
          <Avatar
            key={item.id}
            style={_.mr.sm}
            navigation={navigation}
            src={API_AVATAR(item.id)}
            size={34}
            userId={item.id}
            name={item.name}
            border={0}
            round
            event={event}
            onLongPress={() => $.at(item.id)}
          />
        ))}
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
      <Page style={_.container.screen}>
        {$.isNew ? this.renderNew() : this.renderList()}
      </Page>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Say)

const memoStyles = _.memoStyles(() => ({
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
    borderRadius: 28,
    overflow: 'hidden'
  },
  contentContainerStyle: {
    height: 34,
    paddingHorizontal: 8
  },
  list: {
    paddingBottom: _.bottom + _.lg
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 24,
    height: 24
  }
}))
