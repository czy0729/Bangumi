/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:39:41
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Button, Heatmap } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import SearchBar from './search-bar'
import History from './history'
import List from './list'
import Store from './store'
import { memoStyles } from './styles'

const title = '帖子搜索'

class Search extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  onPress = () => {
    const { $ } = this.context
    $.doSearch(true)
  }

  render() {
    return (
      <View style={_.container.plain}>
        <Flex style={this.styles.searchBar}>
          <Flex.Item>
            <SearchBar />
          </Flex.Item>
          <View style={_.ml.sm}>
            <Button
              style={this.styles.btn}
              type='ghostPlain'
              size='sm'
              onPress={this.onPress}
            >
              查询
            </Button>
            <Heatmap id='帖子搜索.搜索' />
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

export default inject(Store)(
  withHeader({
    screen: title,
    hm: ['search', 'Search']
  })(obc(Search))
)
