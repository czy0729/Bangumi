/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 15:13:38
 */
import React from 'react'
import { Flex } from '@components'
import { ob } from '@utils/decorators'
import BtnEpNext from '../btn-ep-next'
import BtnFavor from '../btn-favor'
import BtnOrigin from '../btn-origin'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function ToolBar({ subjectId, subject, epStatus, isTop, isFirst }: Props) {
  return (
    <Flex style={styles.toolBar}>
      <BtnOrigin subjectId={subjectId} isTop={isTop} />
      <BtnEpNext subjectId={subjectId} epStatus={epStatus} isFirst={isFirst} />
      <BtnFavor subjectId={subjectId} subject={subject} isFirst={isFirst} />
    </Flex>
  )
}

export default ob(ToolBar, COMPONENT)
