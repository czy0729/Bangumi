/*
 * @Author: czy0729
 * @Date: 2022-11-24 15:39:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:56:42
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <IconTouchable
        name='md-info-outline'
        color={_.colorDesc}
        onPress={() => {
          navigation.push('Information', {
            title: '自定义跳转',
            message: [
              '目前为实验性。',
              '本功能对应到具体条目，通常用于给单独条目添加特定跳转。',
              '后续会开发云同步和共享功能，请慎重添加带个人信息隐私的链接。'
            ]
          })
        }}
      />
    ),
    [navigation]
  )

  return <HeaderV2 title={$.params.name || '自定义跳转'} hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
