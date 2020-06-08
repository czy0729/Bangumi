/*
 * @Author: czy0729
 * @Date: 2020-01-09 15:17:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 11:20:32
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import ItemAdvance from '../_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.advanceBidList
  if (!_loaded) {
    return <Loading style={_.container.flex} />
  }

  const event = {
    id: '买一推荐.跳转',
    data: {
      userId: $.myUserId
    }
  }
  const renderItem = ({ item, index }) => (
    <ItemAdvance index={index} event={event} {...item} />
  )

  return (
    <ListView
      style={_.container.flex}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={$.advanceBidList}
      renderItem={renderItem}
      onHeaderRefresh={$.fetchAdvanceBidList}
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
