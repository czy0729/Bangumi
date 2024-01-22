/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-22 12:29:04
 */
import React from 'react'
import { Flex, Heatmap, Image, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { fixedRemote } from '@utils/user-setting'
import { IOS } from '@constants'
import { Ctx } from '../../types'
import { getHeaders } from '../utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Bgs({ avatar, more, onViewOrigin, onMore }, { $ }: Ctx) {
  const styles = memoStyles()
  const { bgs } = $.state
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
          />
          <Text style={styles.blurText} type='__plain__' bold align='center'>
            头像毛玻璃
          </Text>
        </Touchable>
        {bgs
          .filter((item, index) => {
            if (more) return true
            return index <= bgs.length / 2
          })
          .map((item: string, index: number) => (
            <Touchable
              key={index}
              style={stl(styles.bg, index % 2 === 0 && _.ml.md)}
              animate
              onPress={() => $.onSelectBg(item)}
              onLongPress={() => onViewOrigin(item, index)}
            >
              <Image
                key={item}
                src={fixedRemote(item)}
                width={styles.image.width}
                height={styles.image.height}
                headers={getHeaders(item)}
                radius
              />
              {!index && <Heatmap id='个人设置.查看原图' />}
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
}

export default obc(Bgs, COMPONENT)
