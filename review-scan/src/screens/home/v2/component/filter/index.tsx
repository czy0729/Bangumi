/*
 * @Author: czy0729
 * @Date: 2021-03-12 15:58:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-17 09:13:53
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Input, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Filter({ title, length }: Props) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const [focus, setFocus] = useState(false)
  const handleFocus = useCallback(() => {
    setFocus(true)
  }, [])
  const handleBlur = useCallback(() => {
    setFocus(false)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    const filter = $.filterValue(title)
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
        {!focus && !filter && (
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
  })
}

export default Filter
