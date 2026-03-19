/*
 * @Author: czy0729
 * @Date: 2022-08-07 07:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:25:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Highlight } from '@components'
import { getPinYinFilterValue } from '@utils'

import type { Props } from './types'

function Name({ userName, filter }: Props) {
  const value = getPinYinFilterValue(userName, filter)

  return (
    <Highlight numberOfLines={1} bold value={value}>
      {userName}
    </Highlight>
  )
}

export default observer(Name)
