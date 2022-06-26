/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-26 15:02:40
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { Filter } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { getVersion, VERSION_MANGA } from '@constants/cdn'
import Item from './item'
import ItemGrid from './item-grid'
import { filterDS } from './ds'

class List extends React.Component {
  connectRef = ref => {
    const { $ } = this.context
    if (ref && ref.scrollToOffset) $.scrollToOffset = ref.scrollToOffset
  }

  get num() {
    return _.portrait(3, 5)
  }

  renderItem = ({ item, index }) => {
    if (index > 400) return null

    const { $ } = this.context
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
        lastUpdate={getVersion('VERSION_MANGA', VERSION_MANGA)}
      />
    )
  }

  render() {
    const { $ } = this.context
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
      <ListView
        key={`${layout}${numColumns}`}
        ref={this.connectRef}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        data={data}
        lazy={9}
        ListHeaderComponent={this.renderFilter()}
        renderItem={this.renderItem}
        scrollToTop
      />
    )
  }
}

export default obc(List)

export function keyExtractor(item) {
  return String(item)
}
