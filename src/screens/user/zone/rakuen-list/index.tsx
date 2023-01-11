/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:05:03
 */
import React from 'react'
import { Loading, ListView, Text, Heatmap } from '@components'
import { SectionHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Fn } from '@types'
import RakuenItem from '../rakuen-item'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { styles } from './styles'
import { Animated } from 'react-native'

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
    const { $ }: Ctx = this.context
    const index = TABS.findIndex(item => item.title === '超展开')
    return $.connectRef(ref, index)
  }

  toQiafan = () => {
    const { navigation }: Ctx = this.context
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
    const { navigation }: Ctx = this.context
    return (
      <RakuenItem navigation={navigation} index={index} event={EVENT} {...item}>
        {!index && <Heatmap id='空间.跳转' to='Topic' alias='帖子' />}
      </RakuenItem>
    )
  }

  render() {
    const { $ }: Ctx = this.context
    const { timeout } = $.state
    if (!$.userTopicsFormCDN._loaded) {
      return (
        <Loading style={styles.loading}>
          {timeout && <Text style={_.mt.md}>查询超时，TA可能没有发过帖子</Text>}
        </Loading>
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

    const { onScroll } = this.props
    return (
      <ListView
        ref={this.connectRef}
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.userTopicsFormCDN}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        animated
        ListFooterComponent={ListFooterComponent}
        onFooterRefresh={$.fetchUsersTimeline}
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
}

export default obc(RakuenList)

function keyExtractor(item) {
  return String(item.id)
}
