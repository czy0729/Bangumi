/*
 * @Author: czy0729
 * @Date: 2023-03-01 08:26:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:34:00
 */
import React from 'react'
import { collectionStore, useStore } from '@stores'
import { date } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../../../types'
import FlipBtn from './flip-btn'
import { COMPONENT } from './ds'

function FlipBtnWrap({ onPress }) {
  const { $ } = useStore<Ctx>()
  const {
    status: collectionStatus = { name: '未收藏', type: null },
    rating = 0,
    private: privacy,
    lasttouch,
    _loaded
  } = $.collection

  let btnText: string
  if (WEB) {
    btnText = collectionStore.collect($.subjectId, $.type) || '未收藏'
  } else {
    btnText = _loaded ? collectionStatus.name : $.params._collection || collectionStatus.name
  }

  let last = ''
  if (lasttouch && ['collect', 'on_hold', 'dropped'].includes(collectionStatus?.type)) {
    last = date('Y.m.d', lasttouch)
  }

  return (
    <FlipBtn
      key={String($.state.flipKey)}
      animate={$.state.flip}
      btnText={btnText}
      rating={rating}
      privacy={privacy}
      last={last}
      onAnimated={$.afterFlip}
      onPress={onPress}
    />
  )
}

export default ob(FlipBtnWrap, COMPONENT)
