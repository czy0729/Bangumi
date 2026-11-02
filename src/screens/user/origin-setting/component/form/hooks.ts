/*
 * @Author: czy0729
 * @Date: 2026-11-02 20:34:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 表单输入、回车切换与参数插入逻辑
 */
import { useCallback, useRef, useState } from 'react'
import { useStore } from '@stores'
import { feedback } from '@utils'
import { COMPONENT } from './ds'

import type { NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native'
import type { InputInstance } from '@components'
import type { Ctx, FormKey, Selection } from '../../types'

/** 表单输入、回车切换与参数插入逻辑 */
export function useForm() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const urlInputRef = useRef<InputInstance>(null)
  const sortInputRef = useRef<InputInstance>(null)

  const [selection, setSelection] = useState<Selection>({ start: 0, end: 0 })

  const handleChange = useCallback(
    (key: FormKey) => (text: string) => {
      $.onChangeText(key, text)
    },
    [$]
  )

  const handleSelectionChange = useCallback(
    (evt: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
      setSelection(evt.nativeEvent.selection)
    },
    []
  )

  const handleInsert = useCallback(
    (key: string, insert?: boolean) => {
      const current = String($.state.edit.item.url || '')
      const { start, end } = selection

      const insertText = insert ? key : `[${key}]`
      const newValue = current.slice(0, start) + insertText + current.slice(end)

      const newCursor = start + insertText.length

      $.onChangeText('url', newValue)
      feedback(true)

      setSelection({
        start: newCursor,
        end: newCursor
      })

      urlInputRef.current?.inputRef?.focus()
    },
    [selection, $]
  )

  const handleSubmitEditing = useCallback(
    (key: FormKey) => () => {
      try {
        if (key === 'name') {
          urlInputRef.current.inputRef.focus()
          return
        }

        if (key === 'url') {
          sortInputRef.current.inputRef.focus()
          return
        }

        $.submitEdit()
      } catch {}
    },
    [$]
  )

  return {
    /** 网址输入框实例 */
    urlInputRef,

    /** 排序输入框实例 */
    sortInputRef,

    /** 网址输入框光标位置 */
    selection,

    /** 排序输入框内容 */
    sortValue: String($.state.edit.item.sort),

    /** 生成输入框内容变化回调 */
    handleChange,

    /** 记录网址输入框光标位置 */
    handleSelectionChange,

    /** 在光标处插入参数 */
    handleInsert,

    /** 生成输入框回车回调 */
    handleSubmitEditing,

    /** 保存表单 */
    submitEdit: $.submitEdit,

    /** 关闭表单 */
    closeEdit: $.closeEdit
  }
}
