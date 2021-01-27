/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:22:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import SearchBar from './search-bar'
import History from './history'
import Result from './result'
import Store from './store'

const title = '人物直达'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/search', 'TinygrailSearch'],
  withHeaderParams
})
@obc
class TinygrailSearch extends React.Component {
  static navigationOptions = {
    title: '人物查询'
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { list } = $.state
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <Flex style={this.styles.searchBar}>
          <SearchBar />
        </Flex>
        {list.length ? <Result style={_.mt.sm} /> : <History style={_.mt.sm} />}
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
  searchBar: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  }
}))
