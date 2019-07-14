/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 19:52:00
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, Flex } from '@components'
import { SectionHeader } from '@screens/_'
import { colorBg } from '@styles'
import Item from './item'

const List = (props, { $ }) => {
  const { calendarData } = $.state

  // 今天星期几的数据排最前
  let day = new Date().getDay()
  if (day === 0) {
    day = 7
  }
  const list = $.calendar.list
    .slice(day - 1)
    .concat($.calendar.list.slice(0, day - 1))

  const sections = list.map(item => ({
    title: item.weekday.cn,
    data: [item]
  }))

  return (
    <ListView
      style={{
        backgroundColor: colorBg
      }}
      keyExtractor={item => item.id}
      sections={sections}
      numColumns={3}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader style={{ backgroundColor: colorBg }} size={14}>
          {title}
        </SectionHeader>
      )}
      renderItem={({ item, title }) => (
        <Flex key={title} wrap='wrap' align='start'>
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
            .map(item => (
              <Item
                key={item.id}
                subjectId={item.id}
                images={item.images}
                name={item.name_cn || item.name}
                score={item.rating && item.rating.score}
                air={calendarData[item.id] && calendarData[item.id].air}
              />
            ))}
        </Flex>
      )}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
