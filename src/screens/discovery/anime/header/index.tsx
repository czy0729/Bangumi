/*
 * @Author: czy0729
 * @Date: 2022-03-11 17:19:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 15:56:56
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import Extra from '../component/extra'
import { COMPONENT, HM } from './ds'

import type { Props } from './types'

function Header({ title = '找番剧', alias = 'Anime', hm }: Props) {
  r(COMPONENT)

  const handleHeaderRight = useCallback(() => <Extra title={alias} />, [alias])

  return useObserver(() => (
    <HeaderV2 title={title} alias={alias} hm={hm || HM} headerRight={handleHeaderRight} />
  ))
}

export default Header
