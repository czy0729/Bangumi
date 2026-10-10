/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:56:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 11:00:00
 *
 * 头部: 右上角菜单 (小组讨论 / 浏览器打开)
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { HOST, TEXT_MENU_BROWSER } from '@constants'
import { EVENT } from '../ds'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  const navigation = useNavigation(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        name='md-menu'
        data={DATA}
        onSelect={title => {
          if (title === DATA[0]) {
            navigation.push('Group', {
              groupId: 'biweekly',
              _title: 'Bangumi半月刊'
            })
          } else if (title === TEXT_MENU_BROWSER) {
            open(`${HOST}/group/biweekly`)
          }

          t(EVENT.menu, {
            label: title
          })
        }}
      />
    ),
    [navigation]
  )

  return <HeaderV2 title='Bangumi 半月刊' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
