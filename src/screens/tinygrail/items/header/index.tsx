/*
 * @Author: czy0729
 * @Date: 2025-05-02 05:54:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 22:49:17
 */
import React, { useCallback } from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useNavigation, useObserver } from '@utils/hooks'
import { ITEMS_NOTIFY } from '@tinygrail/_/characters-modal'
import TinygrailHeader from '@tinygrail/_/header'
import { COMPONENT, DS, HM } from './ds'
import { styles } from './styles'

function Header() {
  r(COMPONENT)

  const navigation = useNavigation()
  const handleSelect = useCallback(
    (title: string) => {
      const params = ITEMS_NOTIFY[title]
      if (!params) return

      navigation.push('Information', ITEMS_NOTIFY[title])
    },
    [navigation]
  )

  return useObserver(() => (
    <TinygrailHeader
      title='我的道具'
      hm={HM}
      headerRight={() => (
        <Popover data={DS} onSelect={handleSelect}>
          <Flex style={styles.touch} justify='center'>
            <Iconfont name='md-info-outline' size={20} color={_.colorTinygrailText} />
          </Flex>
        </Popover>
      )}
    />
  ))
}

export default Header
