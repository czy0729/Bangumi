/*
 * @Author: czy0729
 * @Date: 2022-01-20 11:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 22:00:00
 */
import React, { useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import { ActionSheet, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IconLanguages } from '../icons'
import { getShows } from '../../utils'
import CnFirst from '../text/cn-first'
import AppKatakana from './app-katakana'
import TranslateEngine from './translate-engine'
import { COMPONENT, TEXTS } from './ds'

import type { ScrollTo } from '@components'
import type { WithFilterProps } from '../../types'

/** 翻译 (翻译引擎、片假名终结者) */
function Katakana({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  const scrollToRef = useRef<ScrollTo>(null)

  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])
  const handleScrollIntoViewIfNeeded = useCallback((y: number) => {
    if (typeof scrollToRef.current === 'function') {
      scrollToRef.current({
        x: 0,
        y,
        animated: true
      })
    }
  }, [])

  if (!shows) return null

  return (
    <>
      <ItemSetting icon={<IconLanguages />} arrow highlight filter={filter} onPress={setTrue} {...TEXTS.other}>
        <Heatmap id='设置.切换' title='片假名终结者' />
      </ItemSetting>
      <ActionSheet
        forwardRef={handleForwardRef}
        show={state}
        title={TEXTS.other.hd}
        height={filter ? 400 : 560}
        onClose={setFalse}
      >
        {shows.engine && (
          <TranslateEngine
            filter={filter}
            onScrollIntoViewIfNeeded={handleScrollIntoViewIfNeeded}
          />
        )}
        {shows.katakana && <AppKatakana filter={filter} />}
        {shows.cnFirst && systemStore.setting.katakana && <CnFirst filter={filter} sub />}
      </ActionSheet>
    </>
  )
}

export default observer(Katakana)
