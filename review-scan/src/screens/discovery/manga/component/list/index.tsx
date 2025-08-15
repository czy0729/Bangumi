/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:18:20
 */
import React from 'react'
import { Loading } from '@components'
import { Filter, PaginationList2 } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { TEXT_UPDATE_MANGA } from '@constants'
import { ADVANCE_LIMIT, filterDS } from '../../ds'
import { Ctx } from '../../types'
import Item from '../item'
import ItemGrid from '../item-grid'
import { COMPONENT } from './ds'

class List extends React.Component<Ctx> {
  connectRef = (ref: { scrollToOffset: any }) => {
    if (ref && ref.scrollToOffset) {
      const { $ } = this.props
      $.scrollToOffset = ref.scrollToOffset
    }
  }

  get num() {
    return _.portrait(3, 5)
  }

  renderItem = ({ item: pickIndex, index }) => {
    const { $ } = this.props
    if ($.isList) return <Item pickIndex={pickIndex} />

    return <ItemGrid pickIndex={pickIndex} index={index} num={this.num} />
  }

  renderFilter() {
    return (
      <Filter
        filterDS={filterDS}
        name='漫画'
        type='Manga'
        lastUpdate={TEXT_UPDATE_MANGA.slice(0, 7)}
        information={`数据最后快照于 ${TEXT_UPDATE_MANGA}，在版本更新前数据不会有任何变化，漫画因变化频率较低预计半年更新一次。
        \n本页数据非来源自 bgm.tv，而是作者从互联网上花了很大功夫，经过筛选优化后，与 bgm.tv 相应条目对应的数据。
        \n有比 bgm.tv 更准确的分类、更丰富的筛选、最后更新章节和更多的排序。
        \n目前本功能对所有用户开放，非高级会员在一个条件下会有最多只显示前 ${ADVANCE_LIMIT} 条数据的限制。
        \n本页面只要存在的条目，均有其对应的源头。整理不易若觉得有用可以通过各种方式给与鼓励支持!`}
      />
    )
  }

  render() {
    r(COMPONENT)

    const { $ } = this.props
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
        contentContainerStyle={_.container.page}
        numColumns={numColumns}
        data={$.list}
        limit={9}
        ListHeaderComponent={this.renderFilter()}
        renderItem={this.renderItem}
        onPage={$.onPage}
      />
    )
  }
}

export default ob(List)

export function keyExtractor(item: any) {
  return String(item)
}
