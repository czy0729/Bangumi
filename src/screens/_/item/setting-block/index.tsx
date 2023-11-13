/*
 * @Author: czy0729
 * @Date: 2022-01-19 06:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 23:40:25
 */
import React from 'react'
import { Component, Flex, Highlight, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { showImageViewer, stl } from '@utils'
import { ob } from '@utils/decorators'
import Item from './item'
import { memoStyles } from './styles'
import {
  IItemSettingBlock,
  ItemSettingBlockProps,
  ItemSettingBlockItemProps
} from './types'

export { IItemSettingBlock, ItemSettingBlockProps, ItemSettingBlockItemProps }

const ItemSettingBlock: IItemSettingBlock = ob(
  ({
    style,
    show = true,
    title,
    information,
    informationType = 'sub',
    size = 16,
    filter,
    thumb,
    align,
    children
  }) => {
    if (!show) return null

    const styles = memoStyles()
    return (
      <Component
        id='item-setting-block'
        data-key={title}
        style={stl(styles.container, style)}
      >
        {!!title && (
          <Flex>
            <Highlight type='title' size={size} bold value={filter}>
              {title}
            </Highlight>
            {!!thumb && (
              <Touchable
                style={_.ml.xs}
                onPress={() => showImageViewer(thumb, 0, true)}
              >
                <Iconfont name='md-info-outline' size={16} />
              </Touchable>
            )}
          </Flex>
        )}
        {!!information && (
          <Highlight
            style={_.mt.xs}
            type={informationType}
            size={12}
            lineHeight={14}
            value={filter}
          >
            {information}
          </Highlight>
        )}
        <Flex style={_.mt.md} align={align}>
          {children}
        </Flex>
      </Component>
    )
  }
)

ItemSettingBlock.Item = Item

export { ItemSettingBlock }
