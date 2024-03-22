/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 23:14:56
 */
import React from 'react'
import { LogoHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import IconGroup from '../component/icon/group'
import IconMore from '../component/icon/more'
import { COMPONENT } from './ds'

function Header() {
  return <LogoHeader left={<IconGroup />} right={<IconMore style={_.ml.sm} />} />
}

export default ob(Header, COMPONENT)
