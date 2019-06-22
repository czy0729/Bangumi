/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-22 23:59:22
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { inject, withHeader, observer } from '@utils/decorators'
import { analysis } from '@utils/fetch'
import Store from './store'

const title = '随便看看'

export default
@inject(Store)
@withHeader()
@observer
class Random extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    // const { $ } = this.context
    // $.init()

    analysis('random', title)
  }

  render() {
    // const { $ } = this.context
    return <View />
  }
}
