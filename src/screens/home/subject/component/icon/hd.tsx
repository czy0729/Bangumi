/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:35:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-31 13:57:43
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _, userStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function IconHD(_props, { $, navigation }: Ctx) {
  if (userStore.isLimit || !$.hd) return null

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
