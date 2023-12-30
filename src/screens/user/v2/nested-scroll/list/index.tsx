/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 12:46:55
 */
import React from 'react'
import { Loading } from '@components'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import List from './list'
import { styles } from './styles'

export default obc(({ title }, { $ }: Ctx) => {
  rerender('User.NestedScroll.List', title)

  const { subjectType, list } = $.state
  const page = TABS.findIndex(item => item.title === title)
  const data = $.userCollections(
    subjectType,
    MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
  )
  if (!$.loadedPage(page) || !data?._loaded) return <Loading style={styles.loading} />

  return (
    <List
      key={`${subjectType}|${list}`}
      page={page}
      data={data}
      numColumns={$.numColumns}
      onScroll={$.onScroll}
      onHeaderRefresh={() => $.fetchIsNeedToEnd(true)}
      onFooterRefresh={$.fetchUserCollections}
    />
  )
})
