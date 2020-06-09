/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-09 17:19:16
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { StatusBarEvents, Loading, ListView, UM } from '@components'
import { OptimizeTabbarTransition, IconTabBar } from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { IOS } from '@constants'
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

  ListHeaderComponent = (<Header />)

  render() {
    const { $ } = this.context
    const { _loaded } = $.home
    return (
      <>
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        <View style={_.container.plain}>
          {_loaded ? (
            <OptimizeTabbarTransition>
              <ListView
                style={IOS ? _.container.flex : this.styles.androidWrap}
                contentContainerStyle={this.styles.contentContainerStyle}
                keyExtractor={keyExtractor}
                data={$.state.home}
                ListHeaderComponent={this.ListHeaderComponent}
                renderItem={renderItem}
                onHeaderRefresh={$.init}
                onFooterRefresh={$.fetchHome}
              />
            </OptimizeTabbarTransition>
          ) : (
            <Loading style={_.container.flex} />
          )}
        </View>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  hide: {
    display: 'none'
  },
  androidWrap: {
    flex: 1,
    marginBottom: _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight
  }
}))

function tabBarIcon({ tintColor }) {
  return <IconTabBar name='home' color={tintColor} />
}

function keyExtractor(item) {
  return item.type
}

function renderItem({ item }) {
  return <List {...item} />
}
