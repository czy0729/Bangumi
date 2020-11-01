/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-29 11:40:36
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import ItemAdvance from '../_/item-advance'
import { levelList } from '../_/utils'

function List(props, { $ }) {
  const { _loaded } = $.advanceAuctionList
  if (!_loaded) {
    return (
      <Loading
        style={_.container.flex}
        color={_.colorTinygrailText}
      />
    )
  }

  const event = {
    id: '竞拍推荐.跳转',
    data: {
      userId: $.myUserId,
      type: 1
    }
  }

  const { level } = $.state
  let _list = $.advanceAuctionList
  if (level) {
    _list = {
      ..._list,
      list: levelList(
        level,
        _list.list.map((item, index) => ({
          ...item,
          _index: index
        }))
      )
    }
  }

  return (
    <ListView
      style={_.container.flex}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={_list}
      renderItem={({ item, index }) => (
        <ItemAdvance
          index={item._index || index}
          event={event}
          isAuctioning={$.auctioningMap[item.id]}
          assets={$.myCharaAssetsMap[item.id]}
          {...item}
        />
      )}
      onHeaderRefresh={$.fetchAdvanceAuctionList}
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
