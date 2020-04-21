/*
 * @Author: czy0729
 * @Date: 2020-04-21 12:15:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-21 17:47:25
 */
import React from 'react'
import { IconHeader } from '@screens/_'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'

function Extra({ $, navigation }) {
  if (!$.tinygrail || !$.chara._loaded) {
    return null
  }

  return (
    <IconHeader
      name='trophy'
      onPress={() => {
        const path = $.chara.users ? 'TinygrailICODeal' : 'TinygrailDeal'
        t('人物.跳转', {
          to: path,
          monoId: $.monoId
        })

        navigation.push(path, {
          monoId: $.monoId
        })
      }}
    />
  )
}

export default observer(Extra)
