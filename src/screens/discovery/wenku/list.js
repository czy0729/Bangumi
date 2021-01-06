/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-06 17:52:57
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _ } from '@stores'
import Filter from './filter'
import Item from './item'
import ItemGrid from './item-grid'

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

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
    const { layout, data } = $.state
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
