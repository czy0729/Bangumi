/*
 * 时光机
 * @Author: czy0729
 * @Date: 2019-04-26 20:31:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-24 23:07:11
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '@components'
import { IconHeader, IconTabBar } from '@screens/_'
import { inject, withHeader, observer } from '@utils/decorators'
import _ from '@styles'
import List from './list'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class User extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '我的',
    headerRight: (
      <IconHeader
        style={{ marginRight: -_.sm }}
        name='setting'
        onPress={() => navigation.push('Setting')}
      />
    ),
    tabBarIcon: ({ tintColor }) => <IconTabBar name='me' color={tintColor} />,
    tabBarLabel: '我的'
  })

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
