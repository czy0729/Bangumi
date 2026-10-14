/*
 * @Author: czy0729
 * @Date: 2024-03-16 16:02:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 条件筛选
 */
import { observer } from 'mobx-react'
import { Filter as FilterComp } from '@_'
import { r } from '@utils/dev'
import { TEXT_UPDATE_ANIME } from '@constants'
import { FILTER_DS } from '../../ds'
import { COMPONENT, TEXT_INFORMATION } from './ds'

function Filter() {
  r(COMPONENT)

  return (
    <FilterComp
      filterDS={FILTER_DS}
      lastUpdate={TEXT_UPDATE_ANIME.slice(0, 7)}
      information={TEXT_INFORMATION}
    />
  )
}

export default observer(Filter)
