/*
 * @Author: czy0729
 * @Date: 2024-03-07 06:19:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 16:48:22
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { appNavigate, formatNumber, HTMLDecode, info } from '@utils'
import { ob } from '@utils/decorators'
import Stars from '@tinygrail/_/stars'
import { Ctx } from '../../../types'

function Starforce() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <Flex style={_.mt.xs} justify='center' wrap='wrap'>
      <Touchable
        onPress={() => {
          info($.stars)
        }}
      >
        <Flex>
          <Stars value={$.stars} size={13} />
        </Flex>
      </Touchable>
      <Text style={_.ml.xs} type='tinygrailText' size={12}>
        星之力 +{formatNumber($.starForces, 0)}
      </Text>
      {!!$.myTemple.userStarForces && (
        <Text style={_.ml.xs} type='tinygrailText' size={12}>
          (累计贡献 {formatNumber($.myTemple.userStarForces, 0)})
        </Text>
      )}
      {!!($.subjectName && $.subjectHref) && (
        <>
          <Text style={_.mh.xs} type='tinygrailText' size={12}>
            /
          </Text>
          <Touchable
            style={{
              maxWidth: Math.floor(_.window.contentWidth * 0.64)
            }}
            onPress={() => {
              appNavigate($.subjectHref, navigation)
            }}
          >
            <Text type='tinygrailText' size={12} numberOfLines={1} underline>
              {HTMLDecode($.subjectName)}
            </Text>
          </Touchable>
        </>
      )}
      {!!$.subjectCast && (
        <>
          <Text style={_.mh.xs} type='tinygrailText' size={12}>
            /
          </Text>
          <Touchable
            style={{
              maxWidth: Math.floor(_.window.contentWidth * 0.64)
            }}
            onPress={() => {
              if (!$.subjectCast.href) return

              appNavigate($.subjectCast.href, navigation)
            }}
          >
            <Text type='tinygrailText' size={12} numberOfLines={1} underline={!!$.subjectCast.href}>
              {HTMLDecode($.subjectCast.name)}
            </Text>
          </Touchable>
        </>
      )}
    </Flex>
  )
}

export default ob(Starforce)
