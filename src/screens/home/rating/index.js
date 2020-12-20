/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-19 12:11:03
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { TabBar, SceneMap } from 'react-native-tab-view'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text, Heatmap } from '@components'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import Filter from './filter'
import List from './list'
import Store, { routes } from './store'

const title = '用户评分'
const statusMap = {
  wishes: 'wish',
  collections: 'collect',
  doings: 'doing',
  on_hold: 'onHold',
  dropped: 'dropped'
}

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['rating', 'Rating']
})
@observer
class Rating extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    const { name } = $.params
    if (name) {
      navigation.setParams({
        title: name
      })
    }

    navigation.setParams({
      extra: <Filter $={$} />
    })
  }

  renderTabBar = props => {
    const { $ } = this.context
    return (
      <TabBar
        {...props}
        key={Object.keys($.counts) ? '1' : '0'}
        style={this.styles.tabBar}
        tabStyle={this.styles.tab}
        labelStyle={this.styles.label}
        indicatorStyle={this.styles.indicator}
        pressOpacity={1}
        pressColor='transparent'
        renderLabel={({ route, focused }) => {
          const count = $.counts[route.key] || $.params[statusMap[route.key]]
          return (
            <Flex style={this.styles.labelText} justify='center'>
              <Text type='title' size={13} bold={focused}>
                {route.title}
              </Text>
              {!!count && (
                <Text type='sub' size={11} bold lineHeight={13}>
                  {' '}
                  {count}{' '}
                </Text>
              )}
            </Flex>
          )
        }}
      />
    )
  }

  renderScene = SceneMap(
    Object.assign(
      {},
      ...routes.map(item => ({
        [item.key]: () => <List title={item.title} />
      }))
    )
  )

  render() {
    const { $ } = this.context
    const { page, _loaded } = $.state
    return (
      <View style={_.container.plain}>
        {_loaded && (
          <TabView
            lazyPreloadDistance={0}
            navigationState={{
              index: page,
              routes
            }}
            renderTabBar={this.renderTabBar}
            renderScene={this.renderScene}
            onIndexChange={$.onChange}
          />
        )}
        <Heatmap
          right={_.wind + 62}
          bottom={_.window.height - _.tabsHeaderHeight - 12}
          id='用户评分.标签页切换'
          transparent
        />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const W_TAB = _.window.width / routes.length
const W_INDICATOR = 16
const memoStyles = _.memoStyles(_ => ({
  tabBar: {
    backgroundColor: _.colorPlain,
    borderBottomWidth: _.flat ? 0 : _.hairlineWidth,
    borderBottomColor: _.colorBorder,
    elevation: 0
  },
  tab: {
    width: W_TAB,
    height: 48
  },
  label: {
    padding: 0
  },
  labelText: {
    width: '100%'
  },
  indicator: {
    width: W_INDICATOR,
    height: 4,
    marginLeft: (W_TAB - W_INDICATOR) / 2,
    backgroundColor: _.colorMain,
    borderRadius: 4
  }
}))
