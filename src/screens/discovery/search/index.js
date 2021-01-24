/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-24 20:58:15
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Button, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
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
@obc
class Search extends React.Component {
  static navigationOptions = {
    title
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    navigation.setParams({
      heatmap: '搜索.右上角菜单',
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
      <View style={_.container.plain}>
        <Flex style={styles.searchBar}>
          <Category />
          <Flex.Item>
            <SearchBar />
          </Flex.Item>
          <Legacy />
          <View style={_.ml.sm}>
            <Button
              style={styles.btn}
              type='ghostPlain'
              size='sm'
              onPress={this.onPress}
            >
              查询
            </Button>
            <Heatmap id='搜索.搜索' />
          </View>
        </Flex>
        <History style={_.mt.sm} />
        <List />
      </View>
    )
  }
}

const styles = _.create({
  searchBar: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  btn: {
    width: 68,
    height: 34,
    borderRadius: 34
  }
})
