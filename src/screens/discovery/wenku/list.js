/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-03 05:36:06
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

  render() {
    const { $ } = this.context
    const { layout, data } = $.state
    return (
      <ListView
        key={layout}
        ref={ref => {
          if (ref && ref.scrollToOffset) {
            $.scrollToOffset = ref.scrollToOffset
          }
        }}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        numColumns={$.isList ? undefined : 4}
        data={data}
        ListHeaderComponent={<Filter />}
        renderItem={props => renderItem(props, layout)}
        scrollToTop
      />
    )
  }
}

export function keyExtractor(item) {
  return String(item)
}

function renderItem({ item, index }, layout) {
  if (layout === 'list') {
    return <Item pickIndex={item} index={index} />
  }

  return <ItemGrid pickIndex={item} />
}
