/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 04:33:10
 */
import React from 'react'
import { View } from 'react-native'
import { Input } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Filter(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { filter } = $.state
  const { list } = $.friends
  return (
    <View style={styles.filter}>
      <Input
        style={styles.input}
        clearButtonMode='never'
        value={filter}
        placeholder={`${list.length}个好友`}
        onChangeText={$.onFilterChange}
      />
    </View>
  )
}

export default obc(Filter)
