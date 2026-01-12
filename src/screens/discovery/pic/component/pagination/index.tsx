/*
 * @Author: czy0729
 * @Date: 2025-06-10 20:38:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-11 05:45:00
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { LIST_LIMIT, MAX_PAGE } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Pagination() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { page } = $.state

    // 是否还有下一页
    const hasNext = $.list.length >= LIST_LIMIT

    // 当前允许显示的最大页码
    const maxPage = hasNext ? MAX_PAGE : page

    return (
      <Flex style={styles.pagination} justify='center'>
        {Array.from({ length: MAX_PAGE }, (_, i) => i + 1)
          .filter(item => item <= maxPage)
          .map(item => (
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
          ))}
      </Flex>
    )
  })
}

export default Pagination
