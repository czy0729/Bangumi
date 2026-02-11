/*
 * @Author: czy0729
 * @Date: 2023-08-01 04:39:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 05:38:38
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { Text } from '../../../../text'

function Count({ value = '' }) {
  return useObserver(() => {
    if (!value.length) return null

    return (
      <Text style={_.mr.sm} type='sub' size={11} align='center'>
        {value.length}
      </Text>
    )
  })
}

export default Count
