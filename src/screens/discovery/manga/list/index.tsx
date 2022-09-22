/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 23:24:04
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2, Filter } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from '../item'
import ItemGrid from '../item-grid'
import { filterDS } from '../ds'
import { Ctx } from '../types'

class List extends React.Component {
  connectRef = (ref: { scrollToOffset: any }) => {
    const { $ }: Ctx = this.context
    if (ref && ref.scrollToOffset) $.scrollToOffset = ref.scrollToOffset
  }

  get num() {
    return _.portrait(3, 5)
  }

  renderItem = ({ item, index }) => {
    if (index > 400) return null

    const { $ }: Ctx = this.context
    const { layout } = $.state
    if (layout === 'list') return <Item pickIndex={item} index={index} />

    return <ItemGrid pickIndex={item} index={index} num={this.num} />
  }

  renderFilter() {
    return (
      <Filter
        filterDS={filterDS}
        name='漫画'
        type='Manga'
        lastUpdate='2022-09'
        information={`本页数据最后快照于 2022-09-23，在版本更新前数据不会有任何变化。
        \n本页数据非来源自 bgm.tv，而是作者从互联网上，花了很大功夫经过筛选优化后，得到的与 bgm.tv 相应条目对应的数据。
        \n有比 bgm.tv 更准确的分类、更丰富的筛选和排序。
        \n目前本功能对所有用户开放，非高级会员在一个条件下会有最多只显示前 100 条数据的限制。
        \n本页面只要存在的条目，均有其对应的源头。整理不易，若觉得有用可以通过各种方式给与鼓励支持!`}
      />
    )
  }

  render() {
    const { $ }: Ctx = this.context
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
        data={data.list}
        limit={9}
        ListHeaderComponent={this.renderFilter()}
        renderItem={this.renderItem}
        scrollToTop
        onPage={$.onPage}
      />
    )
  }
}

export default obc(List)

export function keyExtractor(item: any) {
  return String(item)
}
