/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 03:01:35
 */
import React from 'react'
import { View } from 'react-native'
import { Input, Loading } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Filter(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.filter}>
      <Input
        style={styles.input}
        clearButtonMode='never'
        defaultValue={$.state.filter}
        placeholder={`${$.friends.list.length}个好友`}
        onChangeText={$.onFilterChange}
      />
      {$.state.fetching && (
        <View style={styles.loading}>
          <Loading.Medium color={_.colorSub} size={16} />
        </View>
      )}
    </View>
  )
}

export default obc(Filter, COMPONENT)
