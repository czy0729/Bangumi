/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 14:12:40
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { StatusBarEvents, IconTabBar } from '@screens/_'
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
    tabBarLabel: '发现'
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('discovery', title)
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.home
    if (!_loaded) {
      return <Loading style={_.container.screen} />
    }

    return (
      <>
        <StatusBarEvents />
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
      </>
    )
  }
}
