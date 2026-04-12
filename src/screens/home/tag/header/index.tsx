/*
 * @Author: czy0729
 * @Date: 2022-07-30 11:02:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:48:15
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPLIT } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconTouchable
          name='md-equalizer'
          size={20}
          color={_.colorDesc}
          onPress={() => {
            if ($.params._from === 'Typerank') {
              navigation.goBack()
              return
            }

            navigation.push('Typerank', {
              type: $.params.type || 'anime',
              tag: $.params.tag,
              _from: 'Tag'
            })
          }}
        />
        <HeaderV2Popover
          data={[...DATA, TEXT_MENU_SPLIT, ...$.toolBar]}
          onSelect={title => {
            if (title === TEXT_MENU_BROWSER) {
              open($.url)

              t('用户标签.右上角菜单', {
                key: title
              })
            } else {
              $.onToolBar(title)
            }
          }}
        />
      </>
    ),
    [$, navigation]
  )

  const { tag } = $.params

  return (
    <HeaderV2
      title={tag ? `${$.typeCn} · ${tag}` : `${$.typeCn}标签`}
      alias='用户标签'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
