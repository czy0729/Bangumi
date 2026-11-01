/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 弹窗打开时的初始化
 */
import { useEffect, useRef } from 'react'

import type { UseOpenedModalOptions } from './types'

/**
 * 打开时拉取列表, 并应用外部指定的展开项 / 编辑项
 * 只跟随 visible 变化; 其余依赖用 ref 取最新值, 避免排序变化时清掉 80ms 定时器
 */
export function useOpenedModal({
  visible,
  fetchCatalogs,
  setExpand,
  onSubjectEdit,
  defaultExpand,
  defaultEditItem,
  onOpened
}: UseOpenedModalOptions) {
  const openedRef = useRef(false)
  const latestRef = useRef({
    fetchCatalogs,
    setExpand,
    onSubjectEdit,
    defaultExpand,
    defaultEditItem,
    onOpened
  })
  latestRef.current = {
    fetchCatalogs,
    setExpand,
    onSubjectEdit,
    defaultExpand,
    defaultEditItem,
    onOpened
  }

  useEffect(() => {
    if (!visible) {
      openedRef.current = false
      return
    }

    if (openedRef.current) return
    openedRef.current = true

    const {
      fetchCatalogs: fetch,
      setExpand: applyExpand,
      onSubjectEdit: editSubject,
      defaultExpand: expandId,
      defaultEditItem: editItem,
      onOpened: opened
    } = latestRef.current

    opened()
    fetch()

    const timer = setTimeout(() => {
      if (expandId) {
        applyExpand([String(expandId)])
        editSubject()
      }

      if (editItem) editSubject(editItem)
    }, 80)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])
}
