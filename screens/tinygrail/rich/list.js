/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-16 21:08:31
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import _ from '@styles'
import Item from './item'

function List({ index }, { $ }) {
  const key = $.key(index)
  const rich = $.rich(key)
  if (!rich._loaded) {
    return <Loading style={_.container.flex} />
  }

  const [page, limit] = key.split('/')
  return (
    <ListView
      style={_.container.flex}
      keyExtractor={item => String(item.userId)}
      data={rich}
      renderItem={({ item, index }) => (
        <Item
          index={index}
          page={parseInt(page)}
          limit={parseInt(limit)}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchRich(key)}
    />
  )
}

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
