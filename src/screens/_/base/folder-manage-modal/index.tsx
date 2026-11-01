/*
 * @Author: czy0729
 * @Date: 2021-05-27 14:20:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 目录管理弹窗
 */
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { Component, Modal } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { FROZEN_FN, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { IconTouchable } from '../../icon/touchable'
import Create from './create'
import { useFolderManageModal } from './hooks/useFolderManageModal'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export { default as CatalogFormModal } from './catalog-form'

import type { Props as FolderManageModalProps } from './types'

export type { Props as CatalogFormModalProps } from './catalog-form/types'
export type { FolderManageModalProps }

/** 目录管理弹窗: 创建 / 修改 / 删除目录, 管理目录内的条目 */
function FolderManageModalComponent(props: FolderManageModalProps) {
  r(COMPONENT)

  const { id = 0, title = '目录', visible = false, onClose = FROZEN_FN } = props
  const styles = memoStyles()
  const vm = useFolderManageModal(props)

  /** 标题栏右侧的新建按钮, 创建或编辑态下隐藏 */
  const elBtnCreate =
    vm.edit || vm.create ? null : (
      <IconTouchable name='md-add' size={24} color={_.colorSub} onPress={() => vm.onCreate(true)} />
    )

  return (
    <Component id='base-folder-manage-modal'>
      <Modal
        style={styles.modal}
        visible={visible}
        title={title}
        right={elBtnCreate}
        onClose={onClose}
      >
        {vm.create === true ? (
          <ScrollView style={styles.scrollView} {...SCROLL_VIEW_RESET_PROPS}>
            <Create
              title={vm.title}
              desc={vm.desc}
              privacy={vm.privacy}
              onChange={vm.onChange}
              onCreate={vm.onCreate}
              onSubmitCatalog={vm.onSubmitCatalog}
            />
          </ScrollView>
        ) : (
          <List id={id} vm={vm} />
        )}
      </Modal>
    </Component>
  )
}

export const FolderManageModal = observer(FolderManageModalComponent)

export default FolderManageModal
