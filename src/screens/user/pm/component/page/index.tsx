/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:46:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 22:08:35
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { FixedTextarea, Input, Loading, Page, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import Chat from '../chat'
import { memoStyles } from './styles'

class PM extends React.Component {
  scrollView: any

  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init(this.scrollView)
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

  onTitleChange = evt => {
    const { $ } = this.context as Ctx
    const { nativeEvent } = evt
    const { text } = nativeEvent
    $.onTitleChange(text)
  }

  onSubmit = value => {
    const { $, navigation } = this.context as Ctx
    return $.doSubmit(value, this.scrollView, navigation)
  }

  renderNewForm() {
    const { $ } = this.context as Ctx
    const { userId, userName } = $.params
    if (!userId) return null

    return (
      <>
        <View style={this.styles.form}>
          <Text>收件人: {userName}</Text>
        </View>
        <Input style={this.styles.ipt} placeholder='输入标题' onChange={this.onTitleChange} />
      </>
    )
  }

  render() {
    const { $ } = this.context as Ctx
    const { value } = $.state
    return (
      <Page style={_.container.screen}>
        {$.pmParams._loaded || $.pmDetail._loaded ? (
          <ScrollView
            ref={this.connectRefScrollView}
            style={_.container.screen}
            contentContainerStyle={_.container.bottom}
            {...SCROLL_VIEW_RESET_PROPS}
          >
            <Chat />
          </ScrollView>
        ) : (
          <Loading />
        )}
        <FixedTextarea
          placeholder='回复'
          value={value}
          onChange={$.onChange}
          onClose={$.closeFixedTextarea}
          onSubmit={this.onSubmit}
        >
          {this.renderNewForm()}
        </FixedTextarea>
      </Page>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(PM)
