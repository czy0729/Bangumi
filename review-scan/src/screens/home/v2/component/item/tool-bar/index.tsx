/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-20 07:41:22
 */
import React from 'react'
import { Flex } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { SubjectId, SubjectTypeCn } from '@types'
import BtnEpNext from '../btn-ep-next'
import BtnFavor from '../btn-favor'
import BtnOrigin from '../btn-origin'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar({
  subjectId,
  typeCn,
  epStatus,
  name,
  name_cn,
  isFirst
}: {
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  epStatus: string | number
  name: string
  name_cn: string
  isFirst: boolean
}) {
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

export default ob(ToolBar, COMPONENT)
