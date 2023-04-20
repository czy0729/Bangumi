/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:52:56
 */
import React, { useCallback, useEffect, useRef } from 'react'
import { Page, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import {
  useIsFocusedRef,
  useMount,
  useObserver,
  useRunAfter,
  useViewport
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
  const isFocused = useIsFocusedRef()
  useRunAfter(async () => {
    setTimeout(() => {
      if (isFocused.current) $.setRendered()
    }, 400)

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
      }, 400)
    }
  })

  const scrollViewRef = useRef(undefined)
  const forwardRef = useCallback(ref => {
    scrollViewRef.current = ref
  }, [])

  const { visibleBottom, onScroll: onUseViewport } = useViewport()
  useEffect(() => {
    $.setState({
      visibleBottom
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleBottom])

  const { yRef, fixed, onScroll: onUseOnScroll } = useOnScroll()
  const onScroll = useCallback(
    evt => {
      onUseViewport(evt)
      onUseOnScroll(evt)
    },
    [onUseOnScroll, onUseViewport]
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
    <>
      <Header fixed={fixed} index={navigation.getState().index} />
      <Page>
        {IOS && <Bg />}
        <List
          forwardRef={forwardRef}
          onScroll={onScroll}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
        />
        <Modal />
      </Page>
      <Heatmap id='条目' screen='Subject' />
    </>
  ))
}

export default ic(Store, Subject)
