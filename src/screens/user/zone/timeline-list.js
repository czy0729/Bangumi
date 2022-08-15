/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 17:38:10
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { SectionHeader, ItemTimeline } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { TABS } from './ds'

const event = {
  id: '空间.跳转',
  data: {
    from: '时间胶囊'
  }
}

class TimelineList extends React.Component {
  connectRef = ref => {
    const { $ } = this.context
    const index = TABS.findIndex(item => item.title === '时间胶囊')
    return $.connectRef(ref, index)
  }

  renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader>{title}</SectionHeader>
  )

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    return (
      <ItemTimeline
        navigation={navigation}
        index={index}
        event={event}
        {...item}
        onDelete={$.doDelete}
      />
    )
  }

  render() {
    const { $ } = this.context
    if (!$.usersTimeline._loaded) return <Loading style={styles.loading} />

    return (
      <ListView
        ref={this.connectRef}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.usersTimeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        animated
        onFooterRefresh={() => $.fetchUsersTimeline()}
        {...this.props}
      />
    )
  }
}

export default obc(TimelineList)

const styles = _.create({
  loading: {
    marginTop: _.window.height / 3
  }
})
