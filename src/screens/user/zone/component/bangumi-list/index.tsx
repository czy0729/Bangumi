/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 22:09:28
 */
import React from 'react'
import { Animated } from 'react-native'
import { ListView, Loading } from '@components'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { STORYBOOK } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Footer from './footer'
import Item from './item'
import SectionHeader from './section-header'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

class BangumiList extends React.Component<Props> {
  connectRef = (ref: any) => {
    const { $ } = this.context as Ctx
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
    const { $ } = this.context as Ctx
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
    r(COMPONENT)

    const { $ } = this.context as Ctx
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
