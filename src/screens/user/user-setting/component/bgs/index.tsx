/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 07:32:12
 */
import React from 'react'
import { Flex, Image, Text, Touchable } from '@components'
import { computeInViewY, InView } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { fixedRemote } from '@utils/user-setting'
import { IOS } from '@constants'
import { getHeaders } from '../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Bgs({ avatar, more, onViewOrigin, onMore }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const { bgs } = $.state
    const displayBgs = more ? bgs : bgs.slice(0, Math.ceil(bgs.length / 2) + 1)

    return (
      <>
        <Flex wrap='wrap'>
          <Touchable style={styles.bg} animate onPress={() => $.onSelectBg('')}>
            <Image
              key={avatar}
              src={fixedRemote(avatar)}
              headers={getHeaders(avatar)}
              width={styles.image.width}
              height={styles.image.height}
              radius
              blurRadius={IOS ? ($.state.avatar ? 64 : 16) : 8}
              fallback
              errorToHide
            />
            <Text style={styles.blurText} type='__plain__' bold align='center' shadow>
              头像毛玻璃
            </Text>
          </Touchable>

          {displayBgs.map((item: string, index: number) => (
            <Touchable
              key={item}
              style={stl(styles.bg, index % 2 === 0 && _.ml.md)}
              animate
              onPress={() => $.onSelectBg(item)}
              onLongPress={() => onViewOrigin(item, index)}
            >
              <InView y={computeInViewY(index, styles.bg.height, _.window.contentWidth * 0.72, 2)}>
                <Image
                  key={item}
                  src={fixedRemote(item)}
                  width={styles.image.width}
                  height={styles.image.height}
                  headers={getHeaders(item)}
                  radius
                  errorToHide
                />
              </InView>
            </Touchable>
          ))}
        </Flex>

        <Touchable style={[_.mt.md, _.mb.md]} onPress={onMore}>
          <Text align='center' size={13} bold>
            {more ? '没有更多了' : '点击加载更多'}
          </Text>
        </Touchable>

        <Text style={_.mt.md} align='center' size={10} bold type='sub'>
          长按可查看原图 (以上图来源自 pixiv)
        </Text>
      </>
    )
  })
}

export default Bgs
