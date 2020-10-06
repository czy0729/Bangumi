/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-06 18:06:29
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ManageModal } from '@screens/_'
import { observer } from '@utils/decorators'

function Modal(props, { $ }) {
  const { visible, subjectId, modal = {} } = $.state
  const { name, name_cn: nameCn } = $.subject(subjectId)
  return (
    <ManageModal
      visible={visible}
      subjectId={subjectId}
      title={nameCn || name || modal.title}
      desc={name || modal.desc}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
}

Modal.contextTypes = {
  $: PropTypes.object
}

export default observer(Modal)
