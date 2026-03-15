/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-15 06:51:31
 */
import React, { useCallback } from 'react'
import { Flex, Text, Touchable } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { copy } from '@utils'
import { useObserver } from '@utils/hooks'

import type { Ctx } from '../../../types'

function Name() {
  const { $ } = useStore<Ctx>()

  const handleLongPress = useCallback(() => {
    copy($.nickname)
  }, [$])

  return useObserver(() => {
    const { id, username } = $.usersInfo
    const userId = id || $.params._id
    const currentUid = $.state.originUid ? userId : username || userId
    const isRename = !!username && username != userId

    const handleUidLongPress = useCallback(() => {
      copy(currentUid)
    }, [currentUid])

    return (
      <Flex style={_.mt.md}>
        <Touchable onLongPress={handleLongPress}>
          <VerticalAlign text={$.nickname} type='__plain__' lineHeight={14} bold shadow>
            {$.nickname}
          </VerticalAlign>
        </Touchable>
        {!!(username || userId) && (
          <Touchable
            style={_.ml.xs}
            onPress={isRename ? $.toggleOriginUid : undefined}
            onLongPress={handleUidLongPress}
          >
            <Text type='__plain__' bold shadow>
              @{currentUid}
            </Text>
          </Touchable>
        )}
      </Flex>
    )
  })
}

export default Name
