/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:48:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 14:01:12
 */
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { _ } from '@stores'
import { Text, TextType } from '../text'

type Props = {
  /** Tab 文字 */
  value: string

  /** <Text> type */
  type?: TextType

  /** <Text> size */
  size?: number

  /** 是否启用 */
  enabled?: boolean

  /** 是否选择 */
  selected?: boolean

  /** 选择回调 */
  onSelect?: () => any
}

const hitSlop = {
  top: _.device(3, 4),
  right: _.device(2, 4),
  bottom: _.device(3, 4),
  left: _.device(2, 4)
}

export const SegmentedControlTab = ({
  value,
  type = 'title',
  size = 14,
  enabled,
  selected,
  onSelect
}: Props) => (
  <TouchableOpacity
    style={styles.container}
    disabled={!enabled}
    hitSlop={hitSlop}
    onPress={onSelect}
  >
    <View style={styles.default}>
      <Text type={type} size={size} bold={selected}>
        {value}
      </Text>
    </View>
  </TouchableOpacity>
)

const styles = _.create({
  container: {
    flex: 1,
    borderRadius: 5
  },
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5
  },
  activeText: {
    fontWeight: '800'
  }
})
