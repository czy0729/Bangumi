/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 07:15:23
 */
import React from 'react'
import { Animated } from 'react-native'
import {
  Loading,
  ListView,
  Flex,
  Touchable,
  Text,
  Iconfont,
  Heatmap
} from '@components'
import { SectionHeader, ItemBangumiList } from '@_'
import { _, userStore } from '@stores'
import { cnjp, keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Fn, Navigation } from '@types'
import { TABS } from '../ds'
import { Ctx } from '../types'
import U from './u'
import { memoStyles } from './styles'

const EVENT = {
  id: '空间.跳转'
} as const

class BangumiList extends React.Component<{
  ListHeaderComponent: any
  scrollEventThrottle: number
  onScroll: Fn
}> {
  connectRef = ref => {
    const { $ }: Ctx = this.context
    const index = TABS.findIndex(item => item.title === '番剧')
    return $.connectRef(ref, index)
  }

  renderSectionHeader = ({ section: { title, count } }) => {
    const { $ }: Ctx = this.context
    const { expand } = $.state
    return (
      <Touchable style={this.styles.section} onPress={() => $.onToggleSection(title)}>
        <SectionHeader
          style={this.styles.sectionHeader}
          type='title'
          size={15}
          right={
            <Iconfont
              style={this.styles.arrow}
              name={expand[title] ? 'md-keyboard-arrow-down' : 'md-keyboard-arrow-up'}
            />
          }
        >
          {title}{' '}
          <Text type='sub' size={12} bold lineHeight={15}>
            {count}{' '}
          </Text>
        </SectionHeader>
        {title === '在看' && <Heatmap id='空间.展开分组' />}
      </Touchable>
    )
  }

  ListFooterComponent = ($: Ctx['$'], navigation: Navigation) => (
    <>
      <Flex style={_.mt.lg} justify='center'>
        <Touchable
          style={this.styles.touch}
          onPress={() => {
            t('空间.跳转', {
              to: 'User'
            })

            $.navigateToUser(navigation)
          }}
        >
          <Text type={_.select('desc', 'main')} bold>
            查看TA的所有收藏
          </Text>
          <Heatmap id='空间.跳转' to='User' alias='所有收藏' />
        </Touchable>
      </Flex>
      {userStore.isDeveloper && <U username={$.usersInfo.username} />}
    </>
  )

  render() {
    const { $, navigation }: Ctx = this.context
    if (!$.userCollections._loaded) return <Loading style={this.styles.loading} />

    const { onScroll } = this.props
    const { expand } = $.state
    const sections = []
    $.userCollections.list.forEach(item => {
      sections.push({
        title: item.status,
        count: item.count,
        data: [
          {
            list: item.list
          }
        ]
      })
    })

    return (
      <ListView
        ref={this.connectRef}
        contentContainerStyle={this.styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={({ item, section: { title } }) => {
          if (!expand[title]) return null

          return (
            <Flex wrap='wrap' align='start'>
              {item.list
                .filter((item, index) => index < 15)
                .map(item => (
                  <ItemBangumiList
                    key={item.id}
                    navigation={navigation}
                    subjectId={item.id}
                    images={item.images}
                    name={cnjp(item.name_cn, item.name)}
                    event={EVENT}
                  />
                ))}
              {title.includes('在看') && (
                <Heatmap id='空间.跳转' to='Subject' alias='条目' />
              )}
            </Flex>
          )
        }}
        animated
        showFooter={false}
        ListFooterComponent={() => this.ListFooterComponent($, navigation)}
        {...this.props}
        onScroll={Animated.event(
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
        )}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(BangumiList)
