/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 09:47:43
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { Filter } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'
import ItemGrid from './item-grid'
import { filterDS } from './ds'

export default
@obc
class List extends React.Component {
  connectRef = ref => {
    const { $ } = this.context
    if (ref && ref.scrollToOffset) $.scrollToOffset = ref.scrollToOffset
  }

  get num() {
    return _.num(3, 5)
  }

  renderItem = ({ item, index }) => {
    if (index > 400) return null

    const { $ } = this.context
    const { layout } = $.state
    if (layout === 'list') return <Item pickIndex={item} index={index} />
    return <ItemGrid pickIndex={item} index={index} num={this.num} />
  }

  renderFilter() {
    return <Filter filterDS={filterDS} />
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
        key={`${layout}${this.num}`}
        ref={this.connectRef}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        numColumns={$.isList ? undefined : this.num}
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
