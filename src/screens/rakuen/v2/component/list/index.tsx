/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 06:10:23
 */
import React, { useCallback, useMemo } from 'react'
import { ListView, Loading } from '@components'
import { Login } from '@_'
import { _, userStore, useStore } from '@stores'
import { useInsets, useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { H_TABBAR } from '../../ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM } from './ds'

import type { Ctx } from '../../types'
import type { HandleRef, Props } from './types'

function List({ index }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight } = useInsets()
  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: headerHeight + H_TABBAR,
      paddingBottom: _.bottom
    }),
    [headerHeight]
  )

  const handleRef = useCallback<HandleRef>(
    ref => {
      $.connectRef(ref, index)
    },
    [$, index]
  )

  return useObserver(() => {
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
        contentContainerStyle={contentContainerStyle}
        progressViewOffset={contentContainerStyle.paddingTop}
        data={rakuen}
        renderItem={renderItem}
        initialNumToRender={16}
        scrollEventThrottle={16}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
      />
    )
  })
}

export default List
