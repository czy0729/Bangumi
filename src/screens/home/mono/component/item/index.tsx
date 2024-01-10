/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:34:29
 */
import React from 'react'
import { InView, ItemPost } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, EVENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

function Item({ item, index }, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <InView y={_.window.height * 1.5 + ITEM_HEIGHT * index}>
      <ItemPost
        navigation={navigation}
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
}

export default obc(Item, COMPONENT)
