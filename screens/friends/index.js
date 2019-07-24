/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-24 14:06:05
 */
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { ItemFriends } from '@screens/_'
import { inject, observer } from '@utils/decorators'
// import { hm } from '@utils/fetch'
import _ from '@styles'
import Store from './store'

const title = '好友'

export default
@inject(Store)
@observer
class Friends extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    // hm(`user/${$.params.userId}/friends`, title)
  }

  render() {
    const { $ } = this.context
    const { list } = $.friends
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        {list.map(item => (
          <ItemFriends key={item.userId} {...item} />
        ))}
      </ScrollView>
    )
  }
}
