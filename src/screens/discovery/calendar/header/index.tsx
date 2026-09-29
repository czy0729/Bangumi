/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, TEXT_MENU_SPLIT, URL_SPA } from '@constants'
import IconNavigate from './icon-navigate'
import { COMPONENT, DATA, HM, TEXT_INFOR } from './ds'

import type { Ctx } from '../types'
import type { Props } from './types'

function Header({ onScrollToOffset }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)
  const { toolBar } = $

  const handleHeaderRight = useCallback(() => {
    const data = [...DATA, TEXT_MENU_SPLIT, ...toolBar]

    return (
      <>
        <IconNavigate onScrollToOffset={onScrollToOffset} />
        <HeaderV2Popover
          data={data}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(`${HOST}/calendar`)
            } else if (title === TEXT_MENU_SPA) {
              open(`${URL_SPA}/${getSPAParams('Calendar')}`)
            } else if (title === TEXT_INFOR) {
              navigation.push('Information', {
                title: '每日放送数据',
                message: [
                  '客户端内每日放送数据是由多方数据整合而成的。',
                  '1：官方每日放送 API 作为当季放送原始列表项。',
                  '2：从 bangumi-data 库中获取放送具体时间和站点，若该番剧并没有具体时间，会默认收起以免长期占据显示位置，需要你自行展开列表。',
                  '3：标签和动画制作数据摘取自 https://yuc.wiki。'
                ]
              })
            } else {
              $.onToolBar(title)
              return
            }

            t('每日放送.右上角菜单', {
              key: title
            })
          }}
        />
      </>
    )
  }, [$, navigation, onScrollToOffset, toolBar])

  return <HeaderV2 title='每日放送' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
