/*
 * @Author: czy0729
 * @Date: 2021-10-18 11:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-27 16:03:35
 */
import React, { useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { DraggableGrid } from '@components/@/react-native-draggable-grid/draggable-grid'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { IOS } from '@constants'
import Btn from './btn'
import { getMenus, MenuMapType } from './ds'

const defaultProps = {
  dragging: false,
  discoveryMenu: [],
  onToggle: Function.prototype,
  onSubmit: Function.prototype
}

const SortMenu = memo(
  ({ dragging, discoveryMenu, onToggle, onSubmit }) => {
    rerender('Discovery.SortMenu.Main')

    const [menu, setMenu] = useState<MenuMapType[]>(discoveryMenu)
    const menus = useMemo(() => getMenus(menu), [menu])

    const openIndex = menus.findIndex(item => item.key === 'Open')
    const renderItem = useCallback(
      (item, index) => (
        <View
          key={item.key}
          style={
            index > openIndex &&
            item.key !== 'Cancel' &&
            item.key !== 'Save' &&
            styles.transparent
          }
        >
          <Btn item={item} />
        </View>
      ),
      [openIndex]
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
      setMenu(discoveryMenu)
    }, [discoveryMenu, onToggle])
    const onSave = useCallback(() => {
      onSubmit(menu)
      onToggle()
    }, [menu, onSubmit, onToggle])

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
    return (
      <View style={_.container.wind}>
        {dragging && (
          <Text style={styles.text} bold>
            按住拖拽排序，拖动到分割线左侧显示，右侧隐藏
          </Text>
        )}
        <DraggableGrid
          data={data}
          numColumns={4}
          renderItem={renderItem}
          onDragRelease={onDragRelease}
        />
        {dragging && (
          <Flex style={styles.btns} justify='end'>
            <Flex.Item>
              <Touchable onPress={onCancel}>
                <Flex style={styles.btn} justify='center'>
                  <Text type='__plain__' bold>
                    取消
                  </Text>
                </Flex>
              </Touchable>
            </Flex.Item>
            <Flex.Item style={_.ml.md}>
              <Touchable onPress={onSave}>
                <Flex style={styles.btn} justify='center'>
                  <Text type='__plain__' bold>
                    保存
                  </Text>
                </Flex>
              </Touchable>
            </Flex.Item>
          </Flex>
        )}
      </View>
    )
  },
  defaultProps,
  undefined,
  undefined
)

export default obc((props, { $ }) => {
  rerender('Discovery.SortMenu')
  return (
    <SortMenu
      dragging={$.state.dragging}
      discoveryMenu={$.discoveryMenu}
      onToggle={$.toggleDragging}
      onSubmit={$.saveDiscoveryMenu}
    />
  )
})

const size = 44 * _.ratio

const styles = _.create({
  transparent: {
    opacity: _.select(0.6, 0.4)
  },
  text: {
    marginTop: IOS ? _.sm : _.md,
    marginLeft: _.md,
    marginBottom: _.md
  },
  btns: {
    marginTop: _.md + 8,
    marginBottom: _.md
  },
  btn: {
    height: size,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: size
  }
})
