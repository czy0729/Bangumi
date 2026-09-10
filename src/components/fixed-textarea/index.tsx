/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:34:04
 *
 * 带表情的回复框: 只编排 hook 返回值与渲染, 逻辑见 hooks.ts, 纯函数见 utils.ts
 */
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { FROZEN_FN, WEB } from '@constants'
import { KeyboardSpacer } from '../keyboard-spacer'
import Container from './container'
import Content from './content'
import {
  useKeyboard,
  usePanelController,
  useReplyHistory,
  useStorageSync,
  useTextareaValue
} from './hooks'
import Mask from './mask'
import Textarea from './textarea'
import ToolBar from './tool-bar'
import { getSubmitValue } from './utils'
import { COMPONENT } from './ds'

import type { TextInput } from 'react-native'
import type { Props as FixedTextareaProps, FixedTextareaInstance } from './types'
export type { Props as FixedTextareaProps, FixedTextareaInstance } from './types'

/** 带表情的回复框 */
const FixedTextarea = observer(
  forwardRef(function FixedTextarea(
    {
      marks = [],
      placeholder = '',
      simple = false,
      source = false,
      value: externalValue = '',
      cursorEnd,
      extraComponent = null,
      onClose = FROZEN_FN,
      onChange,
      onSubmit,
      children
    }: FixedTextareaProps,
    ref: React.Ref<FixedTextareaInstance>
  ) {
    r(COMPONENT)

    /** 输入框内部 TextInput 引用 */
    const textAreaRef = useRef<TextInput | null>(null)
    /** 最新输入值镜像, 供提交 / 卸载存草稿等非渲染期读取 */
    const valueRef = useRef('')

    /** simple 镜像, 供卸载存草稿等非渲染期读取 (生命周期内不变) */
    const simpleRef = useRef(simple)

    useEffect(() => {
      simpleRef.current = simple
    }, [simple])

    const forwardTextareaRef = useCallback((handle: { textAreaRef: TextInput }) => {
      textAreaRef.current = handle?.textAreaRef ?? null
    }, [])

    const {
      showSource,
      showSourceText,
      emojisGroupSelectedIndex,
      onToggleSource,
      onToggleSourceText,
      onEmojisGroupChange
    } = useStorageSync()

    const { history, replyHistory, lockHistory, setRecentUseBgm, saveReplyHistory, onLockHistory } =
      useReplyHistory()

    const { showKeyboardSpacer, keyboardHeight, onToggleKeyboard, resetKeyboardSpacer } =
      useKeyboard()

    /** 非简易模式收起输入框时保存草稿 */
    const saveDraft = useCallback(() => {
      if (!simpleRef.current && valueRef.current) saveReplyHistory(valueRef.current)
    }, [saveReplyHistory])

    const {
      showTextarea,
      showBgm,
      showReplyHistory,
      editing,
      handleFocus,
      handleBlur,
      handleShowBgm,
      handleHideBgm,
      handleShowReplyHistory,
      handleHideReplyHistory,
      collapse,
      focusInput
    } = usePanelController({
      textAreaRef,
      simple,
      onClose,
      saveDraft
    })

    const {
      value,
      selection,
      handleChange,
      handleSelectionChange,
      addSymbolText,
      selectBgm,
      resetValue
    } = useTextareaValue({
      value: externalValue,
      cursorEnd,
      onChange,
      valueRef,
      textAreaRef,
      focusInput,
      onSelectRecentBgm: setRecentUseBgm
    })

    /** 卸载时未发送的草稿保存到回复历史 */
    useEffect(() => {
      return () => {
        // valueRef 为镜像 ref, 卸载时须读取最新值, 不适用 exhaustive-deps 建议
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!simpleRef.current && valueRef.current) saveReplyHistory(valueRef.current)
      }
    }, [saveReplyHistory])

    useImperativeHandle(
      ref,
      () => ({
        /** 聚焦输入框 */
        onFocus: handleFocus
      }),
      [handleFocus]
    )

    /** 收起: 复位键盘占位状态后走失焦流程 */
    const handleClose = useCallback(() => {
      resetKeyboardSpacer()
      handleBlur()
    }, [resetKeyboardSpacer, handleBlur])

    /** 提交, 之后保存历史 (value 由 Textarea 触发提交时传入) */
    const handleSubmit = useCallback(
      (value: string) => {
        if (value === '') return

        onSubmit?.(getSubmitValue(value, source, showSource))
        saveReplyHistory(value)
        resetValue()
        collapse()
        handleClose()
      },
      [onSubmit, source, showSource, saveReplyHistory, resetValue, collapse, handleClose]
    )

    /** 遮罩点击, 保存草稿后收起 */
    const handleMask = useCallback(() => {
      handleClose()
    }, [handleClose])

    if (WEB) return null

    return (
      <>
        <Mask showTextarea={showTextarea} showBgm={showBgm} onMask={handleMask} />
        <Container>
          {children}
          <ToolBar
            simple={simple}
            showBgm={showBgm}
            showReplyHistory={showReplyHistory}
            showTextarea={showTextarea}
            onAddSymbolText={addSymbolText}
            onHideBgm={handleHideBgm}
            onHideReplyHistory={handleHideReplyHistory}
            onShowBgm={handleShowBgm}
            onShowReplyHistory={handleShowReplyHistory}
          />
          <Textarea
            forwardRef={forwardTextareaRef}
            simple={simple || !extraComponent}
            marks={marks}
            source={source}
            placeholder={placeholder}
            value={value}
            selection={selection}
            editing={editing}
            showSource={showSource}
            showSourceText={showSourceText}
            showTextarea={showTextarea}
            onAddSymbolText={addSymbolText}
            onChange={handleChange}
            onFocus={handleFocus}
            onSelectionChange={handleSelectionChange}
            onSubmit={handleSubmit}
            onToggleSource={onToggleSource}
            onToggleSourceText={onToggleSourceText}
          />
          <Content
            keyboardHeight={keyboardHeight}
            history={history}
            replyHistory={replyHistory}
            lockHistory={lockHistory}
            showBgm={showBgm}
            showReplyHistory={showReplyHistory}
            showTextarea={showTextarea}
            emojisGroupSelectedIndex={emojisGroupSelectedIndex}
            onChange={handleChange}
            onSelectBgm={selectBgm}
            onLockHistory={onLockHistory}
            onEmojisGroupChange={onEmojisGroupChange}
          />
          <KeyboardSpacer
            animate={!(showBgm || showReplyHistory) && !showKeyboardSpacer}
            onToggle={onToggleKeyboard}
          />
        </Container>
        {!editing && extraComponent}
      </>
    )
  })
)

export { FixedTextarea }

export default FixedTextarea
