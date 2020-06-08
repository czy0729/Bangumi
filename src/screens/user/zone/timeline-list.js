/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-14 22:22:51
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { SectionHeader, ItemTimeline } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'

const event = {
  id: '空间.跳转',
  data: {
    from: '时间胶囊'
  }
}

export default
@observer
class TimelineList extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

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
