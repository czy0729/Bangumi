/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 07:15:11
 */
import React from 'react'
import { ListView } from '@components'
import { ItemCharacter } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'

const event = {
  id: '更多角色.跳转'
}

export default
@obc
class List extends React.Component {
  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemCharacter
        style={_.container.item}
        navigation={navigation}
        index={index}
        event={event}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.characters}
        scrollToTop
        renderItem={this.renderItem}
      />
    )
  }
}
