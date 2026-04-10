/*
 * @Author: czy0729
 * @Date: 2022-03-11 23:02:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 01:05:39
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Header as HeaderComp, HeaderV2Popover, Image, Text, UserStatus } from '@components'
import { _, useStore } from '@stores'
import { getCoverLarge, getSPAParams, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, TEXT_MENU_BROWSER, TEXT_MENU_SPA, URL_SPA } from '@constants'
import IconFavor from '../component/icon-favor'
import { COMPONENT, DATA, TEXT_COPY } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { avatar, userId, title } = $.detail

  const elHeaderTitle = useMemo(
    () => (
      <Flex style={styles.container}>
        {!!avatar && (
          <View style={_.mr.sm}>
            <UserStatus userId={userId} mini>
              <Image
                src={getCoverLarge(avatar)}
                size={28}
                radius={_.radiusXs}
                placeholder={false}
              />
            </UserStatus>
          </View>
        )}
        <Flex.Item>
          <Text numberOfLines={1}>{title}</Text>
        </Flex.Item>
      </Flex>
    ),
    [avatar, title, userId]
  )

  const handleHeaderRight = useCallback(
    () => (
      <Flex>
        <IconFavor $={$} />
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === TEXT_COPY) {
              $.onCopy(navigation)
            } else if (title === TEXT_MENU_BROWSER) {
              open(`${HOST}/index/${$.catalogId}`)
            } else if (title === TEXT_MENU_SPA) {
              open(
                `${URL_SPA}/${getSPAParams('CatalogDetail', {
                  catalogId: $.catalogId
                })}`
              )
            }

            t('目录详情.右上角菜单', {
              key: title
            })
          }}
        />
      </Flex>
    ),
    [$, navigation]
  )

  return (
    <HeaderComp
      mode='float'
      fixed={$.state.fixed}
      alias='目录详情'
      hm={$.hm}
      headerTitle={elHeaderTitle}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
