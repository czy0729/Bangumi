/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:55:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-04 17:24:00
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import ItemAdvance from '../_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.computedList
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const event = {
    id: '卖一推荐.跳转',
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
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={$.computedList}
      renderItem={renderItem}
      onHeaderRefresh={$.fetchAdvanceList}
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
