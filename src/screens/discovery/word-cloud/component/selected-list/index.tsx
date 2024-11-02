/*
 * @Author: czy0729
 * @Date: 2024-09-27 03:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 05:04:42
 */
import React from 'react'
import { ActionSheet } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Comments from './comments'
import Subjects from './subjects'
import { COMPONENT } from './ds'

function SelectedList(_props, { $, navigation }: Ctx) {
  const { title } = $.state
  const isCollection = !!$.userId
  const length = isCollection ? $.selectedSubjects.length : $.selectedComment.length
  return (
    <ActionSheet
      show={$.state.show}
      title={`${title} (${length})`}
      height={length <= 2 ? 480 : length <= 4 ? 640 : 800}
      onClose={$.onClose}
    >
      {isCollection ? (
        <Subjects $={$} navigation={navigation} />
      ) : (
        <Comments $={$} navigation={navigation} />
      )}
    </ActionSheet>
  )
}

export default obc(SelectedList, COMPONENT)
