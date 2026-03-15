/*
 * @Author: czy0729
 * @Date: 2024-01-21 07:52:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 07:13:11
 */
import React, { useCallback } from 'react'
import { HeaderV2 } from '@components'
import { useObserver } from '@utils/hooks'
import Check from '../component/check'
import { HM } from './ds'

function Header() {
  const handleHeaderRight = useCallback(() => <Check />, [])

  return useObserver(() => <HeaderV2 title='个人设置' hm={HM} headerRight={handleHeaderRight} />)
}

export default Header
