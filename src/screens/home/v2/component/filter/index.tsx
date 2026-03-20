/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:14:44
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Input, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Filter({ title, length }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [focus, setFocus] = useState(false)

  const handleFocus = useCallback(() => setFocus(true), [])
  const handleBlur = useCallback(() => setFocus(false), [])

  const styles = memoStyles()

  const filter = $.filterValue(title)
  const showPlaceholder = !focus && !filter

  return (
    <View style={styles.filter}>
      <Input
        style={styles.input}
        defaultValue={filter}
        clearButtonMode='never'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={$.onFilterChange}
      />

      {showPlaceholder && (
        <Flex style={styles.icon} justify='center' pointerEvents='none'>
          {$.state.progress.fetching && (
            <View style={styles.loading}>
              <Loading.Medium color={_.colorSub} size={16} />
            </View>
          )}
          {length ? (
            <Text type='icon' bold size={15}>
              {length}
            </Text>
          ) : (
            <Iconfont name='md-search' size={18} />
          )}
        </Flex>
      )}
    </View>
  )
}

export default observer(Filter)
