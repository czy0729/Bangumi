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
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN, ORIENTATION_PORTRAIT } from '@constants'
import { getMenus } from '../../ds'
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
    const menus = useMemo(() => getMenus(menu), [menu])

    const openIndex = menus.findIndex(item => item.key === 'Open')
    const handleRenderItem = useCallback(
      (item: { key: string }, index?: number, scale: boolean = true) => (
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

    const handleDragRelease = useCallback(data => {
      const _menu = []
      data.forEach(item => {
        if (item.key === 'Save') return
        if (item.key === 'Split') return _menu.push('Open')
        _menu.push(item.key)
      })
      setMenu(_menu)
    }, [])

    const handleCancel = useCallback(() => {
      onToggle()
      setTimeout(() => {
        setMenu(discoveryMenu)
      }, 80)
    }, [discoveryMenu, onToggle])

    const handleSave = useCallback(() => {
      onSubmit(menu)
      setTimeout(() => {
        onToggle()
      }, 80)
    }, [menu, onSubmit, onToggle])

    const elBtns = useMemo(
      () => dragging && <Btns setMenu={setMenu} onCancel={handleCancel} onSave={handleSave} />,
      [dragging, handleCancel, handleSave]
    )

    let data: any[]
    if (dragging) {
      data = [
        ...menus.slice(0, openIndex),
        {
          key: 'Split',
          name: '后面隐藏',
          text: '|',
          size: 20
        },
        ...menus.slice(openIndex + 1, menus.length)
      ]
    } else {
      data = menus.filter((_item, index) => index <= openIndex)
    }

    // 小屏或横屏设备, 把提交按钮放在顶部
    const isSpecLayout = _.isSmallDevice ? false : orientation === ORIENTATION_PORTRAIT
    const isScale = discoveryMenuNum <= 4

    // 小尺寸屏幕自定义时, 不显示图标, 以尽量能显示完整
    let itemHeight = styles.dragItem.height * (isScale ? 0.8 : 1)
    if (dragging && _.isSmallDevice) itemHeight = 48

    return (
      <View style={dragging && styles.dragging}>
        {isSpecLayout && dragging && (
          <Text style={styles.text} size={13} bold>
            按住拖拽排序，拖动到分割线左侧显示，右侧隐藏
          </Text>
        )}
        {!isSpecLayout && elBtns}
        {dragging ? (
          <DraggableGrid
            key={`${orientation}|${discoveryMenuNum}`}
            data={data}
            numColumns={discoveryMenuNum}
            itemHeight={itemHeight}
            renderItem={(item, index) => handleRenderItem(item, index, isScale)}
            onDragRelease={handleDragRelease}
          />
        ) : (
          <Flex wrap='wrap'>{data.map((item, index) => handleRenderItem(item, index, false))}</Flex>
        )}
        {isSpecLayout && elBtns}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default SortMenu
