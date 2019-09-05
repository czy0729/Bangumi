/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-04 22:01:47
 */
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { StatusBarEvents, StatusBarPlaceholder } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import Auth from './auth'
import Store from './store'

const title = '小圣杯'

export default
@inject(Store)
@observer
class Tinygrail extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('tinygrail', title)
  }

  render() {
    return (
      <ScrollView>
        <StatusBarEvents />
        <StatusBarPlaceholder />
        <Auth />
      </ScrollView>
    )
  }
}
