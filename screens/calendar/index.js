/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-08 15:06:37
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import inject from '@utils/inject'
import List from './list'
import Store from './store'

class Calendar extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.initFetch()
  }

  render() {
    const { $ } = this.context
    if ($.state.loading) {
      return <Loading />
    }

    return <List />
  }
}

export default inject(Store)(observer(Calendar))
