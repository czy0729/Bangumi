/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:55:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:56:10
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'

const event = {
  id: '用户标签.跳转'
}

export default
@obc
class List extends React.Component {
  onHeaderRefresh = () => {
    const { $ } = this.context
    $.fetchTag(true)
  }

  onFooterRefresh = () => {
    const { $ } = this.context

    // 网页判断不了还有没有下一页, 假如长度小于一页24个, 不请求
    if ($.tag.list.length < 24) {
      return false
    }
    return $.fetchTag()
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { list } = $.state
    if (list) {
      return (
        <ItemSearch
          style={_.container.item}
          navigation={navigation}
          index={index}
          event={{
            ...event,
            data: {
              type: 'list'
            }
          }}
          collection={
            $.userCollectionsMap[String(item.id).replace('/subject/', '')]
          }
          {...item}
        >
          {!index && <Heatmap id='用户标签.跳转' />}
        </ItemSearch>
      )
    }

    const needResetMarginLeft = _.isPad && index % 4 === 0
    return (
      <ItemCollectionsGrid
        style={
          needResetMarginLeft && {
            marginLeft: _.wind + _._wind
          }
        }
        navigation={navigation}
        index={index}
        event={{
          ...event,
          data: {
            type: 'grid'
          }
        }}
        collection={
          $.userCollectionsMap[String(item.id).replace('/subject/', '')]
        }
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { hide } = $.state
    if (hide) {
      return null
    }

    const { _loaded } = $.tag
    if (!_loaded) {
      return <Loading />
    }

    const { list } = $.state
    const numColumns = list ? undefined : 4
    return (
      <ListView
        key={String(numColumns)}
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        numColumns={numColumns}
        data={$.tag}
        scrollToTop
        renderItem={this.renderItem}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
      />
    )
  }
}
