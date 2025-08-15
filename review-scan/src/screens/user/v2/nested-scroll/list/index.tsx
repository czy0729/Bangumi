/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 20:50:27
 */
import React from 'react'
import { Loading } from '@components'
import { systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default ob(({ title }) => {
  const { $ } = useStore<Ctx>()
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
}, COMPONENT)
