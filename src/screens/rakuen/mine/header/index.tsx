/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { HTML_GROUP_MINE, TEXT_MENU_BROWSER } from '@constants'
import Extra from '../component/extra'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  r(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <Extra />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(HTML_GROUP_MINE())

              t('我的小组.右上角菜单', {
                key: title
              })
            }
          }}
        />
      </>
    ),
    []
  )

  return <HeaderV2 title='小组' headerTitleAlign='left' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
