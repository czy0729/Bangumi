/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-22 20:14:42
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const title = '标签'

export default
@inject(Store)
@withHeader()
@observer
class Tag extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { type, tag } = navigation.state.params
    const _type = MODEL_SUBJECT_TYPE.getTitle(type)
    return {
      title: `${_type}${title}: ${tag}`
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
    hm(
      `${type}/${tag}/${airtime}`,
      `${title} - ${MODEL_SUBJECT_TYPE.getTitle(type)} | ${tag} | ${airtime}`
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return null
    }

    return (
      <View style={_.container.screen}>
        <ToolBar />
        <List />
      </View>
    )
  }
}
