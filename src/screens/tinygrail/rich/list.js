/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-29 15:46:39
 */
import React from 'react'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import Item from './item'

function List({ id, title }, { $ }) {
  const rich = $.rich(id)
  if (!rich._loaded) {
    return (
      <Loading
        style={_.container.flex}
        color={_.colorTinygrailText}
      />
    )
  }

  const [page, limit] = id.split('/')

  // top100 余额最多处理
  let data = rich
  if (title === '股息') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => parseInt(b.share) - parseInt(a.share))
  } else if (title === '余额') {
    data = toJS(rich)
    data.list = data.list.sort((a, b) => parseInt(b.total) - parseInt(a.total))
  } else if (title === '初始') {
    data = toJS(rich)
    data.list = data.list.sort(
      (a, b) => parseInt(b.principal) - parseInt(a.principal)
    )
  }
  return (
    <ListView
      style={_.container.flex}
      keyExtractor={item => String(item.userId)}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={data}
      renderItem={({ item, index }) => (
        <Item
          index={index}
          title={title}
          page={parseInt(page)}
          limit={parseInt(limit)}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchRich(id)}
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
