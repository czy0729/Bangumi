/*
 * @Author: czy0729
 * @Date: 2026-05-05 22:47:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 23:50:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { HOST } from '@constants'
import { IconLink } from '../../icons'
import { TEXTS } from '../ds'

import type { WithFilterProps } from '../../../types'

/** 网络服务 */
function NetworkServices({ filter }: WithFilterProps) {
  return (
    <ItemSetting
      style={_.mt.xs}
      icon={<IconLink />}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        open(`${HOST}/settings/network_services`)
      }}
      {...TEXTS.networdServices}
    />
  )
}

export default observer(NetworkServices)
