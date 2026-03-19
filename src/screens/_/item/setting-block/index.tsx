/*
 * @Author: czy0729
 * @Date: 2022-01-19 06:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:28:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Highlight, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { navigationReference, open, showImageViewer, stl } from '@utils'
import { r } from '@utils/dev'
import { WEB } from '@constants'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { IItemSettingBlock, ItemSettingBlockItemProps, ItemSettingBlockProps } from './types'
export type { IItemSettingBlock, ItemSettingBlockProps, ItemSettingBlockItemProps }

const ItemSettingBlock: IItemSettingBlock = observer(
  ({
    style,
    show = true,
    title,
    information,
    informationType = 'sub',
    size = WEB ? 14 : 15,
    filter,
    sub,
    subStyle,
    thumb,
    url,
    align,
    children
  }) => {
    r(COMPONENT)

    if (!show) return null

    const styles = memoStyles()

    return (
      <Component
        id='item-setting-block'
        data-key={title}
        style={stl(styles.container, style, sub && styles.sub, sub && subStyle)}
      >
        {!!title && (
          <Flex>
            <Highlight type='title' size={size} bold value={filter}>
              {title}
            </Highlight>
            {!!thumb && (
              <Touchable
                style={styles.icon}
                onPress={() => {
                  if (WEB) {
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
            {!!url && (
              <Touchable
                style={styles.icon}
                onPress={() => {
                  open(url)
                }}
              >
                <Iconfont name='md-open-in-new' size={16} />
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
export default ItemSettingBlock
