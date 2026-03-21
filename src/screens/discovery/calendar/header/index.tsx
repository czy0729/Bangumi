/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 16:03:03
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, TEXT_MENU_SPLIT, URL_SPA } from '@constants'
import IconNavigate from './icon-navigate'
import { COMPONENT, DATA, HM, TEXT_INFOR } from './ds'

import type { Ctx } from '../types'

function Header({ onScrollToOffset }) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const memoData = useMemo(() => [...DATA, TEXT_MENU_SPLIT, ...$.toolBar], [$.toolBar])

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconNavigate $={$} onScrollToOffset={onScrollToOffset} />
        <HeaderV2Popover
          data={memoData}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(`${HOST}/calendar`)

              t('每日放送.右上角菜单', {
                key: title
              })
              return
            }

            if (title === TEXT_MENU_SPA) {
              const url = `${URL_SPA}/${getSPAParams('Calendar')}`
              open(url)

              t('每日放送.右上角菜单', {
                key: title
              })
              return
            }

            if (title === TEXT_INFOR) {
              navigation.push('Information', {
                title: '每日放送数据',
                message: [
                  '客户端内每日放送数据是由多方数据整合而成的。',
                  '1：官方每日放送 API 作为当季放送原始列表项。',
                  '2：从 bangumi-data 库中获取放送具体时间和站点，若该番剧并没有具体时间，会默认收起以免长期占据显示位置，需要你自行展开列表。',
                  '3：标签和动画制作数据摘取自 https://yuc.wiki。'
                ]
              })

              t('每日放送.右上角菜单', {
                key: title
              })
              return
            }

            $.onToolBar(title)
          }}
        />
      </>
    ),
    [$, memoData, navigation, onScrollToOffset]
  )

  return <HeaderV2 title='每日放送' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
