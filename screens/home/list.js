/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 18:15:04
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

  // 置顶排序
  const { top } = $.state
  const topMap = {}
  top.forEach((subjectId, order) => (topMap[subjectId] = order + 1))

  const _userCollection = {
    ...$.userCollection
  }
  const type = MODEL_SUBJECT_TYPE.getValue(title)
  if (type) {
    _userCollection.list = _userCollection.list.filter(
      item => item.subject.type == type
    )
  }
  _userCollection.list = _userCollection.list
    // 上映日期
    .sort(
      (a, b) =>
        String(b.subject.air_date).replace(/-/g, '') -
        String(a.subject.air_date).replace(/-/g, '')
    )
    // 放送中
    .sort((a, b) => $.isToday(b.subject_id) - $.isToday(a.subject_id))
    // 置顶, 数组位置越大排越前
    .sort((a, b) => (topMap[b.subject_id] || 0) - (topMap[a.subject_id] || 0))

  return (
    <ListView
      style={_.container.outer}
      keyExtractor={item => String(item.subject_id)}
      data={_userCollection}
      renderItem={({ item }) => (
        <Item
          top={topMap[item.subject_id] !== undefined}
          subjectId={item.subject_id}
          subject={item.subject}
          epStatus={item.ep_status}
        />
      )}
      ListFooterComponent={null}
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
