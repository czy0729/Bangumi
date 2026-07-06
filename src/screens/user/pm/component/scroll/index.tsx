/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:46:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 02:10:48
 */
import React, { useCallback, useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { FixedTextarea, Input, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import Chat from '../chat'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Scroll() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>(COMPONENT)
  const scrollViewRef = useRef<any>(null)

  const styles = memoStyles()

  const handleRef = useCallback(
    (ref: any) => {
      if (ref) {
        scrollViewRef.current = ref
        $.scrollViewRef = ref
      }
    },
    [$]
  )

  const handleTitleChange = useCallback(
    (text: string) => {
      $.onTitleChange(text)
    },
    [$]
  )

  const handleSubmit = useCallback(
    (value: string) => {
      return $.doSubmit(value, scrollViewRef.current, navigation)
    },
    [$, navigation]
  )

  const renderNewForm = () => {
    if (!$.userId) return null

    return (
      <>
        <View style={styles.form}>
          <Text>收件人: {$.params.userName}</Text>
        </View>
        <Input style={styles.ipt} placeholder='输入标题' onChangeText={handleTitleChange} />
      </>
    )
  }

  useEffect(() => {
    $.init(scrollViewRef.current)

    return () => {
      $.scrollViewRef = null
    }
  }, [$])

  return (
    <>
      {$.pmParams._loaded || $.pmDetail._loaded ? (
        <ScrollView
          ref={handleRef}
          contentContainerStyle={_.container.bottom}
          {...SCROLL_VIEW_RESET_PROPS}
        >
          <Chat />
        </ScrollView>
      ) : (
        <Loading />
      )}
      <FixedTextarea
        placeholder={$.userId ? '正文' : '回复'}
        value={$.state.value}
        onChange={$.onChange}
        onClose={$.closeFixedTextarea}
        onSubmit={handleSubmit}
      >
        {renderNewForm()}
      </FixedTextarea>
    </>
  )
}

export default observer(Scroll)
