/*
 * @Author: czy0729
 * @Date: 2023-03-01 08:26:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 13:15:51
 */
import React from 'react'
import { collectionStore } from '@stores'
import { date } from '@utils'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../../types'
import FlipBtn from './flip-btn'

export default obc(({ onPress }, { $ }: Ctx) => {
  // global.rerender('Subject.Box.FlipBtn')

  const { flip, flipKey } = $.state
  const {
    status: collectionStatus = { name: '未收藏', type: null },
    rating = 0,
    private: privacy,
    lasttouch,
    _loaded
  } = $.collection

  let btnText: string
  if (STORYBOOK) {
    btnText = collectionStore.collect($.subjectId, $.type) || '未收藏'
  } else {
    btnText = _loaded
      ? collectionStatus.name
      : $.params._collection || collectionStatus.name
  }

  let last = ''
  if (lasttouch && ['collect', 'on_hold', 'dropped'].includes(collectionStatus?.type)) {
    last = date('Y.m.d', lasttouch)
  }

  return (
    <FlipBtn
      key={String(flipKey)}
      animate={flip}
      btnText={btnText}
      rating={rating}
      privacy={privacy}
      last={last}
      onAnimated={$.afterFlip}
      onPress={onPress}
    />
  )
})
