/*
 * @Author: czy0729
 * @Date: 2020-03-24 19:59:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-24 20:02:52
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import Store from './store'

const title = ''

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['comic', 'Comic']
})
@observer
class Comic extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {

  }

  render() {
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.outer}
      >

      </ScrollView>
    )
  }
}
