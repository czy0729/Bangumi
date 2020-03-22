/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-16 23:07:20
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ActivityIndicator } from '@ant-design/react-native'
import { FixedTextarea, Flex } from '@components'
import { NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { HOST } from '@constants'
import Chat from './chat'
import Store from './store'

const title = '吐槽'

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class Say extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  scrollView
  fixedTextarea

  async componentDidMount() {
    const { $, navigation } = this.context
    const { userId, id } = $.params
    await $.init(this.scrollView)

    navigation.setParams({
      title: $.isNew ? '新吐槽' : '吐槽',
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
    }, 0)

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
    const { $, navigation } = this.context
    const { value } = $.state
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
          contentContainerStyle={_.container.bottom}
        >
          <Chat />
        </ScrollView>
        {$.isWebLogin && (
          <FixedTextarea
            ref={this.connectRefFixedTextarea}
            placeholder='回复吐槽, 长按头像@某人'
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

  render() {
    const { $ } = this.context
    return (
      <View style={_.container.screen}>
        <NavigationBarEvents />
        {$.isNew ? this.renderNew() : this.renderList()}
      </View>
    )
  }
}
