/*
 * @Author: czy0729
 * @Date: 2022-03-16 02:01:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 02:06:23
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'

function Header(props, { $ }) {
  const { userName } = $.params
  return (
    <CompHeader
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
