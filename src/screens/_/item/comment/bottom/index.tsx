/*
 * @Author: czy0729
 * @Date: 2025-01-26 13:42:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 16:37:47
 */
import React from 'react'
import { Flex, Link, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { Stars } from '../../../base'
import { Props } from './types'

function Bottom({ mainId, mainName, star }: Props) {
  return useObserver(() => (
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
  ))
}

export default Bottom
