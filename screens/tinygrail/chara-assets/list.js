/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-04 03:36:01
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import _ from '@styles'
import Item from '../_/item'

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
    const base = direction === 'down' ? 1 : -1
    switch (sort) {
      case 'cgs':
        _chara = {
          ...chara,
          list: chara.list.sort((a, b) => (b.state - a.state) * base)
        }
        break
      case 'ccjz':
        _chara = {
          ...chara,
          list: chara.list.sort(
            (a, b) => (b.state * b.current - a.state * a.current) * base
          )
        }
        break
      case 'czsj':
        _chara = {
          ...chara,
          list: chara.list.sort(
            (a, b) => b.lastOrder.localeCompare(a.lastOrder) * base
          )
        }
        break
      case 'fhze':
        _chara = {
          ...chara,
          list: chara.list.sort(
            (a, b) => (b.marketValue - a.marketValue) * base
          )
        }
        break
      case 'fhl':
        _chara = {
          ...chara,
          list: chara.list.sort((a, b) => (b.total - a.total) * base)
        }
        break
      case 'dqj':
        _chara = {
          ...chara,
          list: chara.list.sort((a, b) => (b.current - a.current) * base)
        }
        break
      case 'dqzd':
        _chara = {
          ...chara,
          list: chara.list.sort(
            (a, b) => (b.fluctuation || 0 - a.fluctuation || 0) * base
          )
        }
        break
      case 'xfjl':
        _chara = {
          ...chara,
          list: chara.list.sort(
            (a, b) => (parseInt(b.bonus || 0) - parseInt(a.bonus || 0)) * base
          )
        }
        break
      default:
        break
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
