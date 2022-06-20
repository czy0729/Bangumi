/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:37:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-20 16:52:14
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
  onSubmit: () => {},
  onClose: () => {}
}

const Modal = memo(
  ({ visible, subjectId, name, nameCn, action, onSubmit, onClose }) => {
    global.rerender('Subject.Modal.Main')

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
  global.rerender('Subject.Modal')

  if (!$.isLogin) return null

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
