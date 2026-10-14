/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找三次元筛选
 */
import { observer } from 'mobx-react'
import { Filter as FilterComp } from '@_'
import { r } from '@utils/dev'
import { TEXT_UPDATE_REAL } from '@constants'
import { filterDS } from '../../ds'
import { COMPONENT, TEXT_INFORMATION } from './ds'

function Filter() {
  r(COMPONENT)

  return (
    <FilterComp
      filterDS={filterDS}
      name='三次元'
      type='Real'
      lastUpdate={TEXT_UPDATE_REAL.slice(0, 7)}
      information={TEXT_INFORMATION}
    />
  )
}

export default observer(Filter)
