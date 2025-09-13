/*
 * @Author: czy0729
 * @Date: 2022-01-20 11:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-13 11:43:47
 */
import React, { useCallback, useRef } from 'react'
import { ActionSheet, Heatmap, ScrollTo } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { getShows } from '../../utils'
import CnFirst from '../custom/cn-first'
import AppKatakana from './app-katakana'
import OriginSetting from './origin-setting'
import TranslateEngine from './translate-engine'
import Webhook from './webhook'
import { COMPONENT, TEXTS } from './ds'

/** 其他 (之前是翻译, 已合并大部分功能于此项) */
function Katakana({ navigation, filter }) {
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

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='其他' arrow highlight filter={filter} onPress={setTrue}>
          <Heatmap id='设置.切换' title='片假名终结者' />
        </ItemSetting>
        <ActionSheet
          forwardRef={handleForwardRef}
          show={state}
          title='其他'
          height={filter ? 440 : 760}
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
  })
}

export default Katakana
