/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:44:30
 */
import React from 'react'
import { Loading } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import List from './list'
import { styles } from './styles'
import { COMPONENT } from './ds'

export default obc(({ title }, { $ }: Ctx) => {
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
}, COMPONENT)
