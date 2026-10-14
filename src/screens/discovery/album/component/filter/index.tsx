/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找画集筛选
 */
import { observer } from 'mobx-react'
import { Filter as FilterComp } from '@_'
import { r } from '@utils/dev'
import { TEXT_UPDATE_ALBUM } from '@constants'
import { filterDS } from '../../ds'
import { COMPONENT, TEXT_INFORMATION } from './ds'

function Filter() {
  r(COMPONENT)

  return (
    <FilterComp
      filterDS={filterDS}
      name='画集'
      type='Album'
      lastUpdate={TEXT_UPDATE_ALBUM.slice(0, 7)}
      information={TEXT_INFORMATION}
    />
  )
}

export default observer(Filter)
