/*
 * @Author: czy0729
 * @Date: 2022-07-22 17:54:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 03:26:17
 */
import React from 'react'
import { Touchable, Flex } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import Flip from './flip'
import Content from './content'
import { styles } from './styles'
import { Props as ManageProps } from './types'
import { SHARE_MODE } from '@constants'

export { ManageProps }

const HIT_SLOP = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

export const Manage = ob(
  ({
    style,
    subjectId,
    collection = '',
    typeCn = '动画',
    horizontal,
    onPress
  }: ManageProps) => {
    if (SHARE_MODE) return null

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

    const passProps = {
      icon,
      size,
      type,
      collection: _collection,
      horizontal
    }
    return (
      <Flex style={styles.manage} justify='end' align='start'>
        <Touchable
          style={stl(styles.touch, style)}
          animate
          scale={0.9}
          hitSlop={HIT_SLOP}
          onPress={onPress}
        >
          <Flip subjectId={subjectId} height={40} {...passProps}>
            <Content {...passProps} />
          </Flip>
        </Touchable>
      </Flex>
    )
  }
)
