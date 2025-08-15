/*
 * @Author: czy0729
 * @Date: 2025-06-10 20:38:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 02:01:53
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Pagination() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { page, pageTotal } = $.state
    return (
      <Flex style={styles.pagination} justify='center'>
        {[1, 2, 3, 4, 5].map(item => {
          if (item === 2 && page !== 2 && !$.list.length) return null
          if (item > 2 && pageTotal < item) return null
          return (
            <Touchable
              key={String(item)}
              onPress={() => {
                $.onPage(item)
              }}
            >
              <View style={styles.title}>
                <Text size={16} lineHeight={26} bold>
                  {item}
                </Text>
                {page === item && <View style={styles.active} />}
              </View>
            </Touchable>
          )
        })}
      </Flex>
    )
  })
}

export default Pagination
