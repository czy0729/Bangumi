/*
 * @Author: czy0729
 * @Date: 2023-03-21 16:47:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 22:28:56
 */
import React from 'react'
import { _, systemStore } from '@stores'
import { getKeyString } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { Ctx } from '../types'
import List from './list'
import Loading from './loading'
import { memoStyles } from './styles'

export default obc(
  ({ page, title, scrollY, onScroll, onRefreshOffset }, { $ }: Ctx) => {
    const { subjectType, list } = $.state
    const userCollections = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
    )

    if (!userCollections._loaded) return <Loading />

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
        onHeaderRefresh={() => $.fetchIsNeedToEnd(true)}
        onFooterRefresh={$.fetchUserCollections}
      />
    )
  }
)
