/*
 * @Author: czy0729
 * @Date: 2022-03-15 23:56:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 14:26:00
 */
import React, { useCallback, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { FixedTextarea, Flex, Loading, Page, Text } from '@components'
import { _, userStore, useStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Chat from '../chat'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { ListViewInstance } from '@components'
import type { Ctx } from '../../types'

function Say() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const scrollViewRef = useRef<ListViewInstance>(null)

  const connectRefScrollView = useCallback(
    (ref: ListViewInstance) => {
      if (ref) {
        $.scrollViewRef = ref
        scrollViewRef.current = ref
      }
    },
    [$]
  )

  useEffect(() => {
    const init = async () => {
      await $.init(scrollViewRef.current)
      setTimeout(() => {
        $.scrollToBottom(scrollViewRef.current)
      }, 480)
    }
    init()

    return () => {
      $.scrollViewRef = null
    }
  }, [$])

  /** 响应式渲染 */
  return useObserver(() => {
    if (!$.isNew && !$.say._loaded) {
      return (
        <Flex style={_.container.screen} justify='center'>
          <Loading />
        </Flex>
      )
    }

    return (
      <Page style={stl(_.container.screen, _.container.header)}>
        <View style={_.container.flex}>
          <Chat forwardRef={connectRefScrollView} />
          {$.isNew && (
            <Text style={styles.notice} type='sub'>
              点击底部输入框录入吐槽内容
            </Text>
          )}
          {userStore.isWebLogin && (
            <FixedTextarea
              placeholder={$.isNew ? '新吐槽' : '回复吐槽, 长按头像@某人'}
              simple
              value={$.state.value}
              onChange={$.onChange}
              onClose={$.closeFixedTextarea}
              onSubmit={newValue => $.doSubmit(newValue, scrollViewRef.current, navigation)}
            />
          )}
        </View>
      </Page>
    )
  })
}

export default Say
