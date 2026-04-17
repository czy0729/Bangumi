/*
 * @Author: czy0729
 * @Date: 2021-12-31 02:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:55:04
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Input } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Filter() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [focus, setFocus] = useState(false)

  const handleFocus = useCallback(() => setFocus(true), [])
  const handleBlur = useCallback(() => setFocus(false), [])

  const styles = memoStyles()

  const { ipt } = $.state

  return (
    <View style={styles.filter}>
      <Input
        style={styles.input}
        clearButtonMode='never'
        value={ipt}
        returnKeyType='search'
        returnKeyLabel='搜索'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={$.onFilterChange}
        onSubmitEditing={$.onSubmitEditing}
      />
      {!focus && !ipt && (
        <Flex style={styles.icon} justify='center' pointerEvents='none'>
          <Iconfont name='md-search' size={18} />
        </Flex>
      )}
    </View>
  )
}

export default observer(Filter)
