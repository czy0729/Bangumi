/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 19:05:26
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Button, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { MODEL_SEARCH_CAT } from '@constants/model'
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
              open($.url)
              break

            default:
              break
          }
        }
      }
    })
  }

  onPress = () => {
    const { $, navigation } = this.context
    if (this.isUser) {
      const { value } = $.state
      if (!value) {
        return info('请输入完整的用户Id')
      }

      return navigation.push('Zone', {
        userId: value
      })
    }

    return $.doSearch(true)
  }

  get isUser() {
    const { $ } = this.context
    const { cat } = $.state
    const label = MODEL_SEARCH_CAT.getLabel(cat)
    return label === '用户'
  }

  render() {
    return (
      <View style={_.container.plain}>
        <Flex style={this.styles.searchBar}>
          <Category />
          <Flex.Item>
            <SearchBar onPress={this.onPress} />
          </Flex.Item>
          <Legacy />
          <View style={_.ml.sm}>
            <Button
              style={this.styles.btn}
              type='ghostPlain'
              size='sm'
              onPress={this.onPress}
            >
              {this.isUser ? '前往' : '查询'}
            </Button>
            <Heatmap id='搜索.搜索' />
          </View>
        </Flex>
        <History style={_.mt.sm} />
        <List />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  searchBar: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  btn: {
    width: 68 * _.ratio,
    height: 34 * _.ratio,
    borderRadius: 34 * _.ratio,
    overflow: 'hidden'
  }
}))
