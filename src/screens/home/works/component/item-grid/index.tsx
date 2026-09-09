/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:42:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:11:25
 */
import { observer } from 'mobx-react'
import { ItemCollectionsGrid } from '@_'
import { _, collectionStore } from '@stores'
import { matchYear, stl } from '@utils'
import { r } from '@utils/dev'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT, EVENT } from './ds'

import type { MonoWorksItem } from '@stores/subject/types'
import type { RenderItem, SubjectTypeCn } from '@types'

function ItemGrid({ item, index }: RenderItem<MonoWorksItem>) {
  r(COMPONENT)

  const numColumns = _.portrait(_.device(3, 4), 5)
  const id = String(item.id).replace('/subject/', '')

  return (
    <ItemCollectionsGrid
      style={stl(
        (_.isPad || _.isLandscape) && !(index % numColumns) && _.container.left,
        index < numColumns && _.mt.sm
      )}
      index={index}
      num={numColumns}
      event={EVENT}
      {...item}
      airtime={matchYear(item.tip)}
      id={id}
      collection={collectionStore.collect(id)}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
    />
  )
}

export default observer(ItemGrid)
