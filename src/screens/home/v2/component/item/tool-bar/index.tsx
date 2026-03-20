/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:38:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import BtnEpNext from '../btn-ep-next'
import BtnFavor from '../btn-favor'
import BtnOrigin from '../btn-origin'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function ToolBar({ subjectId, typeCn, epStatus, name, name_cn, isFirst }: Props) {
  r(COMPONENT)

  return (
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
  )
}

export default observer(ToolBar)
