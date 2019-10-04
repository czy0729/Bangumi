/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-04 14:14:47
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import _ from '@styles'
import Item from '../_/item'
import { sortList } from '../_/utils'

function List({ index }, { $ }) {
  const { chara, ico, _loaded } = $.myCharaAssets
  if (!_loaded) {
    return <Loading style={_.container.flex} />
  }

  const type = index === 0 ? 'chara' : 'ico'
  const isChara = type === 'chara'

  const { sort, direction } = $.state
  let _chara = chara
  if (isChara && sort) {
    _chara = {
      ...chara,
      list: sortList(sort, direction, chara.list)
    }
  }

  return (
    <ListView
      style={_.container.flex}
      keyExtractor={(item, index) => String(index)}
      data={isChara ? _chara : ico}
      renderItem={({ item, index }) => (
        <Item
          index={index}
          {...item}
          type={type}
          users={type === 'ico' ? 'ico' : undefined} // 这里api有bug
        />
      )}
      onHeaderRefresh={() => $.fetchMyCharaAssets()}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
