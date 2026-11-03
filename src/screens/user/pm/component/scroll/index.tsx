/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:46:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 消息滚动区: 新建短信的表单与聊天列表, 挂载时初始化页面数据
 */
import { useCallback, useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { FixedTextarea, Input, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import Chat from '../chat'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ScrollView as RNScrollView } from 'react-native'
import type { FixedTextareaInstance } from '@components'
import type { Ctx } from '../../types'

function Scroll() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const fixedTextareaRef = useRef<FixedTextareaInstance>(null)

  const handleRef = useCallback(
    (ref: RNScrollView) => {
      if (ref) $.scrollViewRef = ref
    },
    [$]
  )

  const handleSubmit = useCallback(
    (value: string) => {
      return $.doSubmit(value, navigation)
    },
    [$, navigation]
  )

  useEffect(() => {
    $.init()

    return () => {
      $.scrollViewRef = null
    }
  }, [$])

  return (
    <>
      {$.pmParams?._loaded || $.pmDetail?._loaded ? (
        <ScrollView
          ref={handleRef}
          contentContainerStyle={_.container.bottom}
          onScroll={$.onScroll}
          scrollEventThrottle={80}
          {...SCROLL_VIEW_RESET_PROPS}
        >
          {!!$.userId && (
            <>
              <View style={styles.form}>
                <Text>收件人：{$.params.userName}</Text>
              </View>
              <Input
                style={styles.ipt}
                placeholder='输入标题（可选）'
                autoFocus
                returnKeyType='next'
                onChangeText={$.onTitleChange}
                onSubmitEditing={() => fixedTextareaRef.current?.onFocus?.()}
              />
            </>
          )}
          <Chat />
        </ScrollView>
      ) : (
        <Loading />
      )}
      <FixedTextarea
        ref={fixedTextareaRef}
        placeholder={$.userId ? '正文' : '回复'}
        value={$.state.value}
        onChange={$.onChange}
        onClose={$.closeFixedTextarea}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default observer(Scroll)
