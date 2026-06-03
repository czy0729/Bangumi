/*
 * @Author: czy0729
 * @Date: 2026-06-03 15:36:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-03 15:37:56
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { HOST } from '@constants'
import { TEXTS } from '../ds'

import type { WithFilterProps } from '../../../types'

/** 受限内容 */
function ShowNSFWSubject({ filter }: WithFilterProps) {
  return (
    <ItemSetting
      style={_.mt.xs}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        open(`${HOST}/settings`)
      }}
      {...TEXTS.showNSFWSubject}
    />
  )
}

export default observer(ShowNSFWSubject)
