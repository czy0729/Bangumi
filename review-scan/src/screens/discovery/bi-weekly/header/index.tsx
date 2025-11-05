/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:56:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 12:12:28
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { HOST, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <HeaderV2
      title='Bangumi 半月刊'
      hm={HM}
      headerRight={() => (
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

            t('半月刊.右上角菜单', {
              label: title
            })
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
