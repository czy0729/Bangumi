/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 15:13:57
 */
import React, { useCallback, useRef } from 'react'
import { Page, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useMount, useRunAfter, useIsFocusedRef, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Header from './page-header'
import Bg from './bg'
import List from './list'
import Modal from './modal'
import Store from './store'
import { Ctx } from './types'

const Subject = (props, { $ }: Ctx) => {
  const isFocused = useIsFocusedRef()
  useRunAfter(async () => {
    setTimeout(() => {
      if (isFocused.current) $.rendered()
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
        $.unrendered()
      }, 400)
    }
  })

  const { yRef, fixed, onScroll } = useOnScroll()
  const scrollViewRef = useRef(undefined)
  const forwardRef = useCallback(ref => {
    scrollViewRef.current = ref
  }, [])
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
      <Header fixed={fixed} />
      <Page>
        {IOS && <Bg />}
        <List
          forwardRef={forwardRef}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
          onScroll={onScroll}
        />
        <Modal />
      </Page>
      <Heatmap id='条目' screen='Subject' />
    </>
  ))
}

export default ic(Store, Subject)
