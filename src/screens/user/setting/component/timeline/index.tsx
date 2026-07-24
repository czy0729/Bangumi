/*
 * @Author: czy0729
 * @Date: 2022-08-15 13:07:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:11:34
 */
import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { uiStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useIsFocused } from '@utils/hooks'
import { getShows } from '../../utils'
import TimelinePopable from './timeline-popable'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 时间胶囊 */
function Timeline({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  const isFocused = useIsFocused()
  useEffect(() => {
    if (!isFocused) {
      setFalse()
      uiStore.closePopableSubject()
    }
  }, [isFocused, setFalse])

  if (!shows) return null

  return (
    <>
      <ItemSetting
        hd='时间胶囊'
        arrow
        highlight
        filter={filter}
        onPress={() => {
          setTrue()
          setTimeout(() => {
            uiStore.updatePopableSubjectPortalKey()
          }, 160)
        }}
      />
      <ActionSheet
        show={state}
        title='时间胶囊'
        onClose={() => {
          setFalse()
          uiStore.closePopableSubject()
        }}
      >
        {shows.timelinePopable && <TimelinePopable filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(Timeline)
