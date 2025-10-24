/*
 * @Author: czy0729
 * @Date: 2022-07-25 19:50:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 19:42:56
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { titleCase } from '@utils'
import { useObserver } from '@utils/hooks'

import type { TextType } from '@components'
import type { IconfontNames } from '@types'
import type { Props } from './types'

function Collection({ collection, typeCn, airtime }: Props) {
  return useObserver(() => {
    if (!collection && !airtime) return null

    let icon: IconfontNames
    let type: TextType = 'icon'
    let size = 13
    if (collection.includes('过')) {
      icon = 'md-check'
      type = 'warning'
      size = 14
    } else if (collection.includes('在')) {
      icon = 'md-star'
      type = 'primary'
    } else if (collection.includes('想')) {
      icon = 'md-favorite'
      type = 'main'
      size = 12
    } else if (collection.includes('搁置')) {
      icon = 'md-visibility-off'
      type = 'desc'
    } else if (collection.includes('抛弃')) {
      icon = 'md-delete-outline'
      type = 'desc'
    } else {
      icon = 'md-star-outline'
    }

    let _collection = collection
    if (typeCn === '音乐') _collection = _collection.replace('看', '听')
    if (typeCn === '书籍') _collection = _collection.replace('看', '读')
    if (typeCn === '游戏') _collection = _collection.replace('看', '玩')

    return (
      <Flex style={_.mt.xs} justify='center'>
        {!!_collection && (
          <Iconfont style={_.mr.xs} name={icon} size={size} color={_[`color${titleCase(type)}`]} />
        )}
        <Text size={11} lineHeight={13} type='sub' bold align='center'>
          <Text size={11} lineHeight={13} type={type} bold>
            {_collection}
          </Text>
          {!!_collection && !!airtime && ' · '}
          {airtime}
        </Text>
      </Flex>
    )
  })
}

export default Collection
