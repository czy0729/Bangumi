/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:03:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 08:33:45
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import ToolBar from './tool-bar'

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

class List extends React.Component {
  get num() {
    return _.portrait(3, 5)
  }

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
          collection={$.userCollectionsMap[String(item.id).replace('/subject/', '')]}
          typeCn={MODEL_SUBJECT_TYPE.getTitle(type)}
          {...item}
        >
          {index === 1 && <Heatmap id='索引.跳转' />}
        </ItemSearch>
      )
    }

    return (
      <ItemCollectionsGrid
        style={(_.isPad || _.isLandscape) && !(index % this.num) && _.container.left}
        navigation={navigation}
        num={this.num}
        index={index}
        collection={$.userCollectionsMap[String(item.id).replace('/subject/', '')]}
        event={eventGrid}
        {...item}
        isCollect={item.collected}
        isRectangle={MODEL_SUBJECT_TYPE.getTitle(type) === '音乐'}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { show, layout, fixed } = $.state
    const { _loaded } = $.browser
    if (!_loaded || !show) {
      return (
        <>
          {!fixed && <ToolBar />}
          <Loading />
        </>
      )
    }

    const numColumns = $.isList ? undefined : this.num
    return (
      <ListView
        key={`${layout}${numColumns}`}
        contentContainerStyle={$.isList ? styles.list : styles.grid}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        data={$.list}
        lazy={9}
        ListHeaderComponent={!fixed && <ToolBar />}
        renderItem={this.renderItem}
        scrollToTop
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchBrowser}
      />
    )
  }
}

export default obc(List)

const styles = _.create({
  list: {
    paddingBottom: _.bottom
  },
  grid: {
    paddingBottom: _.bottom
  }
})
