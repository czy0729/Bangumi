/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-24 06:24:00
 */
import React from 'react'
import { _ } from '@stores'
import { InView, ItemPost } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '人物.跳转',
  data: {
    from: '吐槽'
  }
} as const

const ITEM_HEIGHT = 94

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

export default obc(Item)
