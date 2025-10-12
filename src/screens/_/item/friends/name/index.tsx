/*
 * @Author: czy0729
 * @Date: 2022-08-07 07:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 04:56:25
 */
import React from 'react'
import { Highlight } from '@components'
import { getPinYinFilterValue } from '@utils'
import { useObserver } from '@utils/hooks'
import { Props } from './types'

function Name({ userName, filter }: Props) {
  return useObserver(() => {
    const value = getPinYinFilterValue(userName, filter)
    return (
      <Highlight numberOfLines={1} bold value={value}>
        {userName}
      </Highlight>
    )
  })
}

export default Name
