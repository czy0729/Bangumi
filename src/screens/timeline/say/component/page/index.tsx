/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 11:42:57
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
    await this.$.init(this.scrollView)

    setTimeout(() => {
      this.$.scrollToBottom(this.scrollView)
    }, 480)
  }

  componentWillUnmount() {
    this.$.scrollViewRef = null
  }

  connectRefScrollView = (ref: any) => {
    if (ref) {
      this.$.scrollViewRef = ref
      this.scrollView = ref
    }
  }

  renderTextarea(placeholder: string) {
    if (!userStore.isWebLogin) return null

    return (
      <FixedTextarea
        placeholder={placeholder}
        simple
        value={this.$.state.value}
        onChange={this.$.onChange}
        onClose={this.$.closeFixedTextarea}
        onSubmit={value => this.$.doSubmit(value, this.scrollView, this.navigation)}
      />
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
    if (!this.$.say._loaded) {
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

  get $() {
    return this.context.$ as Ctx['$']
  }

  get navigation() {
    return this.context.navigation as Ctx['navigation']
  }

  render() {
    r(COMPONENT)

    return (
      <Page style={_.container.screen}>{this.$.isNew ? this.renderNew() : this.renderList()}</Page>
    )
  }
}

export default obc(Say)
