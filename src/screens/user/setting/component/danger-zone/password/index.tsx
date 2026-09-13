/*
 * @Author: czy0729
 * @Date: 2026-05-05 22:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 00:02:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { HOST } from '@constants'
import { IconKey } from '../../icons'
import { TEXTS } from '../ds'

import type { WithFilterProps } from '../../../types'

/** 密码 */
function Password({ filter }: WithFilterProps) {
  return (
    <ItemSetting
      style={_.mt.xs}
      icon={<IconKey />}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        open(`${HOST}/settings/password`)
      }}
      {...TEXTS.password}
    />
  )
}

export default observer(Password)
