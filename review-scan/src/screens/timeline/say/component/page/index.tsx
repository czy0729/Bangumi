/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 05:45:26
 */
import React from 'react'
import { FlatList, View } from 'react-native'
import { FixedTextarea, Flex, Loading, Page, Text } from '@components'
import { _, userStore } from '@stores'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import Chat from '../chat'
import { COMPONENT } from './ds'
import { styles } from './styles'

class Say extends React.Component<Ctx> {
  scrollView: FlatList

  async componentDidMount() {
    const { $ } = this.props
    await $.init(this.scrollView)

    setTimeout(() => {
      $.scrollToBottom(this.scrollView)
    }, 480)
  }

  componentWillUnmount() {
    const { $ } = this.props
    $.scrollViewRef = null
  }

  connectRefScrollView = (ref: FlatList) => {
    if (ref) {
      const { $ } = this.props
      $.scrollViewRef = ref
      this.scrollView = ref
    }
  }

  renderTextarea(placeholder: string) {
    if (!userStore.isWebLogin) return null

    const { $, navigation } = this.props
    return (
      <FixedTextarea
        placeholder={placeholder}
        simple
        value={$.state.value}
        onChange={$.onChange}
        onClose={$.closeFixedTextarea}
        onSubmit={value => $.doSubmit(value, this.scrollView, navigation)}
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
    const { $ } = this.props
    if (!$.say._loaded) {
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

    const { $ } = this.props
    return (
      <Page style={[_.container.screen, _.container.header]}>
        {$.isNew ? this.renderNew() : this.renderList()}
      </Page>
    )
  }
}

export default ob(Say)
