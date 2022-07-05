/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-05 21:37:47
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useRunAfter, useIsFocused, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { IOS } from '@constants'
import Header from './page-header'
import Bg from './bg'
import List from './list'
import Modal from './modal'
import Store from './store'
import { Ctx } from './types'

const Subject = (props, { $ }: Ctx) => {
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

  const { fixed, onScroll } = useOnScroll()
  return useObserver(() => (
    <>
      <Header fixed={fixed} />
      <Page>
        {IOS && <Bg />}
        <List onScroll={onScroll} />
        <Modal />
      </Page>
      <Heatmap id='条目' screen='Subject' />
    </>
  ))
}

export default ic(Store, Subject)
