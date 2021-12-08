/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:55:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 13:40:04
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemSearch, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor, x18s } from '@utils/app'
import { TEXT_18X } from '@constants/text'

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
    if ($.tag.list.length < 24) return false

    return $.fetchTag()
  }

  get num() {
    return _.num(3, 5)
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
          collection={$.userCollectionsMap[String(item.id).replace('/subject/', '')]}
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
        event={{
          ...event,
          data: {
            type: 'grid'
          }
        }}
        collection={$.userCollectionsMap[String(item.id).replace('/subject/', '')]}
        num={this.num}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { hide } = $.state
    if (hide) return null

    const { _loaded } = $.tag
    if (!_loaded) return <Loading />

    const { list } = $.state
    const numColumns = list ? undefined : this.num
    return (
      <ListView
        key={String(numColumns)}
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        numColumns={numColumns}
        data={$.tag}
        scrollToTop
        footerEmptyDataText={x18s($.params.tag) ? TEXT_18X : undefined}
        renderItem={this.renderItem}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
      />
    )
  }
}
