/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 03:45:27
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex } from '@ant-design/react-native'
import { Text } from '@components'
import _ from '@styles'
import Item from './item'

const List = (props, { $ }) => {
  let day = new Date().getDay()
  if (day === 0) day = 7
  const sortCalendar = $.calendar
    .slice(day - 1)
    .concat($.calendar.slice(0, day - 1))

  return (
    <ScrollView
      style={_.container.flex}
      contentContainerStyle={_.container.content}
    >
      <View style={_.container.outer}>
        {sortCalendar.map(item => (
          <View key={item.weekday.cn}>
            <Text size={24}>{item.weekday.cn}</Text>
            <Flex style={_.mt.md} wrap='wrap' align='start'>
              {item.items
                .sort((a, b) => {
                  // 尝试优化一下排序, 以引导用户关注到更好看的番
                  // @todo 寻找更好的算法
                  let scoreA = 0
                  let scoreB = 0
                  if (a.rating && a.rating.score) {
                    scoreA =
                      a.rating.score * 0.6 + Math.min(a.rating.total * 0.004, 4)
                  }
                  if (b.rating && b.rating.score) {
                    scoreB =
                      b.rating.score * 0.6 + Math.min(b.rating.total * 0.004, 4)
                  }
                  return scoreB - scoreA
                })
                .map((i, idx) => (
                  <Item
                    key={i.id}
                    index={idx}
                    subjectId={i.id}
                    images={i.images}
                    name={i.name_cn || i.name}
                  />
                ))}
            </Flex>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
