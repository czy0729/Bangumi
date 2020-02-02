/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-02 20:11:18
 */
import React from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ActivityIndicator } from '@ant-design/react-native'
import { Flex, FixedTextarea } from '@components'
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

  render() {
    const { $, navigation } = this.context
    const { value } = $.state
    const { _loaded } = $.pmDetail
    return (
      <View style={_.container.screen}>
        {_loaded ? (
          <>
            <ScrollView
              ref={this.connectRefScrollView}
              style={_.container.screen}
              contentContainerStyle={_.container.bottom}
            >
              <Chat />
            </ScrollView>
            <FixedTextarea
              ref={this.connectRefFixedTextarea}
              placeholder='回复'
              value={value}
              onChange={$.onChange}
              onClose={$.closeFixedTextarea}
              onSubmit={value => $.doSubmit(value, this.scrollView, navigation)}
            />
          </>
        ) : (
          <Flex style={_.container.screen} justify='center'>
            <ActivityIndicator />
          </Flex>
        )}
      </View>
    )
  }
}
