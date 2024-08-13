/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 16:13:40
 */
import React from 'react'
import { Animated } from 'react-native'
import { Heatmap, ListView, Loading, ScrollView, Text } from '@components'
import { SectionHeader } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { SHARE_MODE, STORYBOOK, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import RakuenItem from './rakuen-item'
import { handleToQiafan } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

class RakuenList extends React.Component<Props> {
  connectRef = ref => {
    const { $ } = this.context as Ctx
    const index = TABS.findIndex(item => item.title === '超展开')
    return $.connectRef(ref, index)
  }

  renderSectionHeader = ({ section: { title } }) => <SectionHeader size={14}>{title}</SectionHeader>

  renderItem = ({ item, index }) => {
    const { navigation } = this.context as Ctx
    return (
      <RakuenItem navigation={navigation} index={index} {...item}>
        {!index && <Heatmap id='空间.跳转' to='Topic' alias='帖子' />}
      </RakuenItem>
    )
  }

  render() {
    r(COMPONENT)

    if (SHARE_MODE) {
      return (
        <Loading style={styles.loading}>
          <Text style={_.mt.md}>网页端不支持此功能</Text>
        </Loading>
      )
    }

    const { $, navigation } = this.context as Ctx
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
            useNativeDriver: USE_NATIVE_DRIVER,
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
            <Text type='warning' size={12} onPress={() => handleToQiafan(navigation)}>
              高级会员
            </Text>
            显示所有
          </Text>
        </>
      ) : undefined

    return (
      <ListView
        ref={this.connectRef}
        contentContainerStyle={stl(styles.contentContainerStyle, !STORYBOOK && _.container.bottom)}
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
