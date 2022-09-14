/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 20:35:40
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
      <Filter filterDS={filterDS} name='Hentai' type='Hentai' lastUpdate='2022-09' />
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
        limit={12}
        ListHeaderComponent={this.renderFilter()}
        renderItem={this.renderItem}
        scrollToTop
      />
    )
  }
}

export default obc(List)

export function keyExtractor(item: any) {
  return String(item)
}
