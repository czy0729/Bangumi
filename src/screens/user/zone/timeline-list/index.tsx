/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-26 04:50:57
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { TapListener, SectionHeader, ItemTimeline } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Fn } from '@types'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { styles } from './styles'

const EVENT = {
  id: '空间.跳转',
  data: {
    from: '时间胶囊'
  }
} as const

class TimelineList extends React.Component<{
  ListHeaderComponent: any
  scrollEventThrottle: number
  onScroll: Fn
}> {
  connectRef = ref => {
    const { $ }: Ctx = this.context
    const index = TABS.findIndex(item => item.title === '时间线')
    return $.connectRef(ref, index)
  }

  renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader>{title}</SectionHeader>
  )

  renderItem = ({ item, index }) => {
    const { $, navigation }: Ctx = this.context
    return (
      <ItemTimeline
        navigation={navigation}
        index={index}
        event={EVENT}
        {...item}
        onDelete={$.doDelete}
      />
    )
  }

  render() {
    const { $ }: Ctx = this.context
    if (!$.usersTimeline._loaded) return <Loading style={styles.loading} />

    return (
      <TapListener>
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
      </TapListener>
    )
  }
}

export default obc(TimelineList)
