/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:44:12
 */
import React from 'react'
import { Animated } from 'react-native'
import { Loading, ListView } from '@components'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Fn } from '@types'
import { TABS } from '../ds'
import { Ctx } from '../types'
import SectionHeader from './section-header'
import Item from './item'
import Footer from './footer'
import { memoStyles } from './styles'

class BangumiList extends React.Component<{
  ListHeaderComponent: any
  scrollEventThrottle: number
  onScroll: Fn
}> {
  connectRef = (ref: any) => {
    const { $ }: Ctx = this.context
    const index = TABS.findIndex(item => item.title === '番剧')
    return $.connectRef(ref, index)
  }

  renderSectionHeader = ({ section: { title, count } }) => {
    return <SectionHeader title={title} count={count} />
  }

  renderItem = ({ item, section: { title } }) => {
    return <Item item={item} title={title} />
  }

  ListFooterComponent = () => {
    return <Footer />
  }

  get sections() {
    const { $ }: Ctx = this.context
    return $.userCollections.list.map(item => ({
      title: item.status,
      count: item.count,
      data: [
        {
          list: item.list
        }
      ]
    }))
  }

  render() {
    const { $ }: Ctx = this.context
    if (!$.userCollections._loaded) return <Loading style={this.styles.loading} />

    const { onScroll } = this.props
    return (
      <ListView
        ref={this.connectRef}
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        animated
        sections={this.sections}
        showFooter={false}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        ListFooterComponent={this.ListFooterComponent}
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
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(BangumiList)
