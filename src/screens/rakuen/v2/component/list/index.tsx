/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:59:39
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { Login } from '@_'
import { userStore, useStore } from '@stores'
import i18n from '@constants/i18n'
import { ITEM_HEIGHT } from '../item/ds'
import { useListStyle } from './hooks'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM, INITIAL_NUM_TO_RENDER } from './ds'

import type { Ctx } from '../../types'
import type { HandleRef, Props } from './types'

function List({ index }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const style = useListStyle()

  const handleRef = useCallback<HandleRef>(
    ref => {
      $.connectRef(ref, index)
    },
    [$, index]
  )

  const type = $.type(index)
  if (type === 'hot' && !userStore.isWebLogin) {
    return <Login text={`热门帖子需${i18n.login()}才能显示`} btnText={`去${i18n.login()}`} />
  }

  const rakuen = $.rakuen(type)
  if (!rakuen._loaded) return <Loading />

  return (
    <ListView
      key={type}
      ref={handleRef}
      skipEnteringExitingAnimations={ENTERING_EXITING_ANIMATIONS_NUM}
      keyExtractor={keyExtractor}
      contentContainerStyle={style}
      progressViewOffset={style.paddingTop}
      data={rakuen}
      renderItem={renderItem}
      initialNumToRender={INITIAL_NUM_TO_RENDER}
      estimatedItemHeight={ITEM_HEIGHT}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default observer(List)
