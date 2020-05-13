/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 21:26:24
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const title = '用户标签'

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class Tag extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { type, tag } = navigation.state.params
    const _type = MODEL_SUBJECT_TYPE.getTitle(type)
    return {
      title: `${_type}标签 ${tag}`
    }
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const { type, tag, airtime } = navigation.state.params
    hm([type, tag, airtime].filter(item => !!item).join('/'), 'Tag')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.bg}>
        <ToolBar />
        {_loaded && <List />}
      </View>
    )
  }
}
