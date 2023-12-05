/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:40:30
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { Ctx } from '../../types'

function Onair({ subjectId }, { $ }: Ctx) {
  rerender('Home.GridInfo.Onair')

  const style = _.isMobileLanscape ? _.mt.xs : _.mt.md
  if ($.isToday(subjectId)) {
    const { h, m } = $.onAirCustom(subjectId)
    return (
      <Text style={style} type='success' align='center' size={13} bold>
        {h}:{m}
      </Text>
    )
  }

  if ($.isNextDay(subjectId)) {
    const { h, m } = $.onAirCustom(subjectId)
    return (
      <Text style={style} type='sub' align='center' size={13} bold>
        明天 {h}:{m}
      </Text>
    )
  }

  return null
}

export default obc(Onair)
