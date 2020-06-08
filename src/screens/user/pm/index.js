/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 17:52:37
 */
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ActivityIndicator } from '@ant-design/react-native'
import { Flex, FixedTextarea, Input, Text } from '@components'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import Chat from './chat'
import Store from './store'

const title = '短信'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['pm', 'PM']
})
@observer
class PM extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

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

  renderNewForm() {
    const { $ } = this.context
    const { userId, userName } = $.params
    if (!userId) {
      return null
    }

    return (
      <>
        <View style={styles.form}>
          <Text>收件人: {userName}</Text>
        </View>
        <Input
          style={styles.ipt}
          placeholder='输入标题'
          onChange={this.onTitleChange}
        />
      </>
    )
  }

  render() {
    const { $, navigation } = this.context
    const { value } = $.state
    return (
      <View style={_.container.screen}>
        {$.pmParams._loaded || $.pmDetail._loaded ? (
          <ScrollView
            ref={this.connectRefScrollView}
            style={_.container.screen}
            contentContainerStyle={_.container.bottom}
          >
            <Chat />
          </ScrollView>
        ) : (
          <Flex style={_.container.screen} justify='center'>
            <ActivityIndicator />
          </Flex>
        )}
        <FixedTextarea
          ref={this.connectRefFixedTextarea}
          placeholder='回复'
          value={value}
          onChange={$.onChange}
          onClose={$.closeFixedTextarea}
          onSubmit={value => $.doSubmit(value, this.scrollView, navigation)}
        >
          {this.renderNewForm()}
        </FixedTextarea>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  ipt: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind,
    borderRadius: 0
  }
})
