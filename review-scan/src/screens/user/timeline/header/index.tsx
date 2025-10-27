/*
 * @Author: czy0729
 * @Date: 2022-03-16 02:01:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:04:29
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { userName } = $.params
  return (
    <HeaderV2
      title={userName ? `${userName}的时间线` : '时间线'}
      alias='时间线'
      hm={HM}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          size={21}
          color={_.colorDesc}
          onPress={() => {
            info('进度瓷砖会有延迟, 若无数据可过段时间再来')
          }}
        />
      )}
    />
  )
}

export default ob(Header)
