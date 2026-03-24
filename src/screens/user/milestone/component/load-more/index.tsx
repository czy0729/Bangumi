/*
 * @Author: czy0729
 * @Date: 2026-03-24 19:42:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 20:48:40
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, Loading, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { feedback } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function LoadMore() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { fetching, limit } = $.state
  const { list, pagination } = $.data
  const { page, pageTotal } = pagination

  const isLoadedEnd = useMemo(() => {
    if (!page || !pageTotal) return false
    return page >= pageTotal || (!!limit && list.length >= limit)
  }, [page, pageTotal, limit, list.length])

  const handlePress = useCallback(async () => {
    if (fetching || isLoadedEnd) return

    await $.fetchUserCollections()
    feedback(true)
  }, [$, fetching, isLoadedEnd])

  if (!list.length) return null

  return (
    <Flex style={_.mt.md} justify='center'>
      {isLoadedEnd ? (
        <Text type='icon' size={12} align='center'>
          加载完毕
        </Text>
      ) : (
        <Touchable onPress={fetching ? undefined : handlePress}>
          <Flex direction='column'>
            {fetching ? (
              <>
                <Loading.Normal />
                <Text style={_.mt.sm} type='icon' size={12} lineHeight={16}>
                  正在加载 {page + 1} / {pageTotal}
                </Text>
              </>
            ) : (
              <Text type='icon' size={12} lineHeight={16}>
                点击加载 {page} / {pageTotal}
              </Text>
            )}
          </Flex>
        </Touchable>
      )}
    </Flex>
  )
}

export default observer(LoadMore)
