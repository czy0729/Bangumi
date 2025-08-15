/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 05:44:03
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER, WEB } from '@constants'
import { Ctx } from '../types'
import { COMPONENT, DATA } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { list } = $.say
  const date = list?.[list?.length - 1]?.date
  return (
    <HeaderV2
      title={
        $.isNew ? '新吐槽' : `吐槽 (${list.length})${date ? ` · ${date.split(' ')?.[0]}` : ''}`
      }
      alias='吐槽'
      hm={$.hm}
      headerTitleAlign='left'
      headerRight={() => {
        if ($.isNew) return null

        return (
          <>
            {!WEB && list.length >= 10 && (
              <>
                <IconTouchable
                  style={_.mr._xs}
                  name='md-keyboard-arrow-up'
                  size={24}
                  color={_.colorTitle}
                  onPress={() => {
                    $.scrollToTop($.scrollViewRef, true)
                  }}
                />
                <IconTouchable
                  name='md-keyboard-arrow-down'
                  size={24}
                  color={_.colorTitle}
                  onPress={() => {
                    $.scrollToBottom($.scrollViewRef, true)
                  }}
                />
              </>
            )}
            <HeaderV2Popover
              data={DATA}
              onSelect={title => {
                if (title === TEXT_MENU_BROWSER) {
                  open($.url)

                  t('吐槽.右上角菜单', {
                    key: title
                  })
                }
              }}
            />
          </>
        )
      }}
    />
  )
}

export default ob(Header, COMPONENT)
