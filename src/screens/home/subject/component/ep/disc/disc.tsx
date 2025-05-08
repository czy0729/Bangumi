/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:44:45
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Expand, Flex, Heatmap, Text } from '@components'
import { SectionTitle } from '@_'
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
    disc = FROZEN_ARRAY,
    discTranslateResult = FROZEN_ARRAY,
    focusOrigin = false
  }) => {
    const [expand, setExpand] = useState(false)
    const onExpand = useCallback(() => {
      setExpand(true)
    }, [setExpand])

    return (
      <View style={styles.container}>
        <SectionTitle
          right={
            <>
              {!focusOrigin && <IconSearchDisc />}
              {!discTranslateResult.length && <IconDisc />}
            </>
          }
          splitStyles
        >
          曲目列表
        </SectionTitle>
        {!!disc.length && (
          <View style={_.mt.md}>
            <Expand onExpand={onExpand}>
              {disc
                .filter((item, index) => {
                  if (expand) return true
                  return item.disc.length >= 6 ? index < 1 : index < 2
                })
                .map((item, index) => (
                  <View key={item.title} style={!!index && _.mt.md}>
                    <Text type='sub' size={16} selectable>
                      {item.title}
                    </Text>
                    <View style={_.mt.sm}>
                      {item.disc.map((i, idx) => {
                        const title = HTMLDecode(i.title).replace(`${idx + 1} `, '')
                        let translate = ''
                        try {
                          if (discTranslateResult.length) {
                            translate =
                              discTranslateResult.find(item => item.src === title)?.dst || ''
                          }
                        } catch (error) {}

                        return (
                          <Flex
                            key={i.href}
                            style={stl(styles.item, idx % 2 === 0 && styles.odd)}
                            align='start'
                          >
                            <Text>{idx + 1}</Text>
                            <Flex.Item style={_.ml.sm}>
                              <Text
                                onPress={() => {
                                  appNavigate(
                                    i.href,
                                    navigation,
                                    {},
                                    {
                                      id: '条目.跳转',
                                      data: {
                                        from: '曲目列表',
                                        subjectId
                                      }
                                    }
                                  )
                                }}
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
            </Expand>
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
