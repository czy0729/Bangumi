/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:09:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 04:34:18
 */
import React from 'react'
import { Empty, Flex } from '@components'
import { FilterText, ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { matchYear } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { COMPONENT, EVENT_GRID } from './ds'
import { memoStyles } from './styles'

function Grid(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { list } = $.list
  const { _filter } = $.rank
  const num = _.portrait(3, 5)
  return (
    <Flex style={styles.grid} wrap='wrap' align='start'>
      {list.length ? (
        list.map((item, index: number) => {
          const id = String(item.id).replace('/subject/', '')
          const collection = collectionStore.collect(id)
          return (
            <ItemCollectionsGrid
              key={item.id}
              navigation={navigation}
              style={!(index % num) && styles.left}
              num={num}
              event={EVENT_GRID}
              airtime={$.state.airtime === '' && matchYear(item.tip)}
              {...item}
              id={id}
              cover={item.cover || $.cover(item.id)}
              typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)}
              collection={collection}
              isCollect={item.collected}
              isRectangle={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type) === '音乐'}
            />
          )
        })
      ) : (
        <Empty />
      )}
      {!!_filter && <FilterText value={_filter} />}
    </Flex>
  )
}

export default obc(Grid, COMPONENT)
