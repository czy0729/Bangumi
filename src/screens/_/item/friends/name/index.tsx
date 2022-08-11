/*
 * @Author: czy0729
 * @Date: 2022-08-07 07:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:24:27
 */
import React from 'react'
import { Highlight } from '@components'
import { getPinYinFilterValue } from '@utils'
import { ob } from '@utils/decorators'

function Name({ userName, filter }) {
  const value = getPinYinFilterValue(userName, filter)
  return (
    <Highlight numberOfLines={1} bold value={value}>
      {userName}
    </Highlight>
  )
}

export default ob(Name)
