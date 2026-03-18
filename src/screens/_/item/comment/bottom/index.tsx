/*
 * @Author: czy0729
 * @Date: 2025-01-26 13:42:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:58:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Link, Text } from '@components'
import { _ } from '@stores'
import { Stars } from '../../../base'

import type { Props } from './types'

function Bottom({ mainId, mainName, star }: Props) {
  return (
    <Flex style={_.mv.xs}>
      <Stars value={star} />
      {!!mainName && (
        <>
          {!!star && (
            <Text type='sub' size={11}>
              {' · '}
            </Text>
          )}
          <Link
            path='Subject'
            getParams={() => ({
              subjectId: mainId,
              _jp: mainName
            })}
          >
            <Text type='sub' size={11} numberOfLines={1} underline>
              {mainName}
            </Text>
          </Link>
        </>
      )}
    </Flex>
  )
}

export default observer(Bottom)
