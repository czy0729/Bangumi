/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:14:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 21:12:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { ITEM_BLOG_HEIGHT } from '@_'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import Pagination from '../pagination'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ type }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.state.show) return null

  const styles = memoStyles()
  const blog = $.blog(type)

  return (
    <>
      {!blog._loaded ? (
        <Loading />
      ) : (
        <ListView
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.container}
          data={blog}
          estimatedItemHeight={ITEM_BLOG_HEIGHT}
          itemHeightKey={`${type}-${$.state.currentPage[type]}`}
          renderItem={renderItem}
          showFooter={false}
          onScroll={$.onScroll}
        />
      )}
      <Pagination type={type} />
    </>
  )
}

export default observer(List)
