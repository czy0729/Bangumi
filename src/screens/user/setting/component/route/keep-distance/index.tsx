/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { KEEP_DISTANCE, TEXTS } from '../ds'
import { IconTabKeep } from '../../icons'
import ItemSettingSegmented from '../../item-setting-segmented'

import type { WithFilterProps } from '../../../types'

/** 分页保活 */
function KeepDistance({ filter }: WithFilterProps) {
  return (
    <ItemSettingSegmented
      icon={<IconTabKeep />}
      setting='keepDistance'
      values={KEEP_DISTANCE}
      filter={filter}
      {...TEXTS.keepDistance}
    />
  )
}

export default KeepDistance
