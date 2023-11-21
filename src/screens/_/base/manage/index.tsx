/*
 * @Author: czy0729
 * @Date: 2022-07-22 17:54:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-20 06:37:52
 */
import React from 'react'
import { Touchable, Flex, Component } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open, stl } from '@utils'
import { ob } from '@utils/decorators'
import { HOST, SHARE_MODE } from '@constants'
import Flip from './flip'
import Content from './content'
import { styles } from './styles'
import { Props as ManageProps } from './types'

export { ManageProps }

const HIT_SLOP = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
} as const

/** 打开全局条目管理框的按钮 */
export const Manage = ob(
  ({
    style,
    subjectId,
    collection = '',
    typeCn = '动画',
    horizontal,
    onPress
  }: ManageProps) => {
    if (SHARE_MODE) {
      if (!subjectId) return null

      return (
        <Component id='base-manage' data-type='open-new' style={styles.openInNew}>
          <IconTouchable
            name='md-open-in-new'
            color={_.colorSub}
            size={20}
            onPress={() => {
              open(`${HOST}/subject/${subjectId}`)
            }}
          />
        </Component>
      )
    }

    let icon: string
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
      <Component id='base-manage'>
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
      </Component>
    )
  }
)
