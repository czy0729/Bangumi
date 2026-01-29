/*
 * @Author: czy0729
 * @Date: 2024-01-07 16:23:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:42
 */
import React from 'react'
import { ListView, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { handleToQiafan, keyExtractor, renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function RakuenList() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { _loaded, _filter = 0 } = $.userTopicsFromCDN
    if (!_loaded) {
      return (
        <Loading style={styles.nestScrollLoading}>
          {$.state.timeout && <Text style={_.mt.md}>查询超时，TA可能没有发过帖子</Text>}
        </Loading>
      )
    }

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
        nestedScrollEnabled
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.nestScroll}
        sectionKey='date'
        data={$.userTopicsFromCDN}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
      />
    )
  })
}

export default RakuenList
