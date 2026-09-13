/*
 * @Author: czy0729
 * @Date: 2026-05-05 22:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 00:09:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { HOST } from '@constants'
import { IconMail } from '../../icons'
import { TEXTS } from '../ds'

import type { WithFilterProps } from '../../../types'

/** 邮箱 */
function Email({ filter }: WithFilterProps) {
  return (
    <ItemSetting
      style={_.mt.xs}
      icon={<IconMail />}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        open(`${HOST}/settings/email`)
      }}
      {...TEXTS.email}
    />
  )
}

export default observer(Email)
