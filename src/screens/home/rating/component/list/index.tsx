/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:50:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 单个评分状态标签页的网格列表 (ListView 分页)
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { MODEL_RATING_STATUS } from '@constants'
import { COMPONENT } from './ds'
import { renderItem } from './utils'
import { memoStyles } from './styles'

import type { RatingStatus } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRefresh = useCallback(() => $.fetchRating(true), [$])

  const status = MODEL_RATING_STATUS.getValue<RatingStatus>(title)
  const data = $.rating(status)
  if (!data._loaded) return <Loading />

  const styles = memoStyles()

  const numColumns = _.portrait(2, 3)
  const key = `${$.state.isFriend ? '1' : '0'}${numColumns}` as const

  return (
    <ListView
      key={key}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      numColumns={numColumns}
      renderItem={renderItem}
      onEndReachedThreshold={0.2}
      onHeaderRefresh={handleHeaderRefresh}
      onFooterRefresh={$.fetchRating}
    />
  )
}

export default observer(List)
