/*
 * @Author: czy0729
 * @Date: 2022-03-23 09:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 单条源头 (预设或自定义), 点击弹出操作菜单, 编辑时在下方展开表单
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { confirm, stl } from '@utils'
import { getItemKey } from '../../utils'
import Form from '../form'
import { COMPONENT, MENUS } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({
  type,
  id,
  uuid,
  active,
  icon,
  iconSquare,
  name,
  url,
  sort,
  onScrollIntoViewIfNeeded
}: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const menu = !!id ? MENUS.base : MENUS.custom
  const isActive = !!active
  const isEdit = getItemKey(type, id, uuid) === $.editingKey
  const isClient = (url || '').indexOf('http') !== 0

  const handleSelect = useCallback(
    (title?: string) => {
      switch (title) {
        case '编辑':
        case '编辑排序':
          $.openEdit(type, {
            id: id || '',
            uuid: uuid || '',
            name,
            url,
            sort,
            active
          })
          break

        case '删除':
          confirm(`确定删除 [${name}] ?`, () => {
            $.deleteItem({
              uuid,
              type
            })
          })
          break

        case '停用':
          $.disableItem({
            id,
            uuid,
            type
          })
          break

        case '启用':
          $.activeItem({
            id,
            uuid,
            type
          })
          break

        case '预览':
          $.go({
            type,
            url
          })
          break

        default:
          break
      }
    },
    [$, type, id, uuid, name, url, sort, active]
  )

  return (
    <>
      <View style={styles.container}>
        <Popover data={isActive ? menu.active : menu.inactive} onSelect={handleSelect}>
          <Flex
            style={stl(styles.item, isActive && styles.itemActive, !isActive && styles.itemDisable)}
            direction='column'
            justify='center'
          >
            {!!isActive && <View style={styles.dot} />}
            {icon ? (
              <Flex style={stl(styles.icon, !iconSquare && styles.iconRound)} justify='center'>
                <Image
                  size={iconSquare ? 24 : 28}
                  src={icon}
                  placeholder={false}
                  skeleton={false}
                />
              </Flex>
            ) : (
              <Flex style={styles.badge} justify='center'>
                <Text bold>
                  {String(name || uuid)
                    .replace('[DL]', '')
                    .trim()
                    .slice(0, 1)
                    .toLocaleUpperCase()}
                </Text>
              </Flex>
            )}
            <Text style={_.mt.sm} size={11} bold numberOfLines={1}>
              {name}
            </Text>
            {isClient && (
              <Text type='sub' size={10} lineHeight={12} bold>
                客户端
              </Text>
            )}
            {(!!sort || !id) && (
              <Text type='sub' size={8} lineHeight={12} bold>
                {sort ? `[${sort}] ` : ''}
                自定义
              </Text>
            )}
          </Flex>
        </Popover>
      </View>
      {isEdit && (
        <Form
          name={name}
          url={url}
          isBase={!!id}
          onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
        />
      )}
    </>
  )
}

export default observer(Item)
