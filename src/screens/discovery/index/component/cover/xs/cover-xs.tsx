/*
 * @Author: czy0729
 * @Date: 2022-09-10 06:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:35
 */
import { View } from 'react-native'
import { Squircle, Text, UserStatus } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Avatar, Cover, CoverBlur, TouchableScale } from '@_'
import { _ } from '@stores'
import { getCoverMedium, stl, x18 } from '@utils'
import { memo } from '@utils/decorators'
import { withT } from '@utils/fetch'
import { COMPONENT_MAIN, DEFAULT_PROPS, SCRIM_HEIGHT } from './ds'
import { AVATAR_SIZE, styles } from './styles'

import type { SubjectTypeCn } from '@types'

const CoverXs = memo(
  ({
    navigation,
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
    const isUseCDN = !x18(subjectId)
    const coverSrc = getCoverMedium(cover)

    return (
      <View>
        <TouchableScale
          style={styles.item}
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
            <Cover src={coverSrc} width={width} height={height} cdn={isUseCDN} />
            <CoverBlur
              src={cover}
              cdn={isUseCDN}
              width={width}
              height={height}
              scrimHeight={SCRIM_HEIGHT}
            />
            <Text
              style={stl(styles.desc, avatar && styles.withAvatar)}
              type='__plain__'
              size={7}
              lineHeight={_.r(7)}
              numberOfLines={2}
              bold
              pointerEvents='none'
            >
              {name}
            </Text>
          </Squircle>
        </TouchableScale>
        {!!avatar && (
          <View style={styles.fixed}>
            <UserStatus userId={userId} mini>
              <Avatar
                navigation={navigation}
                size={AVATAR_SIZE}
                src={avatar}
                userId={userId}
                name={userName}
                radius={avatarRound ? AVATAR_SIZE : _.radiusXs}
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
