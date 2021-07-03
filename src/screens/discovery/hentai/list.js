/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 07:43:07
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Filter from './filter'
import Item from './item'
import ItemGrid from './item-grid'

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
        numColumns={$.isList ? undefined : num}
        data={data}
        lazy={9}
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
