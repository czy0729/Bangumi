/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:35:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:07:08
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconHD(props, { $, navigation }: Ctx) {
  if ($.isLimit || !$.hd) return null

  return (
    <IconTouchable
      style={_.mr._sm}
      name='md-hd'
      onPress={() => {
        navigation.push('HD', {
          cn: $.cn,
          subjectId: $.hd
        })
      }}
    />
  )
}

export default obc(IconHD)
