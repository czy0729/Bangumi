/*
 * @Author: czy0729
 * @Date: 2019-04-26 20:31:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-27 01:32:15
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, Flex, Touchable, Image } from '@components'
import { SectionHeader } from '@screens/_'
import { colorBg } from '@styles'
import Item from './item'

const List = (props, { $ }) => {
  const { expand } = $.state
  const sections = []
  $.userCollections.list.forEach(item => {
    sections.push({
      title: item.status,
      count: item.count,
      data: [
        {
          list: item.list
        }
      ]
    })
  })
  return (
    <ListView
      style={{
        backgroundColor: colorBg
      }}
      keyExtractor={item => item.id}
      sections={sections}
      renderSectionHeader={({ section: { title, count } }) => (
        <SectionHeader
          style={{ backgroundColor: colorBg }}
          size={14}
          right={
            <Touchable onPress={() => $.toggleSection(title)}>
              <Image
                src={
                  expand[title]
                    ? require('@assets/images/icon/down-default.png')
                    : require('@assets/images/icon/up-default.png')
                }
                size={18}
                placeholder={false}
              />
            </Touchable>
          }
        >
          {title} ({count})
        </SectionHeader>
      )}
      renderItem={({ item, section: { title } }) => {
        if (!expand[title]) {
          return null
        }
        return (
          <Flex wrap='wrap' align='start'>
            {item.list.map(item => (
              <Item
                key={item.id}
                subjectId={item.id}
                images={item.images}
                name={item.name_cn || item.name}
              />
            ))}
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
