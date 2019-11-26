/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-26 20:45:12
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StatusBarEvents, Loading, ListView, UM } from '@components'
import { IconTabBar } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import Header from './header'
import List from './list'
import Store from './store'

const title = '发现'

export default
@inject(Store)
@observer
class Discovery extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar name='home' color={tintColor} />,
    tabBarLabel: title
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('discovery', 'Discovery')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.home
    return (
      <>
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        {_loaded ? (
          <ListView
            style={_.container.screen}
            contentContainerStyle={_.container.bottom}
            keyExtractor={item => item.type}
            data={$.state.home}
            ListHeaderComponent={<Header />}
            renderItem={({ item }) => <List {...item} />}
            onHeaderRefresh={$.init}
            onFooterRefresh={$.fetchHome}
          />
        ) : (
          <Loading style={_.container.screen} />
        )}
      </>
    )
  }
}
