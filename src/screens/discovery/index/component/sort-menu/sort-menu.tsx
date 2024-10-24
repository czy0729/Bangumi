/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:56:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:52:03
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { DraggableGrid } from '@components/@/react-native-draggable-grid/draggable-grid'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { ORIENTATION_PORTRAIT } from '@constants'
import { getMenus } from '../../ds'
import Btn from '../btn'
import Btns from './btns'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const SortMenu = memo(
  ({ styles, orientation, dragging, discoveryMenu, discoveryMenuNum, onToggle, onSubmit }) => {
    const [menu, setMenu] = useState(discoveryMenu)
    const menus = useMemo(() => getMenus(menu), [menu])

    const openIndex = menus.findIndex(item => item.key === 'Open')
    const renderItem = useCallback(
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

    const onDragRelease = useCallback(data => {
      const _menu = []
      data.forEach(item => {
        if (item.key === 'Save') return
        if (item.key === 'Split') return _menu.push('Open')
        _menu.push(item.key)
      })
      setMenu(_menu)
    }, [])

    const onCancel = useCallback(() => {
      onToggle()
      setTimeout(() => {
        setMenu(discoveryMenu)
      }, 80)
    }, [discoveryMenu, onToggle])

    const onSave = useCallback(() => {
      onSubmit(menu)
      setTimeout(() => {
        onToggle()
      }, 80)
    }, [menu, onSubmit, onToggle])

    const elBtns = useMemo(
      () => dragging && <Btns setMenu={setMenu} onCancel={onCancel} onSave={onSave} />,
      [dragging, onCancel, onSave]
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

    const isPortrait = orientation === ORIENTATION_PORTRAIT
    const isScale = discoveryMenuNum <= 4

    return (
      <View style={dragging && styles.dragging}>
        {isPortrait && dragging && (
          <Text style={styles.text} size={13} bold>
            按住拖拽排序，拖动到分割线左侧显示，右侧隐藏
          </Text>
        )}
        {!isPortrait && elBtns}
        {dragging ? (
          <DraggableGrid
            key={`${orientation}|${discoveryMenuNum}`}
            data={data}
            numColumns={discoveryMenuNum}
            itemHeight={styles.dragItem.height * (isScale ? 0.8 : 1)}
            renderItem={(item, index) => renderItem(item, index, isScale)}
            onDragRelease={onDragRelease}
          />
        ) : (
          <Flex wrap='wrap'>{data.map((item, index) => renderItem(item, index, false))}</Flex>
        )}
        {isPortrait && elBtns}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default SortMenu
