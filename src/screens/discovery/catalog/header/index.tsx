/*
 * @Author: czy0729
 * @Date: 2023-04-11 15:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 06:00:29
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import {
  HOST,
  TEXT_MENU_BROWSER,
  TEXT_MENU_INFORMATION,
  TEXT_MENU_SPA,
  TEXT_MENU_SPLIT,
  TEXT_UPDATE_CATALOGS,
  URL_SPA
} from '@constants'
import { COMPONENT, DATA, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { toolBar } = $
  const memoData = useMemo(() => [...DATA, TEXT_MENU_SPLIT, ...toolBar], [toolBar])

  const handleSelect = useCallback(
    (title: string) => {
      if (title === TEXT_MENU_BROWSER) {
        open(`${HOST}/index/browser?orderby=collect`)

        t('目录.右上角菜单', { key: title })
        return
      }

      if (title === TEXT_MENU_SPA) {
        open(`${URL_SPA}/${getSPAParams('Catalog')}`)

        t('目录.右上角菜单', { key: title })
        return
      }

      if (title === TEXT_MENU_INFORMATION) {
        navigation.push('Information', {
          title: '目录整合',
          message: [
            '整合内容均为作者提前对热门目录的前一千页，进行了清洗无意义垃圾内容、提取标题关键字、类型分类合并等操作后得到的结果。',
            '默认仅支持菜单里的关键字，若想自定义关键字，可到公共搜索页面后，选择目录类型输入关键字点击搜索再进入本页面。',
            `通常半年会更新一次，最后一次更新时间为${TEXT_UPDATE_CATALOGS}。`
          ] as const
        })

        t('目录.右上角菜单', { key: title })
        return
      }

      $.onToolBar(title)
    },
    [$, navigation]
  )

  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconHeader
          style={_.mr.xs}
          name='md-person-outline'
          color={_.colorDesc}
          onPress={() => {
            navigation.push('Catalogs')
          }}
        />
        <HeaderV2Popover data={memoData} onSelect={handleSelect} />
      </>
    ),
    [handleSelect, memoData, navigation]
  )

  return <HeaderV2 title='目录' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
