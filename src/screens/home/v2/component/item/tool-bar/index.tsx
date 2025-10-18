/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:50:55
 */
import React from 'react'
import { Flex } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import BtnEpNext from '../btn-ep-next'
import BtnFavor from '../btn-favor'
import BtnOrigin from '../btn-origin'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function ToolBar({ subjectId, typeCn, epStatus, name, name_cn, isFirst }: Props) {
  r(COMPONENT)

  return useObserver(() => (
    <Flex
      style={stl(
        styles.toolBar,
        typeCn === '游戏' && {
          marginBottom: -38
        }
      )}
    >
      <BtnOrigin subjectId={subjectId} />
      <BtnEpNext subjectId={subjectId} epStatus={epStatus} isFirst={isFirst} />
      <BtnFavor subjectId={subjectId} name={name} name_cn={name_cn} isFirst={isFirst} />
    </Flex>
  ))
}

export default ToolBar
