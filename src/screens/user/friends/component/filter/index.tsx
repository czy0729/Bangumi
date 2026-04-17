/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 10:54:37
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Input, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Filter() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { fetching, percent } = $.state

  return (
    <View style={styles.filter}>
      <Input
        style={styles.input}
        clearButtonMode='never'
        defaultValue={$.state.filter}
        placeholder={String($.friends.list.length || 0)}
        onChangeText={$.onFilterChange}
      />
      {fetching && (
        <Flex style={styles.loading} justify='end'>
          {!!percent && (
            <Text style={styles.percent} type={_.select('sub', 'icon')} size={11} bold>
              {percent}
            </Text>
          )}
          <Loading.Medium color={_.colorSub} size={16} />
        </Flex>
      )}
    </View>
  )
}

export default observer(Filter)
