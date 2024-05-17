/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-17 15:05:06
 */
import React, { useCallback } from 'react'
import { ListView, Loading, ScrollToIndex } from '@components'
import { Login } from '@_'
import { userStore } from '@stores'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT, ENTERING_EXITING_ANIMATIONS_NUM } from './ds'
import { styles } from './styles'

function List({ index }, { $ }: Ctx) {
  r(COMPONENT)

  const handleForwardRef = useCallback(
    (ref: { scrollToIndex: ScrollToIndex }) => $.connectRef(ref, index),
    [index]
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
        ref={handleForwardRef}
        skipEnteringExitingAnimations={ENTERING_EXITING_ANIMATIONS_NUM}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        progressViewOffset={styles.contentContainerStyle.paddingTop}
        data={rakuen}
        renderItem={renderItem}
        scrollEventThrottle={4}
        onScroll={$.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
      />
    )
  })
}

export default c(List)
