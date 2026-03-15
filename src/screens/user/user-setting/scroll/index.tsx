/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:32:32
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { fixedRemote } from '@utils/user-setting'
import { IOS } from '@constants'
import Avatars from '../component/avatars'
import Bgs from '../component/bgs'
import Form from '../component/form'
import Preview from '../component/preview'
import Refresh from '../component/refresh'
import Segmented from '../component/segmented'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../types'

function Scroll({ forwardRef, onScroll, onScrollIntoViewIfNeeded, onRefresh }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [expand, setExpand] = useState(false)
  const [more, setMore] = useState(false)

  const handleViewOrigin = useCallback((item: string, index: number) => {
    open(item.replace('small', 'origin'))

    t('个人设置.查看原图', {
      index
    })
  }, [])
  const handleExpand = useCallback(() => {
    setExpand(!expand)
  }, [expand])
  const handleMore = useCallback(() => {
    setMore(true)
  }, [])

  return useObserver(() => {
    const styles = memoStyles()
    const { avatar: stateAvatar, bg: stateBg, selectedIndex } = $.state
    const userLargeAvatar = $.usersInfo.avatar?.large

    const previewAvatarSrc = useMemo(() => {
      if (!stateAvatar) return userLargeAvatar
      return fixedRemote(stateAvatar, true) || userLargeAvatar
    }, [stateAvatar, userLargeAvatar])

    const previewBgSrc = useMemo(() => {
      if (!stateBg) return previewAvatarSrc
      return fixedRemote(stateBg) || fixedRemote(stateAvatar, true) || userLargeAvatar
    }, [stateBg, stateAvatar, previewAvatarSrc, userLargeAvatar])

    const blurRadius = useMemo(() => {
      if (stateBg) return 0
      return IOS ? (stateBg === '' && stateAvatar ? 48 : 10) : 8
    }, [stateBg, stateAvatar])

    const elPreview = (
      <Preview bg={previewBgSrc} avatar={previewAvatarSrc} blurRadius={blurRadius} />
    )

    return (
      <View style={_.container.plain}>
        <View style={styles.preview}>{!expand && elPreview}</View>

        <ScrollView
          forwardRef={forwardRef}
          contentContainerStyle={styles.contentContainerStyle}
          keyboardDismissMode='on-drag'
          onScroll={onScroll}
        >
          {expand && elPreview}

          <Form
            expand={expand}
            onExpand={handleExpand}
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          />

          <Segmented />
          {selectedIndex === 0 && (
            <Bgs
              avatar={previewAvatarSrc}
              more={more}
              onViewOrigin={handleViewOrigin}
              onMore={handleMore}
            />
          )}
          {selectedIndex === 1 && <Avatars avatar={userLargeAvatar} />}
        </ScrollView>

        <Refresh onRefresh={onRefresh} />
      </View>
    )
  })
}

export default Scroll
