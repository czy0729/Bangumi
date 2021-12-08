/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 13:21:46
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemVoice } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'

const event = {
  id: '角色.跳转'
}

export default
@obc
class List extends React.Component {
  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemVoice
        style={_.container.item}
        navigation={navigation}
        index={index}
        event={event}
        {...item}
      >
        {!index && <Heatmap id='角色.跳转' />}
      </ItemVoice>
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.monoVoices
    if (!_loaded) return <Loading />

    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.monoVoices}
        scrollToTop
        renderItem={this.renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
      />
    )
  }
}
