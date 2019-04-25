/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 14:50:56
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'
import Item from './item'

const List = ({ title }, { $ }) => {
  if (!$.userCollection._loaded) {
    return <Loading />
  }

  const { top } = $.state

  // 筛选当前类型
  const _userCollection = {
    ...$.userCollection
  }
  const type = MODEL_SUBJECT_TYPE.getValue(title)
  if (type) {
    _userCollection.list = _userCollection.list.filter(
      item => item.subject.type == type
    )
  }
  _userCollection.list = $.sortList(_userCollection.list)

  return (
    <ListView
      contentContainerStyle={_.container.outer}
      keyExtractor={item => String(item.subject_id)}
      data={_userCollection}
      renderItem={({ item }) => (
        <Item
          top={top.indexOf(item.subject_id) !== -1}
          subjectId={item.subject_id}
          subject={item.subject}
          epStatus={item.ep_status}
        />
      )}
      ListFooterComponent={null}
      onHeaderRefresh={() => $.initFetch(true)}
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
