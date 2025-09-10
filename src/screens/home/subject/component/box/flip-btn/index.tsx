/*
 * @Author: czy0729
 * @Date: 2023-03-01 08:26:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-11 05:11:28
 */
import React from 'react'
import { collectionStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { Ctx } from '../../../types'
import FlipBtn from './flip-btn'
import { COMPONENT } from './ds'

function FlipBtnWrap({ onPress }) {
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
        last={collectedTime}
        onAnimated={$.afterFlip}
        onPress={onPress}
      />
    )
  })
}

export default FlipBtnWrap
