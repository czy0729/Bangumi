/*
 * @Author: czy0729
 * @Date: 2022-01-22 15:04:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-09 23:12:28
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { systemStore, userStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { MODEL_SETTING_HOME_LAYOUT, MODEL_SETTING_HOME_SORTING, WEB } from '@constants'
import { getShows } from '../../utils'
import HomeCountView from './home-count-view'
import HomeCustom from './home-custom'
import HomeEpStartAtLast from './home-ep-start-at-last'
import HomeFilter from './home-filter'
import HomeGridCoverLayout from './home-grid-cover-layout'
import HomeGridEpAutoAdjust from './home-grid-ep-auto-adjust'
import HomeGridTitle from './home-grid-title'
import HomeICS from './home-ics'
import HomeLayout from './home-layout'
import HomeListCompact from './home-list-compact'
import HomeListLimit from './home-list-limit'
import HomeOnair from './home-onair'
import HomeOrigin from './home-origin'
// import HomeShowGame from './home-show-game'
import HomeSortSink from './home-sort-sink'
import HomeSorting from './home-sorting'
import HomeTabs from './home-tabs'
import { COMPONENT, TEXTS } from './ds'

/** 进度 */
function Home({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (WEB || !shows) return null

    const isList = systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('列表')
    return (
      <>
        <ItemSetting hd='进度' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='进度' height={filter ? 440 : 760} onClose={setFalse}>
          {shows.homeCustom && <HomeCustom filter={filter} />}
          <HomeTabs filter={filter} />
          {shows.homeLayout && <HomeLayout filter={filter} />}
          {shows.homeListCompact && isList && <HomeListCompact filter={filter} />}
          {shows.homeGridCoverLayout && !isList && <HomeGridCoverLayout filter={filter} />}
          {shows.homeGridTitle && !isList && <HomeGridTitle filter={filter} />}
          {shows.homeGridEpAutoAdjust && !isList && <HomeGridEpAutoAdjust filter={filter} />}
          {shows.homeListLimit && <HomeListLimit filter={filter} />}
          {shows.homeCountView && <HomeCountView filter={filter} />}
          {shows.homeSorting && <HomeSorting filter={filter} />}
          {shows.homeSortSink &&
            systemStore.setting.homeSorting !== MODEL_SETTING_HOME_SORTING.getValue('网页') && (
              <HomeSortSink filter={filter} />
            )}
          {shows.homeOrigin && !userStore.isLimit && <HomeOrigin filter={filter} />}
          {shows.homeOnAir && <HomeOnair filter={filter} />}
          {shows.homeEpStartAtLastWathed && <HomeEpStartAtLast filter={filter} />}
          {/* {shows.showGame && <HomeShowGame filter={filter} />} */}
          {shows.homeFilter && <HomeFilter filter={filter} />}
          {shows.homeICS && <HomeICS filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default Home
