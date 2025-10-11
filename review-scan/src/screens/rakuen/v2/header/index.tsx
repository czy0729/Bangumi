/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:28:26
 */
import React from 'react'
import { LogoHeader } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import IconGroup from '../component/icon/group'
import IconMore from '../component/icon/more'
import { COMPONENT } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <LogoHeader navigation={navigation} left={<IconGroup />} right={<IconMore style={_.ml.sm} />} />
  )
}

export default ob(Header, COMPONENT)
