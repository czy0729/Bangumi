/*
 * @Author: czy0729
 * @Date: 2019-07-13 20:58:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 08:55:39
 */
import React, { useRef, useState } from 'react'
import { _ } from '@stores'
import { feedback, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { FROZEN_FN, IOS } from '@constants'
import { Component } from '../component'
import { Flex } from '../flex'
import { Heatmap } from '../heatmap'
import { Iconfont } from '../iconfont'
import { Input } from '../input'
import { KeyboardSpacer } from '../keyboard-spacer'
import { SafeAreaBottom } from '../safe-area-bottom'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { EventKeys } from '@constants/events'
import type { Props as PaginationProps } from './types'

export type { PaginationProps }

/** 分页器 */
export function Pagination({
  style,
  inputStyle,
  input,
  pageTotal,
  heatmaps = {},
  onPrev = FROZEN_FN,
  onNext = FROZEN_FN,
  onChange = FROZEN_FN,
  onSearch = FROZEN_FN
}: PaginationProps) {
  r(COMPONENT)

  const [show, setShow] = useState(false)
  const inputRef = useRef(null)

  return useObserver(() => {
    const styles = memoStyles()

    /** 左右按钮（前后翻页） */
    const renderButton = (
      name: 'md-navigate-before' | 'md-navigate-next',
      onPress: () => void,
      heatmapId?: EventKeys,
      disabled?: boolean
    ) => (
      <Touchable
        style={stl(styles.touch, disabled && styles.disabled)}
        disabled={disabled}
        onPress={() => {
          onPress()
          feedback(true)
        }}
      >
        <Flex style={styles.pagination} justify='center'>
          <Iconfont name={name} size={22} color={_.colorDesc} />
        </Flex>
        {!!heatmapId && <Heatmap id={heatmapId} />}
      </Touchable>
    )

    /** 输入框 + iOS 提交按钮 */
    const renderInput = () => (
      <Flex>
        <Input
          ref={ref => (inputRef.current = ref)}
          style={stl(styles.input, inputStyle)}
          value={input}
          keyboardType='number-pad'
          placeholder='页'
          showClear={false}
          returnKeyType='search'
          returnKeyLabel='跳转'
          onChange={e => {
            setShow(true)
            onChange(e)
          }}
          onSubmitEditing={() => {
            onSearch()
            inputRef.current?.onBlur()
            feedback(true)
          }}
          onFocus={() => {
            setShow(true)
          }}
          onBlur={() => {
            setShow(false)
          }}
        />
        {IOS && show && (
          <Touchable
            style={styles.check}
            onPress={() => {
              setShow(false)
              onSearch()
              inputRef.current?.onBlur()
              feedback(true)
            }}
          >
            <Iconfont name='md-arrow-forward' size={16} color={_.colorDesc} />
          </Touchable>
        )}
      </Flex>
    )

    return (
      <Component id='component-pagination'>
        <SafeAreaBottom type='paddingBottom'>
          <Flex style={stl(styles.container, style)}>
            <Flex.Item>
              {renderButton('md-navigate-before', onPrev, heatmaps.prev, input === '1')}
            </Flex.Item>

            <Flex.Item style={_.ml.lg}>
              {renderInput()}
              {!!heatmaps.search && <Heatmap id={heatmaps.search} />}
            </Flex.Item>

            <Flex.Item style={_.ml.lg}>
              {renderButton(
                'md-navigate-next',
                onNext,
                heatmaps.next,
                pageTotal && String(pageTotal) === input ? true : false
              )}
            </Flex.Item>
          </Flex>
          <KeyboardSpacer />
        </SafeAreaBottom>
      </Component>
    )
  })
}

export default Pagination
