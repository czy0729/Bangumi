/*
 * @Author: czy0729
 * @Date: 2025-07-27 04:52:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-16 01:40:26
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import { COMPONENT, HM } from './ds'

/** 页面头部 */
function Header() {
  const navigation = useNavigation(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <IconTouchable
        style={_.mr.xs}
        name='md-gavel'
        size={18}
        color={_.colorTinygrailPlain}
        onPress={() => {
          navigation.push('TinygrailBid', {
            type: 'auction'
          })
        }}
      />
    ),
    [navigation]
  )

  return <TinygrailHeader title='每周萌王' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
