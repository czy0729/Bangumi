/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 17:25:42
 */
import React from 'react'
import { ItemPost } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '人物.跳转',
  data: {
    from: '吐槽'
  }
} as const

function Item({ item, index }, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <ItemPost
      navigation={navigation}
      contentStyle={styles.contentStyle}
      index={index}
      event={EVENT}
      matchLink={false}
      {...item}
    />
  )
}

export default obc(Item)
