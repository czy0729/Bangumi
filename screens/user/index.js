/*
 * 时光机
 * @Author: czy0729
 * @Date: 2019-04-26 20:31:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-22 18:20:31
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '@components'
import { inject, withHeader, observer } from '@utils/decorators'
import _ from '@styles'
import List from './list'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class User extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    if (!$.userCollections._loaded) {
      return <Loading style={_.container.screen} />
    }

    return <List />
  }
}
