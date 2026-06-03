/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-03 18:42:42
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Expand, Flex, Heatmap, Text } from '@components'
import { SectionTitle, Tag } from '@_'
import { _ } from '@stores'
import { appNavigate, HTMLDecode, stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY } from '@constants'
import IconDisc from '../../icon/disc'
import IconSearchDisc from '../../icon/search-disc'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Disc = memo(
  ({
    navigation,
    styles,
    subjectId = 0,
    disc,
    loaded,
    discTranslateResult = FROZEN_ARRAY,
    focusOrigin = false
  }) => {
    const [expand, setExpand] = useState(false)

    const { length: discLength } = disc
    const { length: translateLength } = discTranslateResult

    const elLeft = useMemo(
      () =>
        discLength > 1 ? (
          <Tag style={styles.tag} type='sub' size={12} value={`${discLength} Disc`} />
        ) : undefined,
      [discLength, styles.tag]
    )
    const elRight = useMemo(
      () => (
        <>
          {!focusOrigin && <IconSearchDisc />}
          {!translateLength && <IconDisc />}
        </>
      ),
      [focusOrigin, translateLength]
    )

    const hasList = !!(disc || []).length
    const hasShortList = (!hasList && loaded) || (hasList && disc?.[0]?.disc?.length <= 4)
    const elList = useMemo(
      () => (
        <>
          {disc
            .filter((item, index) =>
              expand ? true : item.disc.length >= 6 ? index < 1 : index < 2
            )
            .map((item, index) => (
              <View key={item.title} style={!!index && _.mt.md}>
                <Text type='sub' size={16} selectable>
                  {item.title}
                </Text>
                <View style={_.mt.sm}>
                  {item.disc.map((i, idx) => {
                    const title = HTMLDecode(i.title).replace(`${idx + 1} `, '')
                    const translate =
                      discTranslateResult.length > 0
                        ? discTranslateResult.find(d => d.src === title)?.dst || ''
                        : ''

                    return (
                      <Flex
                        key={i.href}
                        style={stl(styles.item, idx % 2 === 0 && styles.odd)}
                        align='start'
                      >
                        <Text>{idx + 1}</Text>
                        <Flex.Item style={_.ml.sm}>
                          <Text
                            onPress={() =>
                              appNavigate(
                                i.href,
                                navigation,
                                {},
                                {
                                  id: '条目.跳转',
                                  data: { from: '曲目列表', subjectId }
                                }
                              )
                            }
                          >
                            {title}
                          </Text>
                          {!!translate && (
                            <Text style={styles.translate} type='sub' size={12}>
                              {translate}
                            </Text>
                          )}
                        </Flex.Item>
                      </Flex>
                    )
                  })}
                </View>
              </View>
            ))}
        </>
      ),
      [disc, discTranslateResult, expand, navigation, styles, subjectId]
    )

    const handleExpand = useCallback(() => setExpand(true), [])

    return (
      <View style={stl(styles.container, hasShortList && styles.containerShort)}>
        <SectionTitle left={elLeft} right={elRight} splitStyles>
          曲目列表
        </SectionTitle>

        {hasList && (
          <View style={_.mt.md}>
            {hasShortList ? elList : <Expand onExpand={handleExpand}>{elList}</Expand>}
            <Heatmap id='条目.跳转' from='曲目列表' />
          </View>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN,
  props => ({
    ...props,
    discTranslateResult: props.discTranslateResult.length
  })
)

export default Disc
