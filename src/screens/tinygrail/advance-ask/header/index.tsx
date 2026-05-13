/*
 * @Author: czy0729
 * @Date: 2024-12-17 00:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 00:01:41
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import { COMPONENT, HM } from './ds'

function Header() {
  const navigation = useNavigation(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <IconHeader
        name='md-info-outline'
        color={_.colorTinygrailPlain}
        onPress={() => {
          navigation.push('Information', {
            title: '买入推荐',
            message: [
              '当前计算方式：从活跃列表里面查找',
              '第一卖单股数 > 10 且 Max(流动股息，圣殿股息) > 4',
              'Max(流动股息，圣殿股息) / 第一卖单价 * 10 = 分数'
            ]
          })

          t('卖一推荐.提示')
        }}
      />
    ),
    [navigation]
  )

  return <TinygrailHeader title='买入推荐' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
