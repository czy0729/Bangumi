/*
 * @Author: czy0729
 * @Date: 2024-12-16 21:32:28
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import TinygrailHeader from '@tinygrail/_/header'
import { HM } from './ds'

import type { WithNavigation } from '@types'

function Header({ navigation }: WithNavigation) {
  const handleHeaderRight = useCallback(
    () => (
      <IconHeader
        name='md-info-outline'
        color={_.colorTinygrailPlain}
        onPress={() => {
          navigation.push('Information', {
            title: '高级功能',
            message: [
              '本栏目功能建立于作者自身想法，核心基于角色股息，仅供参考。',
              '普通用户每个功能 4 小时内只能刷新 1 次。',
              '高级用户为防止误刷新对服务器造成不必要的压力也有 1 分钟限制。',
              '高级用户的定义为付过费的用户，人工维护。',
              '功能算法有更好的可以反馈。'
            ]
          })

          t('高级分析.提示')
        }}
      />
    ),
    [navigation]
  )

  return <TinygrailHeader title='高级功能' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
