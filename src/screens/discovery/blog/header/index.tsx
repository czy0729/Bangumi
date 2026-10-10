/*
 * @Author: czy0729
 * @Date: 2022-03-11 21:51:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 页面头部与右上角菜单
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, URL_SPA } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  const navigation = useNavigation(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconHeader
          style={_.mr.xs}
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

  return <HeaderV2 title='日志' alias='全站日志' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
