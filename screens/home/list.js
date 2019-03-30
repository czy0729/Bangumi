/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-28 01:55:54
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import _ from '@styles'
import Item from './item'

const List = (props, { $ }) => (
  <ScrollView
    style={_.container.flex}
    contentContainerStyle={_.container.content}
  >
    <View style={_.container.outer}>
      {$.userCollection
        .sort(
          (a, b) =>
            String(b.subject.air_date).replace(/-/g, '') -
            String(a.subject.air_date).replace(/-/g, '')
        )
        .map(item => (
          <Item
            key={item.subject_id}
            subjectId={item.subject_id}
            subject={item.subject}
            epStatus={item.ep_status}
          />
        ))}
    </View>
  </ScrollView>
)

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
