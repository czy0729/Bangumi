/*
 * @Author: czy0729
 * @Date: 2023-02-14 03:22:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-25 15:22:51
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { rakuenStore } from '@stores'
import { r } from '@utils/dev'
import Block from '@screens/user/setting/component/block'
import BlockedKeyword from '../blocked-keyword'
import BlockedUsers from '../blocked-users'
import History from '../history'
import { handleDeleteBlockGroup } from './utils'
import { COMPONENT } from './ds'

import type { Props } from './types'

/** 屏蔽 */
function Blockeds({ onNavigate }: Props) {
  r(COMPONENT)

  const handleDelete = useCallback((item: string) => {
    handleDeleteBlockGroup(item)
  }, [])

  return (
    <>
      <BlockedUsers onNavigate={onNavigate} />
      <BlockedKeyword />
      <Block tip='屏蔽小组 · 条目'>
        <History
          data={rakuenStore.setting.blockGroups}
          information='对帖子所属小组名生效'
          onDelete={handleDelete}
        />
      </Block>
    </>
  )
}

export default observer(Blockeds)
