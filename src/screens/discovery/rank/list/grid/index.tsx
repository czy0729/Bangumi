/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:09:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-25 17:53:22
 */
import React from 'react'
import { Flex, Empty } from '@components'
import { ItemCollectionsGrid, FilterText } from '@_'
import { _, collectionStore } from '@stores'
import { matchYear } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../types'
import { memoStyles } from './styles'
import { EVENT_GRID } from './ds'

function Grid(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { type, airtime } = $.state
  const { list } = $.list
  const { _filter } = $.rank
  const num = _.portrait(3, 5)
  return (
    <Flex style={styles.grid} wrap='wrap' align='start'>
      {list.length ? (
        list.map((item, index) => {
          const id = String(item.id).replace('/subject/', '')
          const collection = collectionStore.collectionStatus(id)
          return (
            <ItemCollectionsGrid
              key={item.id}
              navigation={navigation}
              style={!(index % num) && styles.left}
              num={num}
              event={EVENT_GRID}
              airtime={airtime === '' && matchYear(item.tip)}
              {...item}
              id={id}
              collection={collection}
              isCollect={item.collected}
              isRectangle={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type) === '音乐'}
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

export default obc(Grid)
