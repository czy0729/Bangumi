/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-28 20:02:37
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, ListView, ScrollView } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Item from './item'
import Log from './log'
import Store from './store'

const title = '通天塔(α)'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/star', 'Star'],
  withHeaderParams
})
@obc
class TinygrailStar extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  renderStarList() {
    const { $ } = this.context
    const { hover } = $.state
    const { list } = $.star
    return (
      <ScrollView style={_.container.flex}>
        <Flex wrap='wrap'>
          {list.map(item => (
            <Item key={item.id} {...item} hover={item.id === hover} />
          ))}
        </Flex>
      </ScrollView>
    )
  }

  renderStarLogs() {
    const { $ } = this.context
    return (
      <Flex style={this.styles.logs}>
        <Flex.Item />
        <View style={this.styles.logsList}>
          <ListView
            style={_.container.flex}
            keyExtractor={keyExtractor}
            refreshControlProps={{
              color: _.colorTinygrailText
            }}
            footerTextType='tinygrailText'
            data={$.starLogs}
            showFooter={false}
            renderItem={renderItem}
            onHeaderRefresh={$.fetchStarLogs}
          />
        </View>
      </Flex>
    )
  }

  render() {
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        {this.renderStarList()}
        {this.renderStarLogs()}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  logs: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  logsList: {
    paddingLeft: _._wind,
    width: 200,
    backgroundColor: _.colorTinygrailContainer
  }
}))

function renderItem({ item, index }) {
  return <Log index={index} {...item} />
}
