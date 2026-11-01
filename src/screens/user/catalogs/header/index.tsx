/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:00:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:22:00
 *
 * 页面头部与右上角菜单
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _, userStore, useStore } from '@stores'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT, DATA, DATA_OTHER, TEXT_MENU_MANAGE } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  /**
   * 只在自己的目录页提供管理入口
   *  - 路由可能带数字 id 或用户名, 两者都算自己 (与 catalog 条目组件的判定一致)
   *  - 未登录不显示
   *  - 新建按钮与「管理目录」菜单项同步隐藏
   */
  const isMine =
    !!userStore.myId &&
    [userStore.myUserId, userStore.myId].map(id => String(id)).includes(String($.userId))

  const handleHeaderRight = useCallback(
    () => (
      <>
        {isMine && (
          <IconTouchable name='md-add' color={_.colorTitle} onPress={$.onToggleForm}>
            <Heatmap id='用户目录.新增目录' />
          </IconTouchable>
        )}
        <HeaderV2Popover
          data={isMine ? DATA : DATA_OTHER}
          onSelect={title => {
            t('用户目录.右上角菜单', {
              key: title
            })

            if (title === TEXT_MENU_MANAGE) {
              $.onToggleModal()
              return
            }

            if (title === TEXT_MENU_BROWSER) open($.url)
          }}
        />
      </>
    ),
    [$, isMine]
  )

  return (
    <HeaderV2
      title={$.params.userId ? 'TA的目录' : '我的目录'}
      alias='用户目录'
      hm={$.hm}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
