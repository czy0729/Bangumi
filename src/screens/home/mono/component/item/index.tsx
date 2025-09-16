/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:35:38
 */
import React from 'react'
import { InView, ItemPost } from '@_'
import { _ } from '@stores'
import { MonoCommentsItem } from '@stores/subject/types'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { RenderItem } from '@types'
import { COMPONENT, EVENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

function Item({ item, index }: RenderItem<MonoCommentsItem>) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <InView y={_.window.height + ITEM_HEIGHT * (index + 1)}>
        <ItemPost
          contentStyle={styles.contentStyle}
          extraStyle={styles.extraStyle}
          index={index}
          event={EVENT}
          matchLink={false}
          expandNums={2}
          {...item}
        />
      </InView>
    )
  })
}

export default Item
