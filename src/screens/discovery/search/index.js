/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 20:08:37
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Button } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import Category from './category'
import Legacy from './legacy'
import SearchBar from './search-bar'
import History from './history'
import List from './list'
import Store from './store'

const title = '搜索'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['search', 'Search']
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
  }

  onPress = () => {
    const { $ } = this.context
    $.doSearch(true)
  }

  render() {
    return (
      <View style={_.select(_.container.plain, _.container.bg)}>
        <Flex style={styles.searchBar}>
          <Category />
          <Flex.Item>
            <SearchBar />
          </Flex.Item>
          <Legacy />
          <Button
            style={styles.btn}
            type='ghostPlain'
            size='sm'
            onPress={this.onPress}
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
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  btn: {
    width: 68,
    height: 34,
    marginLeft: _.sm,
    borderRadius: 34
  }
})
