/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:15:03
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { systemStore, useStore } from '@stores'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { TABS } from '../../ds'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatus } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function ListWrap({ title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchIsNeedToEnd(true), [$])

  const styles = memoStyles()
  const elLoading = <Loading style={styles.loading} />
  if (!$.state._loaded) return elLoading

  const { userPagination } = systemStore.setting
  const { subjectType, list } = $.state
  const page = TABS.findIndex(item => item.title === title)
  const data = $.userCollections(
    subjectType,
    MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
  )
  if (!$.loadedPage(page) || !data?._loaded) return elLoading

  let key = `${subjectType}|${list}`
  if (userPagination) key += data.pagination.page

  return (
    <List
      key={key}
      styles={styles}
      forwardRef={$.forwardRef}
      list={list}
      page={page}
      data={data}
      numColumns={$.numColumns}
      userPagination={userPagination}
      onScroll={$.onScroll}
      onHeaderRefresh={handleHeaderRefresh}
      onFooterRefresh={$.fetchUserCollections}
    />
  )
}

export default observer(ListWrap)
