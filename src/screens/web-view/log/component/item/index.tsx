/*
 * @Author: czy0729
 * @Date: 2025-02-19 06:19:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 17:02:02
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, Touchable, UserStatus } from '@components'
import { IconTouchable, Tag } from '@_'
import { _, useStore } from '@stores'
import { lastDate, open, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { IMG_AVATAR_DEFAULT, IMG_INFO_ONLY, VERSION_GITHUB_RELEASE } from '@constants'
import AdvanceData from '@assets/json/advance.json'
import { Ctx } from '../../types'
import Detail from '../detail'
import { memoStyles } from './styles'

function Item({ i, d, o, u, r }) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { navigate, referer, event } = $.state
    const users = $.users(u)
    const infos = $.infos(u)
    const id = u.split('user/')?.[1] || ''
    const platform = infos?.i ? 'IPA' : String(o).toLocaleLowerCase().includes('ios') ? 'iOS' : ''
    const isTour = id === '0'
    const isCurrent = String(infos?.v).slice(0, 4) === VERSION_GITHUB_RELEASE.slice(0, 4)
    const amount = AdvanceData[id]
    return (
      <Flex style={stl(styles.item, isCurrent && styles.active)} align='start'>
        <UserStatus userId={id}>
          <Avatar
            key={users?.a || r}
            navigation={isTour ? undefined : navigation}
            src={isTour ? IMG_INFO_ONLY : users?.a || IMG_AVATAR_DEFAULT}
            size={42}
            userId={isTour ? undefined : id}
            name={isTour ? undefined : users?.n || ''}
          />
        </UserStatus>

        <Flex.Item style={styles.content}>
          <Text style={_.mb.sm} type={infos?.a ? 'warning' : 'desc'} size={13} bold>
            {isTour ? '未登录' : users?.n || '-'}
            <Text type='sub' size={12} lineHeight={13} bold>
              {' '}
              @{id}
            </Text>
          </Text>
          <Flex>
            {(!!infos?.v || r) && <Tag style={_.mr.sm} value={infos?.v || r} size={12} />}
            {!!infos?.n && (
              <Tag
                style={_.mr.sm}
                value={infos.n}
                type={infos.n >= 2000 ? 'main' : infos.n >= 1000 ? 'warning' : undefined}
                size={12}
              />
            )}
            {!!infos?.b && <Tag style={_.mr.sm} value={infos.b} size={12} />}
            {!!platform && <Tag style={_.mr.sm} value={platform} type='primary' />}
            {!!amount && <Tag style={_.mr.sm} value={amount} />}
          </Flex>
          {$.state.detail === `${i}${d}` && <Detail id={id} />}
        </Flex.Item>

        <View style={styles.menu}>
          <Touchable onPress={() => $.onToggleDetail(id)}>
            <Text style={_.ml.sm} size={12} bold align='right' onPress={() => $.onToggleDetail(`${i}${d}`)}>
              {lastDate(new Date(d).valueOf() / 1000)}
            </Text>
          </Touchable>

          <Flex style={styles.open}>
            {!!navigate && (
              <IconTouchable
                name='md-person-outline'
                size={17}
                onPress={() => {
                  open(`${navigate}${u}&view=referrer`)
                }}
              />
            )}
            {!!referer && (
              <IconTouchable
                name='icon-history'
                size={17}
                onPress={() => {
                  open(`${referer}${id}_${r}&view=url`)
                }}
              />
            )}
            {!!event && (
              <IconTouchable
                name='md-data-usage'
                size={16}
                onPress={() => {
                  open(`${event}${id}_${r}&view=url`)
                }}
              />
            )}
          </Flex>
        </View>
      </Flex>
    )
  })
}

export default Item
