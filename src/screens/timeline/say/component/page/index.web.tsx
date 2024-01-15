/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:13:27
 */
import React from 'react'
import { FixedTextarea, Flex, Loading, Page, ScrollView, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import Chat from '../chat'

class Say extends React.Component {
  state = {
    expand: false
  }

  onExpand = () => {
    this.setState({
      expand: true
    })
  }

  renderNew() {
    const { $, navigation } = this.context as Ctx
    const { value } = $.state
    return (
      <>
        <ScrollView
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
            onSubmit={value => $.doSubmit(value, null, navigation)}
          />
        )}
      </>
    )
  }

  renderList() {
    const { $ } = this.context as Ctx
    const { _loaded } = $.say
    if (!_loaded) {
      return (
        <Flex style={_.container.screen} justify='center'>
          <Loading />
        </Flex>
      )
    }

    return (
      <ScrollView contentContainerStyle={_.container.bottom} {...SCROLL_VIEW_RESET_PROPS}>
        <Chat />
      </ScrollView>
    )
  }

  renderTextarea() {
    const { $, navigation } = this.context as Ctx
    const { value } = $.state
    return (
      $.isWebLogin && (
        <FixedTextarea
          placeholder='回复吐槽, 长按头像@某人'
          simple
          value={value}
          onChange={$.onChange}
          onClose={$.closeFixedTextarea}
          onSubmit={value => $.doSubmit(value, null, navigation)}
        />
      )
    )
  }

  render() {
    const { $ } = this.context as Ctx
    return <Page style={_.container.screen}>{$.isNew ? this.renderNew() : this.renderList()}</Page>
  }
}

export default obc(Say)
