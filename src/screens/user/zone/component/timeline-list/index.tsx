/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-03 01:15:02
 */
import React from 'react'
import { Animated } from 'react-native'
import { ListView, Loading } from '@components'
import { ItemTimeline, SectionHeader, TapListener } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { STORYBOOK } from '@constants'
import { Fn } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
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
    const { $ } = this.context as Ctx
    const index = TABS.findIndex(item => item.title === '时间线')
    return $.connectRef(ref, index)
  }

  renderSectionHeader = ({ section: { title } }) => <SectionHeader>{title}</SectionHeader>

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context as Ctx
    return (
      <ItemTimeline
        navigation={navigation}
        index={index}
        event={EVENT}
        {...item}
        full
        onDelete={$.doDelete}
      />
    )
  }

  render() {
    r(COMPONENT)

    const { $ } = this.context as Ctx
    if (!$.usersTimeline._loaded) return <Loading style={styles.loading} />

    const { onScroll } = this.props
    return (
      <TapListener>
        <ListView
          ref={this.connectRef}
          contentContainerStyle={!STORYBOOK && _.container.bottom}
          keyExtractor={keyExtractor}
          data={$.usersTimeline}
          sectionKey='date'
          stickySectionHeadersEnabled={false}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          animated
          onFooterRefresh={() => $.fetchUsersTimeline()}
          {...this.props}
          onScroll={
            STORYBOOK
              ? undefined
              : Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: {
                          y: $.scrollY
                        }
                      }
                    }
                  ],
                  {
                    useNativeDriver: true,
                    listener: onScroll
                  }
                )
          }
        />
      </TapListener>
    )
  }
}

export default obc(TimelineList)
