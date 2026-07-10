/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:32:32
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { fixedRemote } from '@utils/user-setting'
import { IOS } from '@constants'
import Avatars from '../avatars'
import Bgs from '../bgs'
import Form from '../form'
import Preview from '../preview'
import Refresh from '../refresh'
import Segmented from '../segmented'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

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

  const styles = memoStyles()
  const { avatar: stateAvatar, bg: stateBg, selectedIndex } = $.state
  const userLargeAvatar = $.usersInfo.avatar?.large

  const previewAvatarSrc = !stateAvatar
    ? userLargeAvatar
    : fixedRemote(stateAvatar, true) || userLargeAvatar

  const previewBgSrc = !stateBg
    ? previewAvatarSrc
    : fixedRemote(stateBg) || fixedRemote(stateAvatar, true) || userLargeAvatar

  const blurRadius = stateBg ? 0 : IOS ? (stateBg === '' && stateAvatar ? 48 : 10) : 8

  const elPreview = <Preview bg={previewBgSrc} avatar={previewAvatarSrc} blurRadius={blurRadius} />

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
}

export default observer(Scroll)
