/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-24 23:16:31
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { SectionTitle, PreventTouchPlaceholder } from '@_'
import { systemStore, _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants'
import IconHidden from '../icon/hidden'
import IconGame from '../icon/game'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    subjectId,
    subjectType,
    showTags,
    subjectTagsExpand,
    tag,
    tags,
    animeTags,
    hentaiTags,
    gameTags,
    mangaTags,
    wenkuTags,
    onSwitchBlock
  }) => {
    global.rerender('Subject.Tags.Main')

    const elBadge = (
      <Flex style={[styles.badge, subjectTagsExpand && styles.badgeExpand]}>
        <Text size={13} type='sub'>
          第三方标签
        </Text>
      </Flex>
    )
    const elTags = (
      <>
        {tags.map(({ name, count }, index) => {
          const isSelected = tag.includes(name)
          return (
            <Touchable
              key={index}
              style={[styles.item, isSelected && styles.selected]}
              onPress={() => {
                t('条目.跳转', {
                  to: 'Tag',
                  from: '标签',
                  subjectId
                })

                navigation.push('Tag', {
                  type: MODEL_SUBJECT_TYPE.getLabel(subjectType),
                  tag: name
                })
              }}
            >
              <Flex>
                <Text
                  type={_.select('desc', isSelected ? 'main' : 'desc')}
                  size={13}
                  bold={isSelected}
                >
                  {name}
                </Text>
                <Text
                  style={_.ml.xs}
                  type={_.select('sub', isSelected ? 'main' : 'desc')}
                  size={13}
                  bold={isSelected}
                >
                  {count}
                </Text>
              </Flex>
            </Touchable>
          )
        })}

        {/* 动画 */}
        {!!animeTags?.length && (
          <>
            {elBadge}
            {animeTags.map((item: string) => (
              <Touchable
                key={item}
                style={styles.item}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Anime',
                    from: '标签',
                    subjectId
                  })
                  navigation.push('Anime', {
                    _tags: [item]
                  })
                }}
              >
                <Text size={13}>{item}</Text>
              </Touchable>
            ))}
          </>
        )}

        {/* Hentai */}
        {!!hentaiTags?.length && (
          <>
            {elBadge}
            {hentaiTags.map((item: string) => (
              <Touchable
                key={item}
                style={styles.item}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Hentai',
                    from: '标签',
                    subjectId
                  })
                  navigation.push('Hentai', {
                    _tags: [item]
                  })
                }}
              >
                <Text size={13}>{item}</Text>
              </Touchable>
            ))}
          </>
        )}

        {/* 游戏 */}
        {!!gameTags?.length && (
          <>
            {elBadge}
            {gameTags.map((item: string) => (
              <Touchable
                key={item}
                style={styles.item}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Game',
                    from: '标签',
                    subjectId
                  })
                  navigation.push('Game', {
                    _tags: [item]
                  })
                }}
              >
                <Text size={13}>{item}</Text>
              </Touchable>
            ))}
          </>
        )}

        {/* 漫画 */}
        {!!mangaTags?.length && (
          <>
            {elBadge}
            {mangaTags.map((item: string) => (
              <Touchable
                key={item}
                style={styles.item}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Manga',
                    from: '标签',
                    subjectId
                  })
                  navigation.push('Manga', {
                    _tags: [item]
                  })
                }}
              >
                <Text size={13}>{item}</Text>
              </Touchable>
            ))}
          </>
        )}

        {/* 文库 */}
        {!!wenkuTags?.length && (
          <>
            {elBadge}
            {wenkuTags.map((item: string) => (
              <Touchable
                key={item}
                style={styles.item}
                onPress={() => {
                  t('条目.跳转', {
                    to: 'Wenku',
                    from: '标签',
                    subjectId
                  })
                  navigation.push('Wenku', {
                    _tags: [item]
                  })
                }}
              >
                <Text size={13}>{item}</Text>
              </Touchable>
            ))}
          </>
        )}
      </>
    )

    const show = showTags && !!tags.length
    return (
      <View style={[_.mt.lg, showTags ? styles.container : _.short, !show && _.mb.md]}>
        <SectionTitle
          style={_.container.wind}
          right={showTags ? <IconGame /> : <IconHidden name='标签' value='showTags' />}
          icon={!showTags && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTags')}
        >
          标签
        </SectionTitle>
        {show && (
          <>
            {subjectTagsExpand ? (
              <View style={[_.container.wind, _.mt.sm]}>
                <Flex wrap='wrap'>{elTags}</Flex>
                <Heatmap id='条目.跳转' from='标签' />
              </View>
            ) : (
              <ScrollView
                style={_.mt.md}
                contentContainerStyle={_.container.wind}
                horizontal
              >
                {elTags}
              </ScrollView>
            )}
          </>
        )}
        {show && (
          <View style={styles.more}>
            <Touchable onPress={() => systemStore.switchSetting('subjectTagsExpand')}>
              <Flex justify='center'>
                <Iconfont
                  name={
                    subjectTagsExpand
                      ? 'md-keyboard-arrow-up'
                      : 'md-keyboard-arrow-down'
                  }
                  size={_.device(24, 32)}
                />
              </Flex>
            </Touchable>
          </View>
        )}
        <PreventTouchPlaceholder />
      </View>
    )
  },
  DEFAULT_PROPS
)
