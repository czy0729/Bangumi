/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:47:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:16:57
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { _, systemStore, useStore } from '@stores'
import { getKeyString } from '@utils'
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
}

export default observer(ListWrap)
