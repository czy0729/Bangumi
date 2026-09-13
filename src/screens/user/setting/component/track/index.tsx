/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:18:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 20:27:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IconTarget } from '../icons'
import { getShows } from '../../utils'
import CollectionTimelines from './collection-timelines'
import Comment from './comment'
import Topic from './topic'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

import type { WithFilterProps } from '../../types'

/** 追踪 */
function Track({
  filter,
  open
}: WithFilterProps<{
  open: boolean
}>) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  const styles = memoStyles()

  return (
    <>
      <ItemSetting
        icon={<IconTarget />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.track}
      />
      {/* 内容为分组卡片 (Block), 面板底色用页面底色, 浅色下卡片才能与面板区分开 */}
      <ActionSheet
        contentContainerStyle={styles.container}
        show={state}
        title={TEXTS.track.hd}
        height={760}
        backgroundColor={_.select(_.colorBg, _._colorDarkModeLevel1)}
        onClose={setFalse}
      >
        {shows.collectionTimelines && <CollectionTimelines filter={filter} setFalse={setFalse} />}
        {shows.comment && <Comment filter={filter} setFalse={setFalse} />}
        {shows.topic && <Topic filter={filter} setFalse={setFalse} />}
      </ActionSheet>
    </>
  )
}

export default observer(Track)
