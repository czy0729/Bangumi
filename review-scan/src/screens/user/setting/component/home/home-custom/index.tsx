/*
 * @Author: czy0729
 * @Date: 2024-04-24 09:30:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 09:31:28
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import CustomBtn from '../custom-btn'

/** 右上角功能入口 */
function HomeCustom({ filter }) {
  return useObserver(() => (
    <ItemSetting ft={<CustomBtn />} filter={filter} {...TEXTS.homeCustom}>
      <Heatmap id='设置.切换' title='右上角功能入口' />
    </ItemSetting>
  ))
}

export default HomeCustom
