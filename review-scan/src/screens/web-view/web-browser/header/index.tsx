/*
 * @Author: czy0729
 * @Date: 2025-08-06 15:52:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-08 19:16:34
 */
import React from 'react'
import { Flex, HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT, HM } from './ds'

function Header({ title, url, onRefresh }) {
  r(COMPONENT)

  return useObserver(() => (
    <HeaderV2
      title={title || '浏览器'}
      hm={HM}
      headerRight={() => (
        <Flex>
          <IconTouchable name='md-refresh' color={_.colorTitle} onPress={onRefresh} />
          <IconTouchable
            style={_.ml.xs}
            name='md-open-in-new'
            color={_.colorTitle}
            size={19}
            onPress={() => {
              open(url)
            }}
          />
        </Flex>
      )}
    />
  ))
}

export default Header
