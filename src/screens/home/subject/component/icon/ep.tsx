/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:11:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT_EP } from './ds'

import type { Ctx } from '../../types'

function IconEp() {
  const { $, navigation } = useStore<Ctx>(COMPONENT_EP)

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

export default observer(IconEp)
