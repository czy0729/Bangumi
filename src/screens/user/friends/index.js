/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:23:43
 */
import React from 'react'
import { ListView, Heatmap } from '@components'
import { ItemFriends } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import Sort from './sort'
import Store from './store'

const title = '好友'
const event = {
  id: '好友.跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title
})
@obc
class Friends extends React.Component {
  static navigationOptions = {
    title
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    navigation.setParams({
      extra: <Sort $={$} />
    })

    hm(`user/${$.params.userId}/friends`, 'Friends')
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    return (
      <ItemFriends
        navigation={navigation}
        event={event}
        {...item}
        {...$.users(item.userId)}
      >
        {!index && <Heatmap id='好友.跳转' />}
      </ItemFriends>
    )
  }

  render() {
    const { $ } = this.context
    return (
      <>
        <ListView
          style={_.container.plain}
          data={$.friends}
          keyExtractor={keyExtractor}
          scrollToTop
          renderItem={this.renderItem}
          onHeaderRefresh={$.refresh}
        />
        <Heatmap bottom={_.bottom + _.sm} id='好友' screen='Friends' />
      </>
    )
  }
}

function keyExtractor(item) {
  return String(item.userId)
}
