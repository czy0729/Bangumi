/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-03 06:10:38
 */
import React, { useCallback } from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { getSPAParams, open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, URL_SPA } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  r(COMPONENT)

  const navigation = useNavigation()

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconHeader
          name='md-person-outline'
          color={_.colorDesc}
          onPress={() => {
            navigation.push('Blogs')
          }}
        />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open(`${HOST}/blog`)
            } else if (title === TEXT_MENU_SPA) {
              open(`${URL_SPA}/${getSPAParams('DiscoveryBlog')}`)
            }

            t('全站日志.右上角菜单', {
              key: title
            })
          }}
        />
      </>
    ),
    [navigation]
  )

  return useObserver(() => (
    <HeaderV2 title='日志' alias='全站日志' hm={HM} headerRight={handleHeaderRight} />
  ))
}

export default Header
