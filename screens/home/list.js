/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-03 12:28:13
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'
import Item from './item'

const List = ({ title }, { $ }) => {
  const { top } = $.state
  const topMap = {}
  top.forEach((subjectId, order) => (topMap[subjectId] = order + 1))

  let { userCollection } = $
  const type = MODEL_SUBJECT_TYPE.getValue(title)
  if (type) {
    userCollection = userCollection.filter(item => item.subject.type == type)
  }
  userCollection = userCollection
    // 上映日期
    .sort(
      (a, b) =>
        String(b.subject.air_date).replace(/-/g, '') -
        String(a.subject.air_date).replace(/-/g, '')
    )
    // 放送中
    .sort((a, b) => $.getIsToday(b.subject_id) - $.getIsToday(a.subject_id))
    // 置顶, 数组位置越大排越前
    .sort((a, b) => (topMap[b.subject_id] || 0) - (topMap[a.subject_id] || 0))

  return (
    <ScrollView style={_.container.flex}>
      <View style={_.container.outer}>
        {userCollection.map(item => (
          <Item
            key={item.subject_id}
            top={topMap[item.subject_id] !== undefined}
            subjectId={item.subject_id}
            subject={item.subject}
            epStatus={item.ep_status}
          />
        ))}
      </View>
    </ScrollView>
  )
}

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
