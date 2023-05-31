/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 18:38:28
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
import Chat from '../chat'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '吐槽.跳转'
} as const

class Say extends React.Component {
  state = {
    expand: false
  }

  scrollView: any

  async componentDidMount() {
    const { $ }: Ctx = this.context
    await $.init(this.scrollView)

    setTimeout(() => {
      $.scrollToBottom(this.scrollView)
    }, 320)
  }

  componentWillUnmount() {
    const { $ }: Ctx = this.context
    $.scrollViewRef = null
  }

  connectRefScrollView = (ref: any) => {
    if (ref) {
      const { $ }: Ctx = this.context
      $.scrollViewRef = ref
      this.scrollView = ref
    }
  }

  onExpand = () => {
    this.setState({
      expand: true
    })
  }

  renderNew() {
    const { $, navigation }: Ctx = this.context
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
          <Text style={[_.mt._md, _.ml.md]} type='sub'>
            点击底部输入框录入吐槽内容
          </Text>
        </ScrollView>
        {$.isWebLogin && (
          <FixedTextarea
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
    const { $ }: Ctx = this.context
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
    const { $ }: Ctx = this.context
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
    if (!expand) return null

    const { $, navigation }: Ctx = this.context
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
            round
            event={EVENT}
            onLongPress={() => $.at(item.id)}
          />
        ))}
        <Heatmap id='吐槽.at' />
      </ScrollView>
    )
  }

  renderTextarea() {
    const { $, navigation }: Ctx = this.context
    const { value } = $.state
    return (
      $.isWebLogin && (
        <FixedTextarea
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
    const { $ }: Ctx = this.context
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
