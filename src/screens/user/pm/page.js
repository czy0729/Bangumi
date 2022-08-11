/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:46:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 06:43:53
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import { Page, FixedTextarea, Input, Text, Loading } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Chat from './chat'

export default
@obc
class PM extends React.Component {
  scrollView
  fixedTextarea

  componentDidMount() {
    const { $ } = this.context
    $.init(this.scrollView)
  }

  connectRefScrollView = ref => (this.scrollView = ref)

  connectRefFixedTextarea = ref => (this.fixedTextarea = ref)

  showFixedTextare = () => this.fixedTextarea.onFocus()

  onTitleChange = evt => {
    const { $ } = this.context
    const { nativeEvent } = evt
    const { text } = nativeEvent
    $.onTitleChange(text)
  }

  onSubmit = value => {
    const { $, navigation } = this.context
    return $.doSubmit(value, this.scrollView, navigation)
  }

  renderNewForm() {
    const { $ } = this.context
    const { userId, userName } = $.params
    if (!userId) return null

    return (
      <>
        <View style={this.styles.form}>
          <Text>收件人: {userName}</Text>
        </View>
        <Input
          style={this.styles.ipt}
          placeholder='输入标题'
          onChange={this.onTitleChange}
        />
      </>
    )
  }

  render() {
    const { $ } = this.context
    const { value } = $.state
    return (
      <Page style={_.container.screen}>
        {$.pmParams._loaded || $.pmDetail._loaded ? (
          <ScrollView
            ref={this.connectRefScrollView}
            style={_.container.screen}
            contentContainerStyle={_.container.bottom}
            scrollToTop
          >
            <Chat />
          </ScrollView>
        ) : (
          <Loading />
        )}
        <FixedTextarea
          ref={this.connectRefFixedTextarea}
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

const memoStyles = _.memoStyles(() => ({
  form: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  ipt: {
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: _.wind,
    borderRadius: 0
  }
}))
