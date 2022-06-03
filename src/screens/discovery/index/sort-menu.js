/*
 * @Author: czy0729
 * @Date: 2021-10-18 11:59:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 20:17:53
 */
import React, { useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { DraggableGrid } from '@components/@/react-native-draggable-grid/draggable-grid'
import { Touchable, Flex, Text, SwitchPro, SegmentedControl } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { INIT_DISCOVERY_MENU } from '@stores/system/init'
import { memo, obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { t } from '@utils/fetch'
import { confirm } from '@utils/ui'
import { IOS, ORIENTATION_PORTRAIT } from '@constants'
import Btn from './btn'
import { getMenus } from './ds'

const defaultProps = {
  styles: {},
  orientation: _.orientation,
  dragging: false,
  discoveryMenu: [],
  discoveryTodayOnair: true,
  discoveryMenuNum: 4,
  onToggle: Function.prototype,
  onSubmit: Function.prototype
}

const SortMenu = memo(
  ({
    styles,
    orientation,
    dragging,
    discoveryMenu,
    discoveryTodayOnair,
    discoveryMenuNum,
    onToggle,
    onSubmit
  }) => {
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

    const btns = useMemo(
      () =>
        dragging && (
          <>
            <Flex style={styles.btns} justify='end'>
              <Flex.Item>
                <Touchable style={styles.touch} onPress={onCancel}>
                  <Flex style={styles.btn} justify='center'>
                    <Text type='__plain__' bold size={11}>
                      取消
                    </Text>
                  </Flex>
                </Touchable>
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <Touchable style={styles.touch} onPress={onSave}>
                  <Flex style={styles.btn} justify='center'>
                    <Text type='__plain__' bold size={11}>
                      保存
                    </Text>
                  </Flex>
                </Touchable>
              </Flex.Item>
              <IconTouchable
                style={[_.ml.md, _.mr.sm]}
                name='md-refresh'
                onPress={() => {
                  confirm('是否恢复默认菜单布局', () => {
                    setMenu(INIT_DISCOVERY_MENU)
                  })
                }}
              />
            </Flex>
            <Flex style={styles.setting}>
              <Flex.Item>
                <Text>菜单每行个数</Text>
              </Flex.Item>
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={[4, 5]}
                selectedIndex={discoveryMenuNum === 4 ? 0 : 1}
                onValueChange={label => {
                  t('设置.切换', {
                    title: '发现菜单个数',
                    label
                  })

                  systemStore.setSetting(
                    'discoveryMenuNum',
                    discoveryMenuNum === 4 ? 5 : 4
                  )
                }}
              />
            </Flex>
            <Flex style={styles.setting}>
              <Flex.Item>
                <Text>今日放送</Text>
              </Flex.Item>
              <SwitchPro
                style={styles.switch}
                value={discoveryTodayOnair}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '发现今日放送',
                    checked: !discoveryTodayOnair
                  })

                  systemStore.switchSetting('discoveryTodayOnair')
                }}
              />
            </Flex>
          </>
        ),
      [styles, dragging, discoveryTodayOnair, discoveryMenuNum, onCancel, onSave]
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
          <Text style={styles.text} size={13} bold>
            按住拖拽排序，拖动到分割线左侧显示，右侧隐藏
          </Text>
        )}
        {!isPortrait && btns}
        {dragging ? (
          <DraggableGrid
            key={`${orientation}|${discoveryMenuNum}`}
            data={data}
            numColumns={discoveryMenuNum}
            itemHeight={styles.dragItem.height}
            renderItem={renderItem}
            onDragRelease={onDragRelease}
          />
        ) : (
          <Flex wrap='wrap'>{data.map(item => renderItem(item))}</Flex>
        )}
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
        discoveryTodayOnair={$.discoveryTodayOnair}
        discoveryMenuNum={$.discoveryMenuNum}
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
    marginBottom: _.sm
  },
  btns: {
    paddingHorizontal: _.sm,
    marginTop: _.sm,
    marginBottom: _.md
  },
  touch: {
    borderRadius: _.r(36),
    overflow: 'hidden'
  },
  btn: {
    height: _.r(36),
    backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
    borderRadius: _.r(36)
  },
  setting: {
    paddingHorizontal: _.sm,
    marginVertical: _.sm
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  segmentedControl: {
    height: _.r(28),
    width: _.r(128)
  },
  dragItem: {
    height: (_.windowSm.width - 2 * _.windSm) / 4
  }
}))
