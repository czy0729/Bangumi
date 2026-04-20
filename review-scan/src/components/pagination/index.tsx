/*
 * @Author: czy0729
 * @Date: 2019-07-13 20:58:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:54:27
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
import { Props as PaginationProps } from './types'

export { PaginationProps }

/** 分页器 */
export const Pagination = ({
  style,
  inputStyle,
  input,
  heatmaps = {},
  onPrev = FROZEN_FN,
  onNext = FROZEN_FN,
  onChange = FROZEN_FN,
  onSearch = FROZEN_FN
}: PaginationProps) => {
  r(COMPONENT)

  const [show, setShow] = useState(false)
  const inputRef = useRef(null)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='component-pagination'>
        <SafeAreaBottom type='paddingBottom'>
          <Flex style={stl(styles.container, style)}>
            <Flex.Item>
              <Touchable
                style={styles.touch}
                disabled={input == '1'}
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
        </SafeAreaBottom>
      </Component>
    )
  })
}

export default Pagination
