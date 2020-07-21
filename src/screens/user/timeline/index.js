/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-21 20:16:13
 */
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import MosaicTile from './mosaic-tile'
import List from './list'
import Store from './store'

const title = '时间线'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['user/timeline', 'UserTimeline']
})
@observer
class UserTimeline extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    return (
      <ScrollView style={_.container.plain}>
        <MosaicTile />
        <List />
      </ScrollView>
    )
  }
}
