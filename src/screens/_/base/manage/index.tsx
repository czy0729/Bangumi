/*
 * @Author: czy0729
 * @Date: 2022-07-22 17:54:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 15:27:55
 */
import React from 'react'
import { Component, Flex, TextType, Touchable } from '@components'
import { _ } from '@stores'
import { open, stl } from '@utils'
import { ob } from '@utils/decorators'
import { HOST, WEB } from '@constants'
import { IconfontNames } from '@types'
import { IconTouchable } from '../../icon/touchable'
import Content from './content'
import Flip from './flip'
import { COMPONENT, HIT_SLOP } from './ds'
import { styles } from './styles'
import { Props as ManageProps } from './types'

export { ManageProps }

/** 打开全局条目管理框的按钮 */
export const Manage = ob(
  ({
    style,
    subjectId,
    collection = '',
    typeCn = '动画',
    horizontal,
    showRedirect,
    onPress
  }: ManageProps) => {
    if (WEB) {
      if (!subjectId) return null

      if (showRedirect || !collection) {
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
    }

    let icon: IconfontNames
    let type: TextType = 'icon'
    let size = 20
    if (collection.includes('过')) {
      icon = 'md-check'
      type = 'warning'
      size = 21
    } else if (collection.includes('在')) {
      icon = 'md-star'
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
      icon = 'md-star-outline'
    }

    let action: string = collection
    if (typeCn === '音乐') action = action.replace('看', '听')
    if (typeCn === '书籍') action = action.replace('看', '读')
    if (typeCn === '游戏') action = action.replace('看', '玩')

    const passProps = {
      icon,
      size,
      type,
      collection: action,
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
            onPress={() => {
              if (WEB) {
                open(`${HOST}/subject/${subjectId}`)
                return
              }

              onPress()
            }}
          >
            <Flip subjectId={subjectId} height={40} {...passProps}>
              <Content {...passProps} />
            </Flip>
          </Touchable>
        </Flex>
      </Component>
    )
  },
  COMPONENT
)

export default Manage
