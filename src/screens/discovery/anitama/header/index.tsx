/*
 * @Author: czy0729
 * @Date: 2022-03-11 18:03:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 12:37:23
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { NEWS, TEXT_MENU_BROWSER } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title='二次元资讯'
      alias='Anitama'
      hm={HM}
      headerRight={() => (
        <>
          <IconTouchable
            style={_.mr.xs}
            name={$.state.useWebView ? 'md-radio-button-on' : 'md-radio-button-off'}
            size={20}
            color={_.colorDesc}
            onPress={$.toggleUseWebView}
          />
          <HeaderV2Popover
            name='md-menu'
            data={[...NEWS.map(item => item.label), TEXT_MENU_BROWSER]}
            onSelect={title => {
              if (title === TEXT_MENU_BROWSER) {
                open($.url)
              } else {
                $.toggleType(title)
              }

              t('Anitama.右上角菜单', {
                key: title
              })
            }}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
