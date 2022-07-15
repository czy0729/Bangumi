/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-14 17:22:26
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import BtnEpNext from '../btn-ep-next'
import BtnFavor from '../btn-favor'
import BtnOrigin from '../btn-origin'
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

export default ob(ToolBar)

const styles = _.create({
  toolBar: {
    marginRight: -_._wind / 2 - 3
  }
})
