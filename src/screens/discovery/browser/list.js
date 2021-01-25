/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 12:16:01
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const eventList = {
  id: '索引.跳转',
  data: {
    type: 'list'
  }
}
const eventGrid = {
  id: '索引.跳转',
  data: {
    type: 'grid'
  }
}

export default
@obc
class List extends React.Component {
  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { type } = $.state
    if ($.isList) {
      return (
        <ItemSearch
          style={_.container.item}
          navigation={navigation}
          index={index}
          event={eventList}
          collection={
            $.userCollectionsMap[String(item.id).replace('/subject/', '')]
          }
          typeCn={MODEL_SUBJECT_TYPE.getTitle(type)}
          {...item}
        >
          {index === 1 && <Heatmap id='索引.跳转' />}
        </ItemSearch>
      )
    }

    return (
      <ItemCollectionsGrid
        navigation={navigation}
        index={index}
        collection={
          $.userCollectionsMap[String(item.id).replace('/subject/', '')]
        }
        event={eventGrid}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { show, layout } = $.state
    if (!show) {
      return null
    }

    const { _loaded } = $.browser
    if (!_loaded) {
      return <Loading />
    }

    return (
      <ListView
        key={layout}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        numColumns={$.isList ? undefined : 3}
        data={$.browser}
        renderItem={this.renderItem}
        scrollToTop
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchBrowser}
      />
    )
  }
}
