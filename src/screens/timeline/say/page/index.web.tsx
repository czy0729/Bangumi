/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 20:14:58
 */
import React from 'react'
import { ScrollView, FixedTextarea, Flex, Loading, Page, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import Chat from '../chat'
import { Ctx } from '../types'
import { memoStyles } from './styles'

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
    const { $, navigation }: Ctx = this.context
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
      <ScrollView
        contentContainerStyle={_.container.bottom}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        <Chat />
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
          onSubmit={value => $.doSubmit(value, null, navigation)}
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
