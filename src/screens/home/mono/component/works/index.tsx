/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:05:56
 */
import React from 'react'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Works from './works'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function WorksWrap() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.works.length) return null

    return <Works navigation={navigation} styles={memoStyles()} style={_.mt.md} works={$.works} />
  })
}

export default WorksWrap
