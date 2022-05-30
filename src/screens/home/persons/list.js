/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 10:30:20
 */
import React from 'react'
import { ListView } from '@components'
import { ItemCharacter } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'

const event = {
  id: '制作人员.跳转'
}

class List extends React.Component {
  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemCharacter
        style={_.container.item}
        navigation={navigation}
        index={index}
        event={event}
        type='person'
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
        data={$.persons}
        renderItem={this.renderItem}
      />
    )
  }
}

export default obc(List)
