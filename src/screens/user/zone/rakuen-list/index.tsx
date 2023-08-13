/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 12:09:22
 */
import React from 'react'
import { Animated } from 'react-native'
import { ScrollView, Loading, ListView, Text, Heatmap } from '@components'
import { SectionHeader } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SHARE_MODE, STORYBOOK } from '@constants'
import { Fn } from '@types'
import RakuenItem from '../rakuen-item'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { styles } from './styles'

const EVENT = {
  id: '空间.跳转',
  data: {
    from: '超展开'
  }
} as const

class RakuenList extends React.Component<{
  ListHeaderComponent: any
  scrollEventThrottle: number
  onScroll: Fn
}> {
  connectRef = ref => {
    const { $ } = this.context as Ctx
    const index = TABS.findIndex(item => item.title === '超展开')
    return $.connectRef(ref, index)
  }

  toQiafan = () => {
    const { navigation } = this.context as Ctx
    t('空间.跳转', {
      from: '高级会员',
      to: 'Qiafan'
    })

    navigation.push('Qiafan')
  }

  renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader size={14}>{title}</SectionHeader>
  )

  renderItem = ({ item, index }) => {
    const { navigation } = this.context as Ctx
    return (
      <RakuenItem navigation={navigation} index={index} event={EVENT} {...item}>
        {!index && <Heatmap id='空间.跳转' to='Topic' alias='帖子' />}
      </RakuenItem>
    )
  }

  render() {
    if (SHARE_MODE) {
      return (
        <Loading style={styles.loading}>
          <Text style={_.mt.md}>网页端不支持此功能</Text>
        </Loading>
      )
    }

    const { $ } = this.context as Ctx
    const { timeout } = $.state
    const { onScroll } = this.props
    const _onScroll = STORYBOOK
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
    if (!$.userTopicsFormCDN._loaded) {
      return (
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          animated
          onScroll={_onScroll}
        >
          <Loading style={styles.loading}>
            {timeout && <Text style={_.mt.md}>查询超时，TA可能没有发过帖子</Text>}
          </Loading>
        </ScrollView>
      )
    }

    // @ts-expect-error
    const { _filter = 0 } = $.userTopicsFormCDN
    const ListFooterComponent =
      _filter > 0 ? (
        <>
          <Text style={_.mt.md} type='sub' align='center' size={12}>
            还有{_filter}条数据未显示
          </Text>
          <Text style={_.mt.xs} type='sub' align='center' size={12}>
            <Text type='warning' size={12} onPress={this.toQiafan}>
              高级会员
            </Text>
            显示所有
          </Text>
        </>
      ) : undefined

    return (
      <ListView
        ref={this.connectRef}
        contentContainerStyle={stl(
          styles.contentContainerStyle,
          !STORYBOOK && _.container.bottom
        )}
        keyExtractor={keyExtractor}
        data={$.userTopicsFormCDN}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        animated
        ListFooterComponent={ListFooterComponent}
        onScroll={_onScroll}
        onFooterRefresh={$.fetchUsersTimeline}
        {...this.props}
      />
    )
  }
}

export default obc(RakuenList)

function keyExtractor(item) {
  return String(item.id)
}
