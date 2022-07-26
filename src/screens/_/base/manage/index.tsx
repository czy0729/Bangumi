/*
 * @Author: czy0729
 * @Date: 2022-07-22 17:54:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 05:25:27
 */
import React from 'react'
import { Touchable, Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { titleCase } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as ManageProps } from './types'

export { ManageProps }

const HIT_SLOP = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

export const Manage = ob(
  ({ style, collection = '', typeCn = '动画', onPress }: ManageProps) => {
    let icon
    let type: any = 'icon'
    let size = 20
    if (collection.includes('过')) {
      icon = 'md-check'
      type = 'warning'
      size = 21
    } else if (collection.includes('在')) {
      icon = 'ios-star'
      type = 'primary'
    } else if (collection.includes('想')) {
      icon = 'md-favorite'
      type = 'main'
      size = 18
    } else if (collection.includes('搁置')) {
      icon = 'md-visibility-off'
      type = 'desc'
      size = 18
    } else if (collection.includes('抛弃')) {
      icon = 'md-delete-outline'
      type = 'desc'
    } else {
      icon = 'ios-star-outline'
    }

    let _collection: string = collection
    if (typeCn === '音乐') _collection = _collection.replace('看', '听')
    if (typeCn === '书籍') _collection = _collection.replace('看', '读')
    if (typeCn === '游戏') _collection = _collection.replace('看', '玩')

    return (
      <Touchable style={[styles.touch, style]} hitSlop={HIT_SLOP} onPress={onPress}>
        <Flex style={styles.manage} direction='column'>
          <Iconfont name={icon} size={size} color={_[`color${titleCase(type)}`]} />
          <Text style={_.mt.xxs} type={type} size={11}>
            {_collection}
          </Text>
        </Flex>
      </Touchable>
    )
  }
)
