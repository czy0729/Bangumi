/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-23 00:32:23
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Touchable, Iconfont } from '@components'
import { appNavigate } from '@utils/app'
import { inject, withHeader, observer } from '@utils/decorators'
import { HOST } from '@constants'
import _ from '@styles'
import Category from './category'
import SearchBar from './search-bar'
import History from './history'
import List from './list'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class Search extends React.Component {
  static navigationOptions = {
    title: '搜索',
    headerRight: (
      <Touchable onPress={() => appNavigate(`${HOST}/subject_search`)}>
        <Iconfont size={24} name='navigation' color={_.colorTitle} />
      </Touchable>
    )
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return null
    }

    return (
      <>
        <Flex style={styles.searchBar}>
          <Category />
          <Flex.Item style={_.ml.sm}>
            <SearchBar />
          </Flex.Item>
        </Flex>
        <History />
        <List />
      </>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    paddingTop: _.wind,
    paddingHorizontal: _.wind
  }
})
