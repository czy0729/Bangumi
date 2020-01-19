/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-19 14:44:27
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StatusBarEvents, Loading, ListView, UM } from '@components'
import { IconTabBar } from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import Header from './header'
import List from './list'
import Store from './store'

const title = '发现'
const ListHeaderComponent = <Header />

export default
@inject(Store)
@observer
class Discovery extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon,
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
            keyExtractor={keyExtractor}
            data={$.state.home}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
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

function tabBarIcon({ tintColor }) {
  return <IconTabBar name='home' color={tintColor} />
}

function keyExtractor(item) {
  return item.type
}

function renderItem({ item }) {
  return <List {...item} />
}
