/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 16:56:22
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import SearchBar from './search-bar'
import History from './history'
import Store from './store'

const title = '人物直达'

export default
@inject(Store)
@withHeader({
  screen: title,
  ...headerStyle
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

    hm('tinygrail/search', 'TinygrailSearch')
  }

  render() {
    return (
      <View
        style={[
          _.container.flex,
          {
            backgroundColor: _.colorTinygrailContainer
          }
        ]}
      >
        <StatusBarEvents />
        <Flex style={styles.searchBar}>
          <SearchBar />
        </Flex>
        <History style={_.mt.sm} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    padding: _.wind
  }
})
