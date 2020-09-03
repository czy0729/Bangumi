/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:41
 * @Last Modified by:   czy0729
 * @Last Modified time: 2020-09-02 18:21:41
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { _ } from '@stores'
import Filter from './filter'
import Item from './item'

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  render() {
    const { $ } = this.context
    const { data } = $.state
    return (
      <ListView
        ref={ref => {
          if (ref && ref.scrollToOffset) {
            $.scrollToOffset = ref.scrollToOffset
          }
        }}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={data}
        ListHeaderComponent={<Filter />}
        renderItem={renderItem}
      />
    )
  }
}

export function keyExtractor(item) {
  return String(item)
}

function renderItem({ item, index }) {
  return <Item pickIndex={item} index={index} />
}
