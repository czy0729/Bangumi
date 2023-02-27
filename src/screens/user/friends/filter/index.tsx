/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 03:55:43
 */
import React from 'react'
import { View } from 'react-native'
import { Input, Loading } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Filter(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { fetching, filter } = $.state
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
      {fetching && (
        <View style={styles.loading}>
          <Loading.Medium color={_.colorSub} size={16} />
        </View>
      )}
    </View>
  )
}

export default obc(Filter)
