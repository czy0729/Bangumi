/*
 * @Author: czy0729
 * @Date: 2022-01-19 06:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-12 19:50:08
 */
import React from 'react'
import { Component, Flex, Highlight, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { navigationReference, showImageViewer, stl } from '@utils'
import { ob } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { IItemSettingBlock, ItemSettingBlockItemProps, ItemSettingBlockProps } from './types'

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
      <Component id='item-setting-block' data-key={title} style={stl(styles.container, style)}>
        {!!title && (
          <Flex>
            <Highlight type='title' size={size} bold value={filter}>
              {title}
            </Highlight>
            {!!thumb && (
              <Touchable
                style={_.ml.xs}
                onPress={() => {
                  if (STORYBOOK) {
                    const navigation = navigationReference()
                    if (navigation) {
                      navigation.push('Information', {
                        title,
                        message: [information],
                        images: thumb.map(item => item.url)
                      })
                      return
                    }
                  }

                  showImageViewer(thumb, 0, true)
                }}
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
  },
  COMPONENT
)

ItemSettingBlock.Item = Item

export { ItemSettingBlock }
