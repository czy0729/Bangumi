/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-12 19:59:37
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, Flex } from '@components'
import { SectionHeader } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import Item from './item'
import ItemLine from './item-line'
import { marginLeft } from './store'

let day = new Date().getDay()
if (day === 0) {
  day = 7
}

function List(props, { $ }) {
  const { layout } = $.state
  return (
    <ListView
      key={layout}
      style={_.container.screen}
      keyExtractor={keyExtractor}
      sections={$.sections}
      numColumns={$.isList ? undefined : 3}
      renderSectionHeader={renderSectionHeader}
      renderItem={({ item, title }) => {
        const { items } = item
        return (
          <Flex key={title} wrap='wrap' align='start'>
            {items.map((i, index) => {
              let { timeCN } = i
              if (index > 0 && items[index - 1].timeCN === timeCN) {
                timeCN = ''
              }

              let { air } = i
              if (i.air_weekday !== day && air !== 0) {
                air = parseInt(air) + 1
              }

              if ($.isList) {
                return (
                  <ItemLine
                    key={i.id}
                    subjectId={i.id}
                    images={i.images}
                    name={i.name_cn || i.name}
                    score={i.rating && i.rating.score}
                    air={air}
                    timeCN={timeCN}
                  />
                )
              }

              return (
                <Item
                  key={i.id}
                  subjectId={i.id}
                  images={i.images}
                  name={i.name_cn || i.name}
                  score={i.rating && i.rating.score}
                  air={air}
                  timeCN={timeCN}
                />
              )
            })}
          </Flex>
        )
      }}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)

function renderSectionHeader({ section: { title } }) {
  return (
    <SectionHeader
      style={{
        paddingVertical: _.sm + 2,
        paddingLeft: marginLeft
      }}
      size={14}
    >
      {title}
    </SectionHeader>
  )
}
