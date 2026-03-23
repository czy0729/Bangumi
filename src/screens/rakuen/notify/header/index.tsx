/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 05:56:25
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { HTML_NOTIFY, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  r(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        data={DATA}
        onSelect={title => {
          if (title === TEXT_MENU_BROWSER) {
            open(HTML_NOTIFY())

            t('电波提醒.右上角菜单', {
              key: title
            })
          }
        }}
      />
    ),
    []
  )

  return <HeaderV2 title='电波提醒' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
