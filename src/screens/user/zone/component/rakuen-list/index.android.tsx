/*
 * @Author: czy0729
 * @Date: 2024-01-07 16:23:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:42
 */
import React from 'react'
import { ListView, Loading, Text } from '@components'
import { SectionHeader } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import RakuenItem from './rakuen-item'
import { handleToQiafan } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function RakuenList() {
  const { $, navigation } = useStore<Ctx>()

  // @ts-expect-error
  const { _loaded, _filter = 0 } = $.userTopicsFormCDN
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
      data={$.userTopicsFormCDN}
      sectionKey='date'
      stickySectionHeadersEnabled={false}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      ListFooterComponent={ListFooterComponent}
    />
  )
}

export default ob(RakuenList, COMPONENT)

function keyExtractor(item: { id: any }) {
  return String(item.id)
}

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader>{title}</SectionHeader>
}

function renderItem({ item, index }) {
  return <RakuenItem index={index} {...item} />
}
