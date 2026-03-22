/*
 * @Author: czy0729
 * @Date: 2024-10-14 06:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:47:51
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Milestone() {
  const { $, navigation } = useStore<Ctx>()

  const handlePress = useCallback(() => {
    const { id, username } = $.usersInfo
    const userId = username || id
    navigation.push('Milestone', {
      userId
    })

    t('空间.跳转', {
      to: 'WordCloud',
      userId
    })
  }, [$, navigation])

  return (
    <Touchable onPress={handlePress}>
      <Flex style={styles.icon} justify='center'>
        <Iconfont name='md-image-aspect-ratio' size={20} color={_.__colorPlain__} shadow />
      </Flex>
    </Touchable>
  )
}

export default observer(Milestone)
