/*
 * @Author: czy0729
 * @Date: 2024-01-22 13:12:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:26:40
 */
import React from 'react'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { arrGroup } from '@utils'
import { ob } from '@utils/decorators'
import { fixedRemote } from '@utils/user-setting'
import { Ctx } from '../../types'
import { getHeaders } from '../utils'
import { COMPONENT } from './ds'

function Avatars({ avatar }) {
  const { $ } = useStore<Ctx>()
  return (
    <>
      {arrGroup($.state.avatars, 5).map((items, index) => (
        <Flex key={index} justify='between'>
          {items.map((item: string, idx: number) => {
            if (index === 2 && idx === 4) {
              return (
                <Touchable
                  key={item}
                  style={_.mb.md}
                  animate
                  scale={0.9}
                  onPress={() => $.onSelectAvatar('')}
                >
                  <Image
                    src={avatar}
                    headers={getHeaders(avatar)}
                    size={60}
                    radius={30}
                    border={_.__colorPlain__}
                    borderWidth={0}
                    placeholder={false}
                    fallback
                    errorToHide
                  />
                </Touchable>
              )
            }

            return (
              <Touchable
                key={item}
                style={_.mb.md}
                animate
                scale={0.9}
                onPress={() => $.onSelectAvatar(item)}
              >
                <Image
                  src={fixedRemote(item, true)}
                  headers={getHeaders(item)}
                  size={60}
                  radius={30}
                  border={_.__colorPlain__}
                  borderWidth={0}
                  placeholder={false}
                  fallback
                  errorToHide
                />
              </Touchable>
            )
          })}
        </Flex>
      ))}
      <Text style={_.mt.md} align='center' size={10} bold type='sub'>
        (以上图来源自 pixiv)
      </Text>
    </>
  )
}

export default ob(Avatars, COMPONENT)
