/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-11 17:44:54
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import BtnEpNext from './btn-ep-next'
import BtnFavor from './btn-favor'
import BtnOrigin from './btn-origin'

function ToolBar({ subjectId, subject, isTop, isFirst }) {
  return (
    <Flex style={styles.toolBar}>
      <BtnOrigin subjectId={subjectId} isTop={isTop} />
      <BtnEpNext subjectId={subjectId} isFirst={isFirst} />
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
