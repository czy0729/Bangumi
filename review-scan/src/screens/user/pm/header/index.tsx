/*
 * @Author: czy0729
 * @Date: 2022-08-19 11:16:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:43
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { TEXT_MENU_BROWSER } from '@constants'
import RelatedPM from '../component/related-pm'
import { Ctx } from '../types'
import ScrollNavButtons from './scroll-nav-buttons'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { list } = $.pmDetail

    let title = ''
    try {
      title = list?.[0]?.content?.match(/<strong>(.*?)<\/strong>/)?.[1]
      if (title) title = decoder(title)
    } catch (error) {}

    const showLength = list.length >= 8
    let headerTitle = '短信'
    if (showLength) headerTitle += ` (${list.length})`
    if (title) headerTitle += ` · ${title}`

    return (
      <HeaderV2
        title={headerTitle}
        hm={HM}
        headerTitleAlign='left'
        headerRight={() => (
          <>
            {showLength && (
              <ScrollNavButtons
                onScrollToTop={() => $.scrollToTop(true)}
                onScrollToBottom={() => $.scrollToBottom(true)}
              />
            )}
            <RelatedPM userId={$.params._userId} />
            <HeaderV2Popover
              data={DATA}
              onSelect={key => {
                if (key === TEXT_MENU_BROWSER) {
                  open($.url)

                  t('短信.右上角菜单', {
                    key
                  })
                }
              }}
            />
          </>
        )}
      />
    )
  })
}

export default Header
