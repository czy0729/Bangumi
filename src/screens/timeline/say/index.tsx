/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 18:00:14
 *
 * 吐槽页面入口与布局
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, FixedTextarea, HeaderPlaceholder, Page, Text } from '@components'
import { _, StoreContext, userStore } from '@stores'
import Chat from './component/chat'
import Heatmaps from './component/heatmaps'
import Header from './header'
import { useSayPage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'

/** 吐槽 */
function Say(props: NavigationProps) {
  const { id, $, navigation } = useSayPage(props)

  const handleSubmit = useCallback(
    (value: string) => {
      $.doSubmit(value, navigation)
    },
    [$, navigation]
  )

  return (
    <Component id='screen-say'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.screen} loaded={$.isNew || $.say._loaded}>
          <HeaderPlaceholder />
          <View style={_.container.flex}>
            <Chat />
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
                cursorEnd={$.state.cursorEnd}
                onChange={$.onChange}
                onClose={$.closeFixedTextarea}
                onSubmit={handleSubmit}
              />
            )}
          </View>
        </Page>
        <Header />
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Say)
