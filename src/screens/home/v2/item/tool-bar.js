/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 15:48:27
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import BtnEpNext from './btn-ep-next'
import BtnFavor from './btn-favor'
import BtnOrigin from './btn-origin'
import { itemPadding } from './ds'

function ToolBar({ index, subjectId, subject }) {
  return (
    <Flex style={styles.toolBar}>
      <BtnOrigin subjectId={subjectId} subject={subject} />
      <BtnEpNext subjectId={subjectId} />
      <BtnFavor index={index} subjectId={subjectId} subject={subject} />
    </Flex>
  )
}

export default ob(ToolBar)

const styles = _.create({
  toolBar: {
    marginRight: -itemPadding / 2 - 3
  }
})
