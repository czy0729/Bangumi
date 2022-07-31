/*
 * @Author: czy0729
 * @Date: 2022-07-25 19:50:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-25 20:44:03
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { titleCase } from '@utils'
import { ob } from '@utils/decorators'

function Collection({ collection, typeCn, airtime }) {
  if (!collection && !airtime) return null

  let icon
  let type: any = 'icon'
  let size = 13
  if (collection.includes('过')) {
    icon = 'md-check'
    type = 'warning'
    size = 14
  } else if (collection.includes('在')) {
    icon = 'ios-star'
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
    icon = 'ios-star-outline'
  }

  let _collection = collection
  if (typeCn === '音乐') _collection = _collection.replace('看', '听')
  if (typeCn === '书籍') _collection = _collection.replace('看', '读')
  if (typeCn === '游戏') _collection = _collection.replace('看', '玩')

  return (
    <Flex style={_.mt.xs} justify='center'>
      {!!_collection && (
        <Iconfont
          style={_.mr.xs}
          name={icon}
          size={size}
          color={_[`color${titleCase(type)}`]}
        />
      )}
      <Text size={11} lineHeight={13} type={type} bold align='center'>
        {_collection}
        {!!_collection && !!airtime && ' · '}
        {airtime}
      </Text>
    </Flex>
  )
}

export default ob(Collection)
