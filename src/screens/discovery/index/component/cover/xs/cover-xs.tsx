/*
 * @Author: czy0729
 * @Date: 2022-09-10 06:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 05:33:46
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Squircle, Text, Touchable, UserStatus } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Avatar, Cover } from '@_'
import { _ } from '@stores'
import { getCoverMedium, stl } from '@utils'
import { memo } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { SubjectTypeCn } from '@types'
import { linearColor } from '../../../ds'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { AVATAR_SIZE } from './styles'

const CoverXs = memo(
  ({
    navigation,
    styles,
    imageWidth = 0,
    avatarRound = false,
    title = '' as SubjectTypeCn,
    avatar = '',
    subjectId = 0,
    cover = '',
    cn = '',
    jp = '',
    name = '',
    userId = '',
    userName = ''
  }) => {
    const isMusic = title === '音乐'
    const width = imageWidth
    const height = isMusic ? width : width * 1.38

    return (
      <View>
        <Touchable
          style={styles.item}
          animate
          onPress={withT(
            () => {
              navigation.push('Subject', {
                subjectId,
                _jp: jp,
                _cn: cn,
                _image: getCoverSrc(cover, width),
                _type: title
              })
            },
            '发现.跳转',
            {
              to: 'Subject',
              subjectId,
              from: `CoverXs|${title}`
            }
          )}
        >
          <Squircle width={width} height={height} radius={_.radiusSm}>
            <Cover src={getCoverMedium(cover)} width={width} height={height} />
            <LinearGradient
              style={stl(styles.linear, isMusic && styles.linearMusic)}
              colors={linearColor}
              pointerEvents='none'
            />
            <Text
              style={styles.desc}
              size={7}
              lineHeight={_.r(7)}
              type={_.select('plain', 'title')}
              numberOfLines={2}
              bold
              pointerEvents='none'
            >
              {name}
            </Text>
          </Squircle>
        </Touchable>
        {!!avatar && (
          <View style={styles.fixed}>
            <UserStatus userId={userId} mini>
              <Avatar
                navigation={navigation}
                size={AVATAR_SIZE}
                src={avatar}
                userId={userId}
                name={userName}
                radius={avatarRound ? AVATAR_SIZE : true}
              />
            </UserStatus>
          </View>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default CoverXs
