/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:05:23
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'

function IconEp(props, { $, navigation }: Ctx) {
  const { epsThumbs, epsThumbsHeader, filterEps } = $.state
  return (
    <IconTouchable
      name='md-menu'
      onPress={() => {
        t('条目.跳转', {
          to: 'Episodes',
          from: '章节',
          subjectId: $.subjectId
        })

        navigation.push('Episodes', {
          subjectId: $.subjectId,
          name: $.cn || $.jp,
          epsThumbs,
          epsThumbsHeader,
          filterEps
        })
      }}
    >
      <Heatmap right={13} id='条目.跳转' from='章节' />
    </IconTouchable>
  )
}

export default obc(IconEp)
