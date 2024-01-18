/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 06:58:40
 */
import React from 'react'
import { View } from 'react-native'
import { FixedTextarea, Flex, Loading, Page, Text } from '@components'
import { _, userStore } from '@stores'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import Chat from '../chat'
import { COMPONENT } from './ds'
import { styles } from './styles'

class Say extends React.Component {
  scrollView: any

  async componentDidMount() {
    const { $ } = this.context as Ctx
    await $.init(this.scrollView)

    setTimeout(() => {
      $.scrollToBottom(this.scrollView)
    }, 480)
  }

  componentWillUnmount() {
    const { $ } = this.context as Ctx
    $.scrollViewRef = null
  }

  connectRefScrollView = (ref: any) => {
    if (ref) {
      const { $ } = this.context as Ctx
      $.scrollViewRef = ref
      this.scrollView = ref
    }
  }

  renderTextarea(placeholder: string) {
    const { $, navigation } = this.context as Ctx
    const { value } = $.state
    return (
      userStore.isWebLogin && (
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
      <View style={_.container.flex}>
        <Chat forwardRef={this.connectRefScrollView} />
        {this.renderTextarea('回复吐槽, 长按头像@某人')}
      </View>
    )
  }

  render() {
    r(COMPONENT)

    const { $ } = this.context as Ctx
    return <Page style={_.container.screen}>{$.isNew ? this.renderNew() : this.renderList()}</Page>
  }
}

export default obc(Say)
