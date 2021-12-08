/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:35:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 12:33:17
 */
import React from 'react'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconHD(props, { $, navigation }) {
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
