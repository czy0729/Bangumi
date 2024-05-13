/*
 * @Author: czy0729
 * @Date: 2022-09-10 06:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 10:45:47
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Squircle, Text, Touchable, UserStatus } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Avatar, Cover } from '@_'
import { _, systemStore } from '@stores'
import { getCoverMedium, HTMLDecode, stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { linearColor } from '../../ds'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { AVATAR_SIZE } from './styles'

const CoverXs = memo(
  ({ navigation, styles, imageWidth, avatarRound, title, avatar, data }) => {
    const isMusic = title === '音乐'

    const width = imageWidth
    const height = isMusic ? width : width * 1.38

    return (
      <View>
        <Touchable
          style={styles.item}
          animate
          onPress={() => {
            t('发现.跳转', {
              to: 'Subject',
              subjectId: data.id,
              from: `CoverXs|${title}`
            })

            navigation.push('Subject', {
              subjectId: data.id,
              _jp: data.name,
              _image: getCoverSrc(data.cover, width),
              _type: title
            })
          }}
        >
          <Squircle width={width} height={height} radius={systemStore.coverRadius}>
            <Cover src={getCoverMedium(data.cover)} width={width} height={height} />
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
              {HTMLDecode(data.name)}
            </Text>
          </Squircle>
        </Touchable>
        {!!avatar && (
          <View style={styles.fixed}>
            <UserStatus userId={data.userId} mini>
              <Avatar
                navigation={navigation}
                size={AVATAR_SIZE}
                src={avatar}
                userId={data.userId}
                name={data.userName}
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
