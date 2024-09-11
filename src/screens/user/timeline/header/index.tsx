/*
 * @Author: czy0729
 * @Date: 2022-03-16 02:01:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 18:31:49
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { info } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(_props, { $ }: Ctx) {
  const { userName } = $.params
  return (
    <HeaderComp
      title={userName ? `${userName}的时间线` : '时间线'}
      alias='时间线'
      hm={['user/timeline', 'UserTimeline']}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          onPress={() => info('进度瓷砖会有延迟, 若无数据可过段时间再来')}
        />
      )}
    />
  )
}

export default obc(Header)
