/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-17 14:08:44
 */
import React from 'react'
import { View } from 'react-native'
import { FixedTextarea, Flex, Loading, Page, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Chat from '../chat'
import { Ctx } from '../types'
import { styles } from './styles'

class Say extends React.Component {
  scrollView: any

  async componentDidMount() {
    const { $ }: Ctx = this.context
    await $.init(this.scrollView)

    setTimeout(() => {
      $.scrollToBottom(this.scrollView)
    }, 480)
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

  renderTextarea(placeholder: string) {
    const { $, navigation }: Ctx = this.context
    const { value } = $.state
    return (
      $.isWebLogin && (
        <FixedTextarea
          placeholder={placeholder}
          simple
          value={value}
          onChange={$.onChange}
          onClose={$.closeFixedTextarea}
          onSubmit={value => $.doSubmit(value, this.scrollView, navigation)}
        />
      )
    )
  }

  renderNew() {
    return (
      <View style={_.container.flex}>
        <Chat forwardRef={this.connectRefScrollView} />
        <Text style={styles.notice} type='sub'>
          点击底部输入框录入吐槽内容
        </Text>
        {this.renderTextarea('新吐槽')}
      </View>
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
        <Chat forwardRef={this.connectRefScrollView} />
        {this.renderTextarea('回复吐槽, 长按头像@某人')}
      </View>
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
}

export default obc(Say)
