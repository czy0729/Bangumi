/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 17:00:18
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Input, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Filter({ title, length }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [focus, setFocus] = useState(false)
  const handleFocus = useCallback(() => setFocus(true), [])
  const handleBlur = useCallback(() => setFocus(false), [])

  return useObserver(() => {
    const styles = memoStyles()
    const filter = $.filterValue(title)
    const showPlaceholder = !focus && !filter
    const { fetching } = $.state.progress

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
            {fetching && (
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
  })
}

export default Filter
