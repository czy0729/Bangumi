/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:02:15
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { SectionHeader, ItemTimeline } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'

const event = {
  id: '空间.跳转',
  data: {
    from: '时间胶囊'
  }
}

export default
@obc
class TimelineList extends React.Component {
  renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader>{title}</SectionHeader>
  )

  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <ItemTimeline
        navigation={navigation}
        index={index}
        event={event}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    if (!$.usersTimeline._loaded) {
      return <Loading />
    }
    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.usersTimeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        animated
        onFooterRefresh={$.fetchUsersTimeline}
        {...this.props}
      />
    )
  }
}
