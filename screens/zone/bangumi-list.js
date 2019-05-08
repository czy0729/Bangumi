/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 20:13:42
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Flex, Touchable, Iconfont } from '@components'
import { SectionHeader, BangumiListItem } from '@screens/_'
import { colorBg, colorIcon } from '@styles'

const List = (props, { $, navigation }) => {
  if (!$.userCollections._loaded) {
    return <Loading />
  }

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
      keyExtractor={item => item.id}
      sections={sections}
      renderSectionHeader={({ section: { title, count } }) => (
        <Touchable
          style={{ backgroundColor: colorBg }}
          onPress={() => $.toggleSection(title)}
        >
          <SectionHeader
            size={14}
            right={
              <Iconfont
                name={expand[title] ? 'down' : 'up'}
                color={colorIcon}
                size={18}
              />
            }
          >
            {title} ({count})
          </SectionHeader>
        </Touchable>
      )}
      renderItem={({ item, section: { title } }) => {
        if (!expand[title]) {
          return null
        }
        return (
          <Flex wrap='wrap' align='start'>
            {item.list.map(item => (
              <BangumiListItem
                key={item.id}
                navigation={navigation}
                subjectId={item.id}
                images={item.images}
                name={item.name_cn || item.name}
              />
            ))}
          </Flex>
        )
      }}
      {...props}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)
