/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 18:25:20
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView, Text } from '@components'
import { ItemFriends } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import Store from './store'

const title = '好友'

export default
@inject(Store)
@withHeader({
  screen: title
})
@observer
class Friends extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', '好友')
  })

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    const { userId } = $.params
    const { userName } = $.users(userId)
    navigation.setParams({
      title: userName ? `${userName}的好友` : '我的好友',
      popover: {
        data: ['默认', '同步率', '最近操作'],
        onSelect: key => {
          $.sort(key)
        }
      },
      element: <Text size={16}>排序</Text>
    })

    hm(`user/${$.params.userId}/friends`, 'Friends')
  }

  render() {
    const { $, navigation } = this.context
    const event = {
      id: '好友.跳转'
    }
    return (
      <ListView
        style={_.container.screen}
        data={$.friends}
        keyExtractor={item => item.userId}
        renderItem={({ item }) => (
          <ItemFriends
            key={item.userId}
            navigation={navigation}
            event={event}
            {...item}
            {...$.users(item.userId)}
          />
        )}
        onHeaderRefresh={$.refresh}
      />
    )
  }
}
