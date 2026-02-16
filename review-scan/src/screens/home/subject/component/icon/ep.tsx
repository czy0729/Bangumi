/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-05 04:25:22
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'

function IconEp() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <IconTouchable
      style={{
        marginRight: -1,
        marginLeft: _.xs
      }}
      name='md-menu'
      onPress={() => {
        navigation.push('Episodes', {
          subjectId: $.subjectId,
          name: $.cn || $.jp,
          epsThumbs: $.state.epsThumbs,
          epsThumbsHeader: $.state.epsThumbsHeader,
          filterEps: $.state.filterEps
        })

        t('条目.跳转', {
          to: 'Episodes',
          from: '章节',
          subjectId: $.subjectId
        })
      }}
    >
      <Heatmap right={13} id='条目.跳转' from='章节' />
    </IconTouchable>
  )
}

export default ob(IconEp)
