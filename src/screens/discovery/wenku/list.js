/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-15 17:08:11
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Filter from './filter'
import Item from './item'
import ItemGrid from './item-grid'

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
    return layout === 'list' ? (
      <Item pickIndex={item} index={index} />
    ) : (
      <ItemGrid pickIndex={item} />
    )
  }

  render() {
    const { $ } = this.context
    const { _loaded, layout, data } = $.state
    if (!_loaded && !data._loaded) {
      return (
        <>
          <Filter />
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
        numColumns={$.isList ? undefined : 3}
        data={data}
        ListHeaderComponent={<Filter />}
        renderItem={this.renderItem}
        scrollToTop
      />
    )
  }
}

export function keyExtractor(item) {
  return String(item)
}
