/*
 * @Author: czy0729
 * @Date: 2025-11-06 01:15:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai 筛选
 */
import { observer } from 'mobx-react'
import { Filter as FilterComp } from '@_'
import { r } from '@utils/dev'
import { filterDS } from '../../ds'
import { COMPONENT, LAST_UPDATE, TEXT_INFORMATION } from './ds'

function Filter() {
  r(COMPONENT)

  return (
    <FilterComp
      filterDS={filterDS}
      name='Hentai'
      type='Hentai'
      lastUpdate={LAST_UPDATE.slice(0, 7)}
      information={TEXT_INFORMATION}
    />
  )
}

export default observer(Filter)
