/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:04:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-29 06:27:19
 */
import React, { useCallback, useMemo } from 'react'
import { HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPLIT_LEFT, TEXT_MENU_SPLIT_RIGHT } from '@constants'
import { Ctx } from '../../types'
import { MENU_ACTIONS, MENU_DS } from './ds'
import { styles } from './styles'
import { Props } from './types'

function MenuComponent({ color }: Props) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const memoData = useMemo(
      () =>
        [
          `${TEXT_MENU_BROWSER}${TEXT_MENU_SPLIT_LEFT}${$.subjectId}${TEXT_MENU_SPLIT_RIGHT}`,
          ...MENU_DS
        ] as const,
      []
    )

    const handleSelect = useCallback((key: string) => {
      if (key in MENU_ACTIONS) {
        MENU_ACTIONS[key]($, navigation)
      } else {
        open($.url)
      }

      t('条目.右上角菜单', {
        subjectId: $.subjectId,
        key
      })
    }, [])

    return (
      <HeaderV2Popover style={styles.menu} data={memoData} color={color} onSelect={handleSelect} />
    )
  })
}

export default MenuComponent
