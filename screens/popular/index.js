/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-24 23:11:00
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { IconTabBar } from '@screens/_'
import { inject } from '@utils/decorators'
import _ from '@styles'
import List from './list'
import Store from './store'

export default
@inject(Store)
@observer
class Popular extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='navigation' color={tintColor} />
    ),
    tabBarLabel: '发现'
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    if (!$.calendar._loaded) {
      return <Loading style={_.container.screen} />
    }

    return <List />
  }
}
