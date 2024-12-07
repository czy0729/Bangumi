/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:50:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 16:02:43
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_RATING_STATUS } from '@constants'
import { RatingStatus } from '@types'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List({ title }) {
  const { $ } = useStore<Ctx>()
  const status = MODEL_RATING_STATUS.getValue<RatingStatus>(title)
  const data = $.rating(status)
  if (!data._loaded) return <Loading />

  const styles = memoStyles()
  const { isFriend } = $.state
  const numColumns = _.portrait(2, 3)
  return (
    <ListView
      key={`${isFriend ? '1' : '0'}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={data}
      numColumns={numColumns}
      renderItem={renderItem}
      onEndReachedThreshold={0.2}
      onHeaderRefresh={() => $.fetchRating(true)}
      onFooterRefresh={$.fetchRating}
    />
  )
}

export default ob(List, COMPONENT)

function renderItem({ item }) {
  return <Item {...item} />
}
