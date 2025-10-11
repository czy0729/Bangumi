/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:35:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:52:23
 */
import React from 'react'
import { IconTouchable } from '@_'
import { _, userStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'

function IconHD() {
  const { $, navigation } = useStore<Ctx>()
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

export default ob(IconHD)
