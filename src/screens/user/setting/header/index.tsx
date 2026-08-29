/*
 * @Author: czy0729
 * @Date: 2026-05-04 14:22:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 20:32:39
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import i18n from '@constants/i18n'
import Status from '../component/status'
import { HM } from './ds'

function Header() {
  const handleHeaderRight = useCallback(() => <Status />, [])

  return <HeaderV2 title={i18n.setting()} alias='设置' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
