/*
 * @Author: czy0729
 * @Date: 2023-03-01 08:26:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-14 18:14:50
 */
import React from 'react'
import { collectionStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import FlipBtn from './flip-btn'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function FlipBtnWrap({ onPress }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const {
      status: collectionStatus = { name: '未收藏', type: null },
      rating = 0,
      private: privacy,
      _loaded
    } = $.collection
    const { collectedTime = '' } = $.subjectFormHTML

    const btnText = WEB
      ? collectionStore.collect($.subjectId, $.type) || '未收藏'
      : _loaded
      ? collectionStatus.name
      : $.params._collection || collectionStatus.name

    return (
      <FlipBtn
        key={String($.state.flipKey)}
        animate={$.state.flip}
        btnText={btnText}
        rating={rating}
        privacy={privacy}
        last={btnText === '未收藏' ? '' : String(collectedTime || '').split(' ')[0]}
        onAnimated={$.afterFlip}
        onPress={onPress}
      />
    )
  })
}

export default FlipBtnWrap
