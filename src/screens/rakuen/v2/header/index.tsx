/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 05:25:17
 */
import React from 'react'
import { LogoHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import IconGroup from '../icon/group'
import IconMore from '../icon/more'

function Header() {
  return (
    <LogoHeader
      left={<IconGroup />}
      right={<IconMore style={_.ml.sm} />}
      // path='RakuenSetting'
    />
  )
}

export default obc(Header)
