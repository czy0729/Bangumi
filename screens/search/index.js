/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 03:10:51
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex } from '@components'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { HOST } from '@constants'
import _ from '@styles'
import Category from './category'
import SearchBar from './search-bar'
import History from './history'
import List from './list'
import Store from './store'

const title = '搜索'

export default
@inject(Store)
@withHeader()
@observer
class Search extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(`${HOST}/subject_search`)
              break
            default:
              break
          }
        }
      }
    })

    hm('subject_search', title)
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
        <History style={_.mt.sm} />
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
