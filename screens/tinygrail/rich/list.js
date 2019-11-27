/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-27 20:00:11
 */
import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
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
  const title = $.title(index)

  // top100 余额最多处理
  let data = rich
  if (title === '价值最多') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => b.assets - a.assets)
  } else if (title === '余额最多') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => b.total - a.total)
  } else if (title === '初始最多') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => b.principal - a.principal)
  }
  return (
    <ListView
      style={_.container.flex}
      keyExtractor={item => String(item.userId)}
      data={data}
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
