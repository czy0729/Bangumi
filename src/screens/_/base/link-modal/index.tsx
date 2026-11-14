/*
 * @Author: czy0729
 * @Date: 2021-06-11 17:29:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 全局剪贴板识别弹窗
 */
import { observer } from 'mobx-react'
import { Modal, Text, Touchable } from '@components'
import { uiStore } from '@stores'
import { r } from '@utils/dev'
import Form from './form'
import { useLinkModal } from './hooks'
import Preset from './preset'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function LinkModal() {
  r(COMPONENT)

  const styles = memoStyles()

  const { visible, link } = uiStore.linkModal
  const { show, inputRef, handleOpen, handleClose, handleSelect } = useLinkModal(visible)

  return (
    <>
      <Modal
        style={styles.modal}
        visible={visible}
        title='剪贴板'
        right={
          <Touchable onPress={handleOpen}>
            <Text size={14} type='sub'>
              预设
            </Text>
          </Touchable>
        }
        onClose={uiStore.closeLinkModal}
      >
        <Form inputRef={inputRef} link={link} />
      </Modal>
      <Preset show={show} onClose={handleClose} onSelect={handleSelect} />
    </>
  )
}

export default observer(LinkModal)
