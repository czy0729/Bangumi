/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-22 15:35:00
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useRunAfter, useIsFocused, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import Header from './page-header'
import List from './list'
import Modal from './modal'
import Store from './store'

const Subject = (props, { $ }) => {
  const isFocused = useIsFocused()
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

  const { y, fixed, onScroll } = useOnScroll()
  return useObserver(() => (
    <>
      <Header y={y} fixed={fixed} />
      <Page>
        <List onScroll={onScroll} />
      </Page>
      <Modal />
      <Heatmap id='条目' screen='Subject' />
    </>
  ))
}

export default ic(Store, Subject)
