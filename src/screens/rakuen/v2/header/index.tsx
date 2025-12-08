/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:53:37
 */
import React, { useMemo } from 'react'
import { LogoHeader } from '@_'
import { _ } from '@stores'
import { useNavigation, useObserver } from '@utils/hooks'
import IconGroup from '../component/icon/group'
import IconMore from '../component/icon/more'
import { COMPONENT } from './ds'

function Header() {
  const navigation = useNavigation(COMPONENT)

  const elLeft = useMemo(() => <IconGroup />, [])
  const elRight = useMemo(() => <IconMore style={_.ml.sm} />, [])

  return useObserver(() => <LogoHeader navigation={navigation} left={elLeft} right={elRight} />)
}

export default Header
