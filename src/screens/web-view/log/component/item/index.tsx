/*
 * @Author: czy0729
 * @Date: 2025-02-19 06:19:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-15 00:52:18
 */
import React from 'react'
import { Avatar, Flex, Loading, Text, Touchable, UserStatus } from '@components'
import { IconTouchable, Tag } from '@_'
import { _, useStore } from '@stores'
import { lastDate, open, stl } from '@utils'
import { r as render } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { HOST, IMG_AVATAR_DEFAULT, IMG_INFO_ONLY, VERSION_GITHUB_RELEASE } from '@constants'
import AdvanceData from '@assets/json/advance.json'
import { Ctx } from '../../types'
import Detail from '../detail'
import Stats from '../stats'
import { getReleaseDistance } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ i, d, o, u, r }) {
  render(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const users = $.users(u)
    if (!users?.n && !$.state.showTour) return null
    if (!users?.a && !$.state.showDefault) return null

    const styles = memoStyles()
    const { navigate, url2, referer, event, showName } = $.state
    const infos = $.infos(u)
    const id = u.split('user/')?.[1] || ''
    const platform = infos?.i ? 'IPA' : String(o).toLocaleLowerCase().includes('ios') ? 'iOS' : ''
    const isTour = id === '0'
    const isCurrent = String(infos?.v).slice(0, 4) === VERSION_GITHUB_RELEASE.slice(0, 4)
    const text = isTour ? '未登录' : users?.n || ''
    const amount = AdvanceData[id]
    return (
      <Flex style={stl(styles.item, isCurrent && styles.active)} align='start'>
        {text ? (
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
        ) : (
          <Flex style={styles.loading} justify='center'>
            <Loading.Mini />
          </Flex>
        )}

        <Flex.Item style={styles.content}>
          <Flex style={_.mb.sm}>
            <Text type={infos?.a ? 'warning' : 'desc'} size={13} bold>
              {text}
            </Text>
            {!isTour && (
              <Touchable
                onPress={() => {
                  open(`${HOST}/user/${id}`)
                }}
              >
                <Text type='sub' size={12} lineHeight={13} bold>
                  {' '}
                  @{id}
                </Text>
              </Touchable>
            )}
            {!!amount && <Tag style={_.ml.sm} value={amount} />}
          </Flex>
          <Flex style={styles.tags} wrap='wrap'>
            {(!!infos?.v || r) && (
              <Tag
                style={styles.tag}
                value={infos?.v ? `${infos.v} (${getReleaseDistance(infos.v)})` : r}
                size={12}
              />
            )}
            {!!infos?.n && (
              <Tag
                style={styles.tag}
                value={infos.n}
                type={infos.n >= 2000 ? 'main' : infos.n >= 1000 ? 'primary' : undefined}
                size={12}
              />
            )}
            {!!infos?.b && platform !== 'IPA' && (
              <Tag
                style={styles.tag}
                value={showName ? infos.b : infos.b.split('(')?.[0]}
                size={12}
              />
            )}
            {!!platform && <Tag style={styles.tag} value={platform} type='primary' />}
          </Flex>
          <Stats u={u} />
          {$.state.detail === `${i}${d}` && <Detail id={id} />}
        </Flex.Item>

        <Flex style={styles.menu} direction='column' justify='center' align='end'>
          <Touchable onPress={() => $.onToggleDetail(id)}>
            <Text
              style={_.ml.sm}
              size={12}
              bold
              align='right'
              onPress={() => $.onToggleDetail(`${i}${d}`)}
            >
              {lastDate(new Date(d).valueOf() / 1000)}
            </Text>
          </Touchable>

          {!isTour && (
            <Flex style={styles.open}>
              {!!url2 && (
                <IconTouchable
                  style={_.mr._xs}
                  name='md-insert-chart-outlined'
                  size={16}
                  onPress={() => $.getStats(u)}
                />
              )}
              {!!navigate && (
                <IconTouchable
                  style={_.mr._xs}
                  name='md-person-outline'
                  size={17}
                  onPress={() => {
                    open(`${navigate}${u}`)
                  }}
                />
              )}
              {!!referer && (
                <IconTouchable
                  style={_.mr._xs}
                  name='icon-history'
                  size={17}
                  onPress={() => {
                    open(`${referer}${id}_${r}`)
                  }}
                />
              )}
              {!!event && (
                <IconTouchable
                  style={_.mr._xs}
                  name='md-data-usage'
                  size={16}
                  onPress={() => {
                    open(`${event}${id}_${r}`)
                  }}
                />
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    )
  })
}

export default Item
