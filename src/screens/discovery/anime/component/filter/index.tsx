/*
 * @Author: czy0729
 * @Date: 2024-03-16 16:02:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 16:00:45
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Filter as FilterComp } from '@_'
import { r } from '@utils/dev'
import { TEXT_UPDATE_ANIME } from '@constants'
import { filterDS } from '../../ds'
import { COMPONENT, TEXT_INFORMATION } from './ds'

function Filter() {
  r(COMPONENT)

  return useObserver(() => (
    <FilterComp
      filterDS={filterDS}
      lastUpdate={TEXT_UPDATE_ANIME.slice(0, 7)}
      information={TEXT_INFORMATION}
    />
  ))
}

export default Filter
