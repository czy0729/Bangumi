/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 01:03:57
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE, TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <HeaderV2Popover
        name='md-menu'
        data={DATA}
        onSelect={title => {
          switch (title) {
            case TEXT_MENU_BROWSER:
              open($.url)
              break

            default:
              setTimeout(() => {
                navigation.setOptions({
                  title: `${title}频道`
                })
                $.toggleType(MODEL_SUBJECT_TYPE.getLabel(title))

                scrollToTop()
              }, 40)
              break
          }

          t('频道.右上角菜单', {
            key: title
          })
        }}
      />
    ),
    [$, navigation]
  )

  return (
    <HeaderV2 title={`${$.typeCn}频道`} alias='频道' hm={$.hm} headerRight={handleHeaderRight} />
  )
}

export default observer(Header)
