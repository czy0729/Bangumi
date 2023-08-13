/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 16:44:00
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2, Filter } from '@_'
import { _, otaStore } from '@stores'
import { obc } from '@utils/decorators'
import Item from '../item'
import ItemGrid from '../item-grid'
import { ADVANCE_LIMIT, filterDS } from '../ds'
import { Ctx } from '../types'

class List extends React.Component {
  connectRef = (ref: { scrollToOffset: any }) => {
    const { $ } = this.context as Ctx
    if (ref && ref.scrollToOffset) $.scrollToOffset = ref.scrollToOffset
  }

  get num() {
    return _.portrait(3, 5)
  }

  renderItem = ({ item: pickIndex, index }) => {
    const { $ } = this.context as Ctx
    const { layout } = $.state
    if (layout === 'list') return <Item pickIndex={pickIndex} index={index} />

    return <ItemGrid pickIndex={pickIndex} index={index} num={this.num} />
  }

  renderFilter() {
    return (
      <Filter
        filterDS={filterDS}
        name='文库'
        type='文库'
        lastUpdate='2022-09'
        information={`数据最后快照于 2022-09-20，在版本更新前数据不会有任何变化，轻小说因变化频率较低预计半年更新一次。
        \n本页数据非来源自 bgm.tv，并非所有条目都进行了收录。
        \n有比 bgm.tv 更准确的分类、更丰富的筛选和更多的排序。
        \n目前本功能对所有用户开放，非高级会员在一个条件下会有最多只显示前 ${ADVANCE_LIMIT} 条数据的限制。
        \n整理不易，若觉得有用可以通过各种方式给与鼓励支持!`}
      />
    )
  }

  render() {
    const { $ } = this.context as Ctx
    const { _loaded, layout, data } = $.state
    if (!_loaded && !data._loaded) {
      return (
        <>
          {this.renderFilter()}
          <Loading />
        </>
      )
    }

    const numColumns = $.isList ? undefined : this.num
    return (
      <PaginationList2
        key={`${layout}${numColumns}`}
        keyExtractor={keyExtractor}
        connectRef={this.connectRef}
        contentContainerStyle={_.container.bottom}
        numColumns={numColumns}
        data={$.list}
        limit={9}
        ListHeaderComponent={this.renderFilter()}
        renderItem={this.renderItem}
        scrollToTop
        onPage={otaStore.onWenkuPage}
      />
    )
  }
}

export default obc(List)

export function keyExtractor(item: any) {
  return String(item)
}
