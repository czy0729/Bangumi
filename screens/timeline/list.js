/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-19 19:44:06
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { SectionHeader, TimelineItem } from '@screens/_'
import { MODEL_TIMELINE_TYPE } from '@constants/model'

const List = ({ title }, { $, navigation }) => {
  const { scope } = $.state
  const timeline = $.getTimeline(scope, MODEL_TIMELINE_TYPE.getValue(title))
  if (!timeline._loaded) {
    return <Loading />
  }

  return (
    <ListView
      keyExtractor={item => item.id}
      section='date'
      data={timeline}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader>{title}</SectionHeader>
      )}
      renderItem={({ item, index }) => (
        <TimelineItem
          key={item.id}
          index={index}
          navigation={navigation}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchTimeline(true)}
      onFooterRefresh={$.fetchTimeline}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)
