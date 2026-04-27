/*
 * @Author: czy0729
 * @Date: 2019-07-13 20:58:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 02:54:13
 */
import React, { useRef, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { feedback, stl } from '@utils'
import { r } from '@utils/dev'
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
export const Pagination = observer(
  ({
    style,
    inputStyle,
    input,
    pageTotal,
    heatmaps = {},
    onPrev = FROZEN_FN,
    onNext = FROZEN_FN,
    onChange = FROZEN_FN,
    onSearch = FROZEN_FN
  }: PaginationProps) => {
    r(COMPONENT)

    const inputRef = useRef(null)

    const [isFocused, setIsFocused] = useState(false)

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
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={() => {
            onSearch()
            inputRef.current?.onBlur()
            feedback(true)
          }}
        />
      </Flex>
    )

    return (
      <Component id='component-pagination'>
        <KeyboardAvoidingView
          behavior={IOS && isFocused ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
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

            {!IOS && isFocused && <KeyboardSpacer />}
          </SafeAreaBottom>
        </KeyboardAvoidingView>
      </Component>
    )
  }
)

export default Pagination
