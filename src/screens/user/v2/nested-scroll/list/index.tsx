/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 21:39:38
 */
import React from 'react'
import { Loading } from '@components'
import { systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
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

  return useObserver(() => {
    const styles = memoStyles()
    const { userPagination } = systemStore.setting
    const { subjectType, list } = $.state
    const page = TABS.findIndex(item => item.title === title)
    const data = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
    )
    if (!$.loadedPage(page) || !data?._loaded) return <Loading style={styles.loading} />

    let key = `${subjectType}|${list}`
    if (userPagination) key += data.pagination.page

    return (
      <List
        key={key}
        styles={styles}
        list={list}
        page={page}
        data={data}
        numColumns={$.numColumns}
        userPagination={userPagination}
        onScroll={$.onScroll}
        onHeaderRefresh={() => $.fetchIsNeedToEnd(true)}
        onFooterRefresh={$.fetchUserCollections}
      />
    )
  })
}

export default ListWrap
