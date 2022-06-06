/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:55:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-07 07:11:54
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@_'
import { _ } from '@stores'
import { matchYear, keyExtractor, x18s } from '@utils'
import { obc } from '@utils/decorators'
import { TEXT_18X } from '@constants/text'
import ToolBar from './tool-bar'

const EVENT_LIST = {
  id: '用户标签.跳转',
  data: {
    type: 'list'
  }
}

const EVENT_GRID = {
  id: '用户标签.跳转',
  data: {
    type: 'grid'
  }
}

class List extends React.Component {
  onHeaderRefresh = () => {
    const { $ } = this.context
    $.fetchTag(true)
  }

  onFooterRefresh = () => {
    const { $ } = this.context

    // 网页判断不了还有没有下一页, 假如长度小于一页24个, 不请求
    if ($.tag.list.length < 24) return false

    return $.fetchTag()
  }

  get num() {
    return _.portrait(3, 5)
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { list, airtime } = $.state
    const collection = $.userCollectionsMap[String(item.id).replace('/subject/', '')]
    if (list) {
      return (
        <ItemSearch
          style={_.container.item}
          navigation={navigation}
          index={index}
          event={EVENT_LIST}
          collection={collection}
          {...item}
        >
          {!index && <Heatmap id='用户标签.跳转' />}
        </ItemSearch>
      )
    }

    return (
      <ItemCollectionsGrid
        navigation={navigation}
        style={(_.isPad || _.isLandscape) && !(index % this.num) && _.container.left}
        index={index}
        event={EVENT_GRID}
        collection={collection}
        num={this.num}
        {...item}
        airtime={airtime === '' && matchYear(item.tip)}
        isCollect={item.collected}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { hide, fixed } = $.state
    const { _loaded } = $.tag
    if (!_loaded || hide) {
      return (
        <>
          {!fixed && <ToolBar />}
          <Loading />
        </>
      )
    }

    const { list } = $.state
    const numColumns = list ? undefined : this.num
    return (
      <ListView
        key={`${_.orientation}${numColumns}`}
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        numColumns={numColumns}
        data={$.list}
        scrollToTop
        footerEmptyDataText={x18s($.params.tag) ? TEXT_18X : undefined}
        ListHeaderComponent={!fixed && <ToolBar />}
        renderItem={this.renderItem}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
      />
    )
  }
}

export default obc(List)
