/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:04:51
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { DraggableGrid } from '@components/@/react-native-draggable-grid/draggable-grid'
import { _ } from '@stores'
import { feedback, stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { getMenus } from '../../ds'
import { MenuItemType } from '../../types'
import Btn from '../btn'
import Btns from './btns'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const SortMenu = memo(
  ({
    styles,
    orientation,
    dragging = false,
    discoveryMenu = [],
    discoveryMenuNum = 4,
    onToggle = FROZEN_FN,
    onSubmit = FROZEN_FN
  }) => {
    const [menu, setMenu] = useState(discoveryMenu)
    const memoMenus = useMemo(() => getMenus(menu), [menu])
    const openIndex = memoMenus.findIndex(item => item.key === 'Open')

    const handleRenderItem = useCallback(
      (item: MenuItemType, index?: number, scale: boolean = true) => (
        <View
          key={item.key}
          style={stl(
            index > openIndex && item.key !== 'Cancel' && item.key !== 'Save' && styles.transparent,
            scale && styles.item
          )}
        >
          <Btn item={item} />
        </View>
      ),
      [openIndex, styles.item, styles.transparent]
    )

    const handleDragRelease = useCallback((data: MenuItemType[]) => {
      const menu = []
      data.forEach(item => {
        if (item.key === 'Save') return

        if (item.key === 'Split') {
          menu.push('Open')
          return
        }

        menu.push(item.key)
      })
      setMenu(menu)
    }, [])

    const handleCancel = useCallback(() => {
      onToggle()
      setMenu(discoveryMenu)
      feedback(true)
    }, [discoveryMenu, onToggle])

    const handleSave = useCallback(() => {
      onSubmit(menu)
      onToggle()
      feedback(true)
    }, [menu, onSubmit, onToggle])

    const elBtns = useMemo(
      () => dragging && <Btns setMenu={setMenu} onCancel={handleCancel} onSave={handleSave} />,
      [dragging, handleCancel, handleSave]
    )

    let data: MenuItemType[]
    if (dragging) {
      data = [
        ...memoMenus.slice(0, openIndex),
        {
          key: 'Split',
          name: '后面隐藏',
          text: '|',
          size: 20
        },
        ...memoMenus.slice(openIndex + 1, memoMenus.length)
      ]
    } else {
      data = memoMenus.filter((_item, index) => index <= openIndex)
    }

    const isScale = discoveryMenuNum <= 4

    // 小尺寸屏幕自定义时, 不显示图标, 以尽量能显示完整
    let itemHeight = styles.dragItem.height * (isScale ? 0.8 : 1)
    if (dragging && _.isSmallDevice) itemHeight = 48

    return (
      <View style={dragging && styles.dragging}>
        {dragging ? (
          <>
            {!_.isSmallDevice && (
              <Text style={styles.text} size={13} bold>
                按住拖拽排序，拖动到分割线左侧显示，右侧隐藏
              </Text>
            )}
            <DraggableGrid
              key={`${orientation}|${discoveryMenuNum}`}
              data={data}
              numColumns={discoveryMenuNum}
              itemHeight={itemHeight}
              renderItem={(item, index) => handleRenderItem(item, index, isScale)}
              onDragRelease={handleDragRelease}
            />
            {elBtns}
          </>
        ) : (
          <Flex wrap='wrap'>{data.map((item, index) => handleRenderItem(item, index, false))}</Flex>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default SortMenu
