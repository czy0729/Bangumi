/*
 * @Author: czy0729
 * @Date: 2024-04-24 09:30:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 09:31:28
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { TEXTS } from '../ds'
import CustomBtn from '../custom-btn'

import type { WithFilterProps } from '../../../types'

/** 两侧功能入口 */
function HomeCustom({ filter }: WithFilterProps) {
  const elFt = useMemo(() => <CustomBtn />, [])

  return (
    <ItemSetting ft={elFt} filter={filter} {...TEXTS.homeCustom}>
      <Heatmap id='设置.切换' title='两侧功能入口' />
    </ItemSetting>
  )
}

export default observer(HomeCustom)
