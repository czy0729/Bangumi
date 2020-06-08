/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-06 05:39:05
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ManageModal } from '@screens/_'

function Modal(props, { $ }) {
  const { visible } = $.state
  const { name_cn: nameCn, name } = $.subject
  return (
    <ManageModal
      visible={visible}
      subjectId={$.params.subjectId}
      title={nameCn || name}
      desc={name}
      action={$.action}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
}

Modal.contextTypes = {
  $: PropTypes.object
}

export default observer(Modal)
