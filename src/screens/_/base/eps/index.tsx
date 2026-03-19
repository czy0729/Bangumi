/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:43:03
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import EpsComp from './eps'
import { COMPONENT } from './ds'

import type { Props as EpsProps } from './types'
export type { EpsProps }

/** 章节按钮组 */
export const Eps = observer((props: EpsProps) => {
  r(COMPONENT)

  return (
    <Component id='base-eps'>
      <EpsComp {...props} orientation={_.orientation} />
    </Component>
  )
})

export default Eps
