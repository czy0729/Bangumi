/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-20 10:58:27
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Button } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { HOST } from '@constants'
import Category from './category'
import SearchBar from './search-bar'
import History from './history'
import List from './list'
import Store from './store'

const title = '搜索'

export default
@inject(Store)
@withHeader({
  screen: title
})
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
          t('搜索.右上角菜单', {
            key
          })

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

    hm('search', 'Search')
  }

  render() {
    const { $ } = this.context
    return (
      <View style={_.container.screen}>
        <Flex style={styles.searchBar}>
          <Category />
          <Flex.Item style={_.ml.sm}>
            <SearchBar />
          </Flex.Item>
          <Button
            style={[styles.btn, _.ml.sm]}
            size='sm'
            onPress={() => $.doSearch(true)}
          >
            查询
          </Button>
        </Flex>
        <History style={_.mt.sm} />
        <List />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    padding: _.wind
  },
  btn: {
    width: 64,
    height: 34,
    borderRadius: 64
  }
})
