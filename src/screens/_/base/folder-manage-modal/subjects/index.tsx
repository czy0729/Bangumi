/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 15:20:07
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { PaginationList2 } from '../../pagination-list-2'
import { renderItem } from './utils'
import { memoStyles } from './styles'
import { Props } from './types'

function Subjects({
  forwardRef,
  id,
  create,
  edit,
  content,
  order,
  item: pItem,
  detail,
  onChange,
  onOrder,
  onSubjectEdit,
  onSubjectControl,
  onSubmit
}: Props) {
  const styles = memoStyles()
  const { list } = detail
  const { length } = list
  const handleRenderItem = useCallback(
    ({ item, index }) =>
      renderItem({
        forwardRef,
        id,
        create,
        edit,
        content,
        order,
        pItem,
        item,
        index,
        length,
        onChange,
        onOrder,
        onSubjectEdit,
        onSubjectControl,
        onSubmit
      }),
    [
      content,
      create,
      edit,
      forwardRef,
      id,
      length,
      onChange,
      onOrder,
      onSubjectControl,
      onSubjectEdit,
      onSubmit,
      order,
      pItem
    ]
  )

  // 编辑模式下只显示编辑项
  if (edit) {
    const item = list.find(item => item.id == edit)
    if (item) return <View style={styles.subjects}>{handleRenderItem({ item, index: 0 })}</View>
  }

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      style={styles.subjects}
      data={list}
      limit={12}
      scrollEnabled={!edit}
      renderItem={handleRenderItem}
      footerNoMoreDataComponent={
        <Text style={_.mt.md} type='icon' size={12} align='center'>
          - 到底了 -
        </Text>
      }
    />
  )
}

export default ob(Subjects)
