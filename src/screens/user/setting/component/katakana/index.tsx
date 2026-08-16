/*
 * @Author: czy0729
 * @Date: 2022-01-20 11:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 07:53:15
 */
import React, { useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import { ActionSheet, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { getShows } from '../../utils'
import CnFirst from '../custom/cn-first'
import AppKatakana from './app-katakana'
import OriginSetting from './origin-setting'
import TranslateEngine from './translate-engine'
import Webhook from './webhook'
import { COMPONENT, TEXTS } from './ds'

import type { ScrollTo } from '@components'
import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../types'

/** 其他 (之前是翻译, 已合并大部分功能于此项) */
function Katakana({ navigation, filter }: WithNavigation<WithFilterProps>) {
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
      <ItemSetting arrow highlight filter={filter} onPress={setTrue} {...TEXTS.other}>
        <Heatmap id='设置.切换' title='片假名终结者' />
      </ItemSetting>
      <ActionSheet
        forwardRef={handleForwardRef}
        show={state}
        title={TEXTS.other.hd}
        height={filter ? 480 : 760}
        onClose={setFalse}
      >
        {shows.origin && (
          <OriginSetting navigation={navigation} filter={filter} setFalse={setFalse} />
        )}
        {shows.engine && (
          <TranslateEngine
            filter={filter}
            onScrollIntoViewIfNeeded={handleScrollIntoViewIfNeeded}
          />
        )}
        {shows.katakana && <AppKatakana filter={filter} />}
        {shows.cnFirst && systemStore.setting.katakana && <CnFirst filter={filter} sub />}
        {shows.webhook && <Webhook navigation={navigation} filter={filter} setFalse={setFalse} />}
      </ActionSheet>
    </>
  )
}

export default observer(Katakana)
