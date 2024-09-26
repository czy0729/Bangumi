/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:46:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 01:29:32
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
    this.$.init(this.scrollView)
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

  onTitleChange = evt => {
    this.$.onTitleChange(evt.nativeEvent.text)
  }

  onSubmit = (value: string) => {
    return this.$.doSubmit(value, this.scrollView, this.navigation)
  }

  get $() {
    return (this.context as Ctx).$
  }

  get navigation() {
    return (this.context as Ctx).navigation
  }

  renderNewForm() {
    if (!this.$.userId) return null

    return (
      <>
        <View style={this.styles.form}>
          <Text>收件人: {this.$.params.userName}</Text>
        </View>
        <Input style={this.styles.ipt} placeholder='输入标题' onChange={this.onTitleChange} />
      </>
    )
  }

  render() {
    const { value } = this.$.state
    return (
      <Page style={_.container.screen}>
        {this.$.pmParams._loaded || this.$.pmDetail._loaded ? (
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
          onChange={this.$.onChange}
          onClose={this.$.closeFixedTextarea}
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
