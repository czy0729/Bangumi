/*
 * @Author: czy0729
 * @Date: 2019-07-13 20:58:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 05:31:31
 */
import React, { useState, useRef } from 'react'
import { _ } from '@stores'
import { feedback, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { Component } from '../component'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { Input } from '../input'
import { Iconfont } from '../iconfont'
import { KeyboardSpacer } from '../keyboard-spacer'
import { Heatmap } from '../heatmap'
import { memoStyles } from './styles'
import { Props as PaginationProps } from './types'

export { PaginationProps }

/** 分页器 */
export const Pagination = ({
  style,
  inputStyle,
  input,
  heatmaps = {},
  onPrev = () => {},
  onNext = () => {},
  onChange = () => {},
  onSearch = () => {}
}: PaginationProps) => {
  const [show, setShow] = useState(false)
  const inputRef = useRef(null)
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='component-pagination'>
        <Flex style={stl(styles.container, style)}>
          <Flex.Item>
            <Touchable
              style={styles.touch}
              onPress={() => {
                onPrev()
                feedback(true)
              }}
            >
              <Flex style={styles.pagination} justify='center'>
                <Iconfont name='md-navigate-before' size={22} color={_.colorDesc} />
              </Flex>
              {!!heatmaps.prev && <Heatmap id={heatmaps.prev} />}
            </Touchable>
          </Flex.Item>
          <Flex.Item style={_.ml.lg}>
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
                  inputRef.current.onBlur()
                  feedback(true)
                }}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
              />
              {/** iOS keyboardType='number-pad' 并没有提交按钮, 需要自行实现提交按钮 */}
              {IOS && show && (
                <Touchable
                  style={styles.check}
                  onPress={() => {
                    setShow(false)
                    onSearch()
                    inputRef.current.onBlur()
                    feedback(true)
                  }}
                >
                  <Iconfont name='md-arrow-forward' size={16} color={_.colorDesc} />
                </Touchable>
              )}
            </Flex>
            {!!heatmaps.search && <Heatmap id={heatmaps.search} />}
          </Flex.Item>
          <Flex.Item style={_.ml.lg}>
            <Touchable
              style={styles.touch}
              onPress={() => {
                onNext()
                feedback(true)
              }}
            >
              <Flex style={styles.pagination} justify='center'>
                <Iconfont name='md-navigate-next' size={22} color={_.colorDesc} />
              </Flex>
              {!!heatmaps.next && <Heatmap id={heatmaps.next} />}
            </Touchable>
          </Flex.Item>
        </Flex>
        <KeyboardSpacer />
      </Component>
    )
  })
}
