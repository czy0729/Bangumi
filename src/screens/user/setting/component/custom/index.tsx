/*
 * @Author: czy0729
 * @Date: 2022-01-21 12:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 21:32:57
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { getShows } from '../../utils'
import CnFirst from './cn-first'
import FilterDefault from './filter-default'
import FilterNSFW from './filter-nsfw'
import HeatMap from './heat-map'
import HideScore from './hide-score'
import OpenInfo from './open-info'
import S2T from './s2t'
import UserAge from './user-age'
import { COMPONENT, TEXTS } from './ds'

/** 定制 */
function Custom({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='定制' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='定制' height={filter ? 440 : 760} onClose={setFalse}>
          {shows.cnFirst && <CnFirst filter={filter} />}
          {shows.heatMap && <HeatMap filter={filter} />}
          {shows.s2t && <S2T filter={filter} />}
          {shows.userAge && <UserAge filter={filter} />}
          {shows.hideScore && <HideScore filter={filter} />}
          {shows.filterDefault && <FilterDefault filter={filter} />}
          {shows.openInfo && <OpenInfo filter={filter} />}
          {shows.filter18x && <FilterNSFW filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default Custom
