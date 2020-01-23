/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 18:08:31
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, Flex } from '@components'
import { SectionHeader } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import Item from './item'
import { marginLeft } from './store'

function List(props, { $ }) {
  return (
    <ListView
      style={_.container.screen}
      keyExtractor={keyExtractor}
      sections={$.sections}
      numColumns={4}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
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
        paddingLeft: marginLeft
      }}
      size={14}
    >
      {title}
    </SectionHeader>
  )
}

function renderItem({ item, title }) {
  return (
    <Flex key={title} wrap='wrap' align='start'>
      {item.items.sort(sort).map(item => (
        <Item
          key={item.id}
          subjectId={item.id}
          images={item.images}
          name={item.name_cn || item.name}
          score={item.rating && item.rating.score}
        />
      ))}
    </Flex>
  )
}

/**
 * 尝试优化一下排序, 以引导用户关注到更好看的番
 * @todo 寻找更好的算法
 */
function sort(a, b) {
  let scoreA = 0
  let scoreB = 0
  if (a.rating && a.rating.score) {
    scoreA = a.rating.score * 0.6 + Math.min(a.rating.total * 0.004, 4)
  }
  if (b.rating && b.rating.score) {
    scoreB = b.rating.score * 0.6 + Math.min(b.rating.total * 0.004, 4)
  }
  return scoreB - scoreA
}
