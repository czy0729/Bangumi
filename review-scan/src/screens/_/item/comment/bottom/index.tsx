/*
 * @Author: czy0729
 * @Date: 2025-01-26 13:42:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 13:44:41
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Stars } from '../../../base'

function Bottom({ navigation, mainId, mainName, star }) {
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
          <Text
            type='sub'
            size={11}
            underline
            numberOfLines={1}
            onPress={() => {
              if (navigation && mainId) {
                navigation.push('Subject', {
                  subjectId: mainId,
                  _jp: mainName
                })
              }
            }}
          >
            {mainName}
          </Text>
        </>
      )}
    </Flex>
  )
}

export default ob(Bottom)
