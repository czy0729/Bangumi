/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:46:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:11:16
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { FixedTextarea, Input, Loading, Page, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import Chat from '../chat'
import { memoStyles } from './styles'

class PM extends React.Component<Ctx> {
  scrollView: any

  componentDidMount() {
    const { $ } = this.props
    $.init(this.scrollView)
  }

  componentWillUnmount() {
    const { $ } = this.props
    $.scrollViewRef = null
  }

  connectRefScrollView = (ref: any) => {
    if (ref) {
      const { $ } = this.props
      $.scrollViewRef = ref
      this.scrollView = ref
    }
  }

  onTitleChange = evt => {
    const { $ } = this.props
    $.onTitleChange(evt.nativeEvent.text)
  }

  onSubmit = (value: string) => {
    const { $, navigation } = this.props
    return $.doSubmit(value, this.scrollView, navigation)
  }

  renderNewForm() {
    const { $ } = this.props
    if (!$.userId) return null

    return (
      <>
        <View style={this.styles.form}>
          <Text>收件人: {$.params.userName}</Text>
        </View>
        <Input style={this.styles.ipt} placeholder='输入标题' onChange={this.onTitleChange} />
      </>
    )
  }

  render() {
    const { $ } = this.props
    const { value } = $.state
    return (
      <Page style={[_.container.header, _.container.screen]}>
        {$.pmParams._loaded || $.pmDetail._loaded ? (
          <ScrollView
            ref={this.connectRefScrollView}
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

export default ob(PM)
