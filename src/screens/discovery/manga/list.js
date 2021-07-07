/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-07 13:44:47
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { Filter } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'
import ItemGrid from './item-grid'
import { filterDS } from './ds'

const num = 3

export default
@obc
class List extends React.Component {
  connectRef = ref => {
    const { $ } = this.context
    if (ref && ref.scrollToOffset) {
      $.scrollToOffset = ref.scrollToOffset
    }
  }

  renderItem = ({ item, index }) => {
    if (index > 500) return null

    const { $ } = this.context
    const { layout } = $.state
    if (layout === 'list') return <Item pickIndex={item} index={index} />
    return <ItemGrid pickIndex={item} index={index} num={num} />
  }

  renderFilter() {
    return <Filter filterDS={filterDS} name='漫画' type='Manga' />
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

    return (
      <ListView
        key={layout}
        ref={this.connectRef}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        numColumns={$.isList ? undefined : num}
        data={data}
        lazy={9}
        ListHeaderComponent={this.renderFilter()}
        renderItem={this.renderItem}
        scrollToTop
      />
    )
  }
}

export function keyExtractor(item) {
  return String(item)
}
