/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:47:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 01:06:35
 */
import React, { useCallback } from 'react'
import { _, systemStore, useStore } from '@stores'
import { getKeyString } from '@utils'
import { useObserver } from '@utils/hooks'
import { MODEL_COLLECTION_STATUS } from '@constants'
import Loading from '../../component/loading'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function ListWrap({ page, title, scrollY, onScroll, onRefreshOffset }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchIsNeedToEnd(true), [$])

  return useObserver(() => {
    const elLoading = <Loading />
    if (!$.state._loaded) return elLoading

    const { subjectType, list } = $.state
    const userCollections = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
    )
    if (!userCollections._loaded) return elLoading

    const { userPagination, userGridNum } = systemStore.setting
    const num = Number(userGridNum) + (_.isLandscape ? 1 : 0)

    return (
      <List
        key={getKeyString(_.orientation, subjectType, userGridNum)}
        styles={memoStyles()}
        forwardRef={$.forwardRef}
        scrollY={scrollY}
        page={page}
        list={list}
        userPagination={userPagination}
        userGridNum={num}
        userCollections={userCollections}
        onScroll={onScroll}
        onRefreshOffset={onRefreshOffset}
        onHeaderRefresh={handleHeaderRefresh}
        onFooterRefresh={$.fetchUserCollections}
      />
    )
  })
}

export default ListWrap
