/*
 * @Author: czy0729
 * @Date: 2021-12-31 02:37:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:08:22
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Iconfont, Input } from '@components'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Filter() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const [focus, setFocus] = useState(false)
  const handleFocus = useCallback(() => setFocus(true), [])
  const handleBlur = useCallback(() => setFocus(false), [])

  return useObserver(() => {
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
  })
}

export default Filter
