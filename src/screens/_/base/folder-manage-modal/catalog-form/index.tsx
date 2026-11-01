/*
 * @Author: czy0729
 * @Date: 2026-11-01 16:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 21:32:52
 *
 * 目录表单弹窗: 新建 / 编辑目录, 目录页与目录详情页共用
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler } from 'react-native'
import { observer } from 'mobx-react'
import { Modal } from '@components'
import { userStore } from '@stores'
import { feedback, info } from '@utils'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { memoStyles } from '../styles'
import Create from '../create'
import { createCatalog, editCatalog } from '../utils'
import { COMPONENT } from './ds'

import type { Privacy } from '../types'
import type { Props } from './types'

function CatalogFormModal({
  visible = false,
  catalogId,
  defaultTitle = '',
  defaultDesc = '',
  defaultPrivacy = '1',
  onClose,
  onSuccess
}: Props) {
  r(COMPONENT)

  const styles = memoStyles()
  const [title, setTitle] = useState(defaultTitle)
  const [desc, setDesc] = useState(defaultDesc)
  const [privacy, setPrivacy] = useState<Privacy>(defaultPrivacy === '0' ? '0' : '1')

  /** 每次打开重建表单, 避免输入框沿用上一次的初值 */
  const [openKey, setOpenKey] = useState(0)

  /** 是否编辑: Id 可能是数字或字符串, 空值才算新建 */
  const isEdit = catalogId != null && catalogId !== ''

  /** 表单只依赖全局登录态的授权码 (目录详情里的那份由弹窗自己维护) */
  const formhash = userStore.formhash

  /** 提交在途标记, 避免连点重复创建 */
  const submittingRef = useRef(false)

  /** 每次打开重置为当前目录的内容 */
  useEffect(() => {
    if (!visible) return

    setTitle(defaultTitle)
    setDesc(defaultDesc)
    setPrivacy(defaultPrivacy === '0' ? '0' : '1')
    setOpenKey(key => key + 1)
    submittingRef.current = false
    // 只在打开时重置, 打开期间的入参变化不覆盖用户输入
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  /** 提交需要授权码, 没有时用一次个人中心请求补齐 */
  useEffect(() => {
    if (!visible || formhash) return

    const fetchFormhash = async () => {
      try {
        await userStore.doCheckCookie()
      } catch {}
    }
    fetchFormhash()
  }, [visible, formhash])

  /** 安卓返回键: 表单打开时先关表单, 避免冒泡到全局退出逻辑 */
  useEffect(() => {
    if (IOS || !visible) return

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose?.()
      return true
    })

    return () => subscription.remove()
  }, [visible, onClose])

  const handleChange = useCallback((value: string, key?: 'title' | 'desc' | 'privacy' | 'content') => {
    if (key === 'title') setTitle(value)
    else if (key === 'desc') setDesc(value)
    else if (key === 'privacy') setPrivacy(value === '1' ? '1' : '0')
  }, [])

  const handleSubmit = useCallback(() => {
    if (!title.length) {
      info('请填写目录标题')
      return
    }

    if (!desc.length) {
      info('请填写目录介绍')
      return
    }

    if (submittingRef.current) return

    submittingRef.current = true
    const done = () => {
      submittingRef.current = false
      info(isEdit ? '已保存目录' : '已创建目录')
      feedback()
      onSuccess?.()
      onClose?.()
    }

    const result = isEdit
      ? editCatalog({ catalogId, formhash, title, desc, privacy }, done)
      : createCatalog({ formhash, title, desc, privacy }, done)

    // 授权码缺失等同步失败时允许重试
    if (!result) submittingRef.current = false
  }, [catalogId, desc, formhash, isEdit, onClose, onSuccess, privacy, title])

  return (
    <Modal
      style={styles.modal}
      visible={visible}
      title={isEdit ? '编辑目录' : '新建目录'}
      focus
      maskClosable={false}
      onClose={onClose}
    >
      <Create
        key={openKey}
        title={title}
        desc={desc}
        privacy={privacy}
        titleText=''
        showTitle={false}
        showCancel={false}
        onChange={handleChange}
        onCreate={() => onClose?.()}
        onSubmitCatalog={handleSubmit}
      />
    </Modal>
  )
}

export default observer(CatalogFormModal)
