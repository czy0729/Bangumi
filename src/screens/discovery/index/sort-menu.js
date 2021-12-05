/*
 * @Author: czy0729
 * @Date: 2021-10-18 11:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 11:23:04
 */
import React, { useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { DraggableGrid } from '@components/@/react-native-draggable-grid/draggable-grid'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { IOS, ORIENTATION_PORTRAIT } from '@constants'
import Btn from './btn'
import { getMenus } from './ds'

const defaultProps = {
  styles: {},
  orientation: _.orientation,
  dragging: false,
  discoveryMenu: [],
  onToggle: Function.prototype,
  onSubmit: Function.prototype
}

const SortMenu = memo(
  ({ styles, orientation, dragging, discoveryMenu, onToggle, onSubmit }) => {
    rerender('Discovery.SortMenu.Main')

    const [menu, setMenu] = useState(discoveryMenu)
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
      [openIndex, styles.transparent]
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

    const btns = useMemo(
      () =>
        dragging && (
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
        ),
      [styles.btn, styles.btns, dragging, onCancel, onSave]
    )

    const isPortrait = orientation === ORIENTATION_PORTRAIT
    let data
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
      <View>
        {isPortrait && dragging && (
          <Text style={styles.text} bold>
            按住拖拽排序，拖动到分割线左侧显示，右侧隐藏
          </Text>
        )}
        {!isPortrait && btns}
        <DraggableGrid
          key={orientation}
          data={data}
          numColumns={4}
          renderItem={renderItem}
          onDragRelease={onDragRelease}
        />
        {isPortrait && btns}
      </View>
    )
  },
  defaultProps
)

export default obc((props, { $ }) => {
  rerender('Discovery.SortMenu')

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <SortMenu
        styles={styles}
        orientation={_.orientation}
        dragging={$.state.dragging}
        discoveryMenu={$.discoveryMenu}
        onToggle={$.toggleDragging}
        onSubmit={$.saveDiscoveryMenu}
      />
    </View>
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.windSm,
    minHeight: 100
  },
  transparent: {
    opacity: _.select(0.6, 0.4)
  },
  text: {
    marginTop: IOS ? _.sm : _.md,
    marginLeft: _.md,
    marginBottom: _.md
  },
  btns: {
    paddingHorizontal: _.sm,
    marginTop: _.md + 8,
    marginBottom: _.md
  },
  btn: {
    height: 44 * _.ratio,
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: 44 * _.ratio
  }
}))
