/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 12:57:29
 */
import React, { useCallback, useRef } from 'react'
import { Component, Page, StatusBar, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { TapListener } from '@_'
import { _, uiStore } from '@stores'
import { ic } from '@utils/decorators'
import {
  useFocusEffect,
  useIsFocusedRef,
  useMount,
  useObserver,
  useRunAfter
} from '@utils/hooks'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Header from './page-header'
import Bg from './bg'
import List from './list'
import Modal from './modal'
import Store from './store'
import { Ctx } from './types'

const Subject = (props, { $, navigation }: Ctx) => {
  const { yRef, fixed, onScroll } = useOnScroll()
  const isFocused = useIsFocusedRef()
  useRunAfter(async () => {
    setTimeout(() => {
      if (isFocused.current) $.setRendered()
    }, 480)

    await $.init()

    t('条目.查看', {
      subjectId: $.subjectId,
      type: $.type
    })
  })

  useMount(() => {
    return () => {
      setTimeout(() => {
        $.unRendered()
      }, 480)
    }
  })

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle(
        _.isDark ? 'light-content' : fixed ? 'dark-content' : 'light-content'
      )
    }, 80)
  })

  const scrollViewRef = useRef<any>(null)
  const forwardRef = useCallback(ref => {
    scrollViewRef.current = ref
  }, [])

  const onScrollFn = useCallback(
    evt => {
      $.onScroll(evt)
      onScroll(evt)
      uiStore.closeLikesGrid()
    },
    [$, onScroll]
  )
  const onScrollIntoViewIfNeeded = useCallback(
    (y: number) => {
      try {
        if (typeof scrollViewRef?.current?.scrollToOffset === 'function') {
          scrollViewRef.current.scrollToOffset({
            animated: true,
            offset: y + yRef.current
          })
        }
      } catch (error) {}
    },
    [yRef]
  )

  return useObserver(() => (
    <Component id='screen-subject'>
      <TapListener>
        <Page statusBarEvent={false}>
          {IOS && <Bg />}
          <List
            forwardRef={forwardRef}
            onScroll={onScrollFn}
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          />
          <Modal />
        </Page>
      </TapListener>
      <Header fixed={fixed} index={navigation.getState().index} />
      <Heatmap id='条目' screen='Subject' />
    </Component>
  ))
}

export default ic(Store, Subject)
