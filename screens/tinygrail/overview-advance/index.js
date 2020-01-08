/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:37:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-08 16:07:52
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { inject, withHeader } from '@utils/decorators'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import List from './list'
import Store from './store'

const title = '卖一精选'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/overview-advance', 'TinygrailOverviewAdvance'],
  ...headerStyle
})
@observer
class TinygrailOverviewAdvance extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: _.colorTinygrailContainer
          }
        ]}
      >
        <StatusBarEvents />
        <List />
      </View>
    )
  }
}
