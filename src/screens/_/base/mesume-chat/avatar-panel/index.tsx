/*
 * @Author: czy0729
 * @Date: 2026-08-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { MUSUME_CONFIG, MUSUME_DATA } from '../ds'
import { getMusumeThumb } from '../utils'
import { styles } from './styles'

import type { PropsWithChildren } from 'react'
import type { Props } from './types'

/** Bangumi 娘人格头像选择器 */
function AvatarPanel({ current, onSelect, children }: PropsWithChildren<Props>) {
  const [showPannel, setShowPannel] = useState(false)

  const avatarProps = {
    size: 52,
    borderWidth: 2,
    borderColor: _.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)'),
    radius: _.radiusSm,
    skeleton: false
  } as const
  const nameProps = {
    style: _.mt.sm,
    type: '__plain__',
    size: 12,
    bold: true,
    shadow: true,
    align: 'center'
  } as const

  return (
    <>
      {showPannel && (
        <Flex>
          {MUSUME_DATA.filter(item => item !== current).map(item => {
            const config = MUSUME_CONFIG[item]

            return (
              <Touchable
                key={item}
                onPress={() => {
                  setShowPannel(false)
                  onSelect(item)
                }}
              >
                <Flex style={styles.avatar} direction='column'>
                  <Avatar {...avatarProps} src={getMusumeThumb(config.icon)} />
                  <Text {...nameProps}>{config.name}</Text>
                </Flex>
              </Touchable>
            )
          })}
        </Flex>
      )}
      <Flex style={styles.item} align='start'>
        <Flex style={styles.avatar} direction='column'>
          <Touchable onPress={() => setShowPannel(!showPannel)}>
            <Avatar
              key={current}
              {...avatarProps}
              src={getMusumeThumb(MUSUME_CONFIG[current].icon)}
            />
          </Touchable>
          <Text {...nameProps}>{MUSUME_CONFIG[current].name}</Text>
        </Flex>
        {children}
      </Flex>
    </>
  )
}

export default observer(AvatarPanel)
