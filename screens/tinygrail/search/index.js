/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 17:51:59
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import SearchBar from './search-bar'
import History from './history'
import Store from './store'

const title = '人物直达'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/search', 'TinygrailSearch'],
  withHeaderParams
})
@observer
class TinygrailSearch extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <Flex style={this.styles.searchBar}>
          <SearchBar />
        </Flex>
        <History style={_.mt.sm} />
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
