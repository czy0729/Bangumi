/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-13 09:22:20
 */
import React from 'react'
import { ManageModal } from '@_'
import { memo, obc } from '@utils/decorators'

const defaultProps = {
  visible: false,
  subject: 0,
  name: '',
  nameCn: '',
  action: '看',
  onSubmit: Function.prototype,
  onClose: Function.prototype
}

const Modal = memo(
  ({ visible, subjectId, name, nameCn, action, onSubmit, onClose }) => {
    rerender('Subject.Modal.Main')

    return (
      <ManageModal
        visible={visible}
        subjectId={subjectId}
        title={nameCn || name}
        desc={name}
        action={action}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    )
  },
  defaultProps
)

export default obc((props, { $ }) => {
  rerender('Subject.Modal')

  return (
    <Modal
      visible={$.state.visible}
      subjectId={$.params.subjectId}
      name={$.subject.name}
      nameCn={$.subject.name_cn}
      action={$.action}
      onSubmit={$.doUpdateCollection}
      onClose={$.closeManageModal}
    />
  )
})
