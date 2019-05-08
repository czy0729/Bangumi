/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 19:21:24
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { SectionHeader, TimelineItem } from '@screens/_'
import _ from '@styles'

const TimelineList = (props, { $, navigation }) => {
  if (!$.usersTimeline._loaded) {
    return <Loading />
  }

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={item => String(item.id)}
      data={$.usersTimeline}
      sectionKey='date'
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader>{title}</SectionHeader>
      )}
      renderItem={({ item, index }) => (
        <TimelineItem navigation={navigation} index={index} {...item} />
      )}
      onFooterRefresh={$.fetchUsersTimeline}
      {...props}
    />
  )
}

TimelineList.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(TimelineList)
