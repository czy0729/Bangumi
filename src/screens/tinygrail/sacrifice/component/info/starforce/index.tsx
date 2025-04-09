/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:19:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:15:16
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import Stars from '@tinygrail/_/stars'
import { Ctx } from '../../../types'

function Starforce() {
  const { $, navigation } = useStore<Ctx>()
  if (!$.starForces) return null

  return (
    <Flex style={_.mt.xs} justify='center'>
      <Stars value={$.stars} size={15} />
      <Text style={_.ml.xs} type='tinygrailText' size={12}>
        星之力 +{formatNumber($.starForces, 0)}
      </Text>
      {!!$.myTemple.userStarForces && (
        <Text style={_.ml.xs} type='tinygrailText' size={12}>
          (贡献过 {formatNumber($.myTemple.userStarForces, 0)})
        </Text>
      )}
      {!!$.chara.subjectName && (
        <>
          <Text style={_.mh.xs} type='tinygrailText' size={12}>
            /
          </Text>
          <Touchable
            style={{
              maxWidth: 128
            }}
            onPress={() => {
              navigation.push('Subject', {
                subjectId: $.chara.subjectId
              })
            }}
          >
            <Text type='tinygrailText' size={12} numberOfLines={1} underline={!!$.chara.subjectId}>
              {$.chara.subjectName}
            </Text>
          </Touchable>
        </>
      )}
    </Flex>
  )
}

export default ob(Starforce)
