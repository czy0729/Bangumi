/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 19:47:38
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'

const event = {
  id: '排行榜.跳转'
}

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { list } = $.state
    if (list) {
      return (
        <ItemSearch
          navigation={navigation}
          index={index}
          event={{
            ...event,
            data: {
              type: 'list'
            }
          }}
          {...item}
        />
      )
    }
    return (
      <ItemCollectionsGrid
        navigation={navigation}
        index={index}
        event={{
          ...event,
          data: {
            type: 'grid'
          }
        }}
        {...item}
        id={item.id.replace('/subject/', '')}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { hide } = $.state
    if (hide) {
      return null
    }

    const { _loaded } = $.rank
    if (!_loaded) {
      return <Loading />
    }

    const { list } = $.state
    const numColumns = list ? undefined : 4
    return (
      <ListView
        key={String(numColumns)}
        numColumns={numColumns}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.rank}
        renderItem={this.renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchRank}
      />
    )
  }
}
