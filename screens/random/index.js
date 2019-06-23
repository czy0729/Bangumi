/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 14:24:48
 */
import React from 'react'
import PropTypes from 'prop-types'
import { inject, withHeader, observer } from '@utils/decorators'
import { Loading } from '@components'
import _ from '@styles'
import List from './list'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class Random extends React.Component {
  static navigationOptions = {
    header: null
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
    const { $ } = this.context
    if (!$.random._loaded) {
      return <Loading style={_.container.screen} />
    }

    return <List />
  }
}
