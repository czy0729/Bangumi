/*
 * @Author: czy0729
 * @Date: 2024-01-22 13:12:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:20:09
 */
import React from 'react'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { arrGroup } from '@utils'
import { useObserver } from '@utils/hooks'
import { fixedRemote } from '@utils/user-setting'
import { getHeaders } from '../utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

const Avatars = ({ avatar }: Props) => {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <>
      {arrGroup($.state.avatars, 5).map((items, index) => (
        <Flex key={index} justify='between'>
          {items.map((item: string, idx: number) => {
            // 逻辑提取：判断是否为特殊位置（第3行第5个）
            const isSpecial = index === 2 && idx === 4
            const currentSrc = isSpecial ? avatar : fixedRemote(item, true)
            const onPress = () => $.onSelectAvatar(isSpecial ? '' : item)

            return (
              <Touchable key={item} style={_.mb.md} animate scale={0.9} onPress={onPress}>
                <Image
                  src={currentSrc}
                  headers={getHeaders(isSpecial ? avatar : item)}
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
  ))
}

export default Avatars
