/*
 * @Author: czy0729
 * @Date: 2022-03-23 09:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 06:27:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { confirm, stl } from '@utils'
import { ob } from '@utils/decorators'
import { AnyObject } from '@types'
import { Ctx } from '../../types'
import Form from '../form'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const Item = ({
  type,
  id,
  uuid,
  active,
  icon,
  iconSquare,
  name,
  url,
  sort
}: AnyObject<{
  uuid?: string
}>) => {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const actions = []
  const isBase = !!id
  const isActive = !!active
  actions.push(isActive ? '停用' : '启用', isBase ? '编辑排序' : '编辑')
  if (!isBase) actions.push('删除')
  actions.push('预览')

  const { edit } = $.state
  const isEdit =
    edit.type === type && ((id && edit.item.id === id) || (uuid && edit.item.uuid === uuid))

  const isClient = !((url || '').indexOf('http') === 0)
  return (
    <>
      <View style={styles.container}>
        <Popover
          data={actions}
          onSelect={title => {
            switch (title) {
              case '编辑排序':
                $.openEdit(type, {
                  id,
                  uuid: '',
                  name,
                  url,
                  sort,
                  active
                })
                break

              case '编辑':
                $.openEdit(type, {
                  id: '',
                  uuid,
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
          }}
        >
          <Flex
            style={stl(styles.item, isActive && styles.itemActive)}
            direction='column'
            justify='center'
          >
            {icon ? (
              <Flex style={stl(styles.icon, !iconSquare && styles.iconRound)} justify='center'>
                <Image
                  size={iconSquare ? 24 : 28}
                  src={icon}
                  placeholder={false}
                  skeleton={false}
                  sync
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
            {(!!sort || !isBase) && (
              <Text type='sub' size={8} lineHeight={12} bold>
                {sort ? `[${sort}] ` : ''}
                自定义
              </Text>
            )}
          </Flex>
        </Popover>
      </View>
      {isEdit && <Form name={name} url={url} isBase={isBase} />}
    </>
  )
}

export default ob(Item, COMPONENT)
