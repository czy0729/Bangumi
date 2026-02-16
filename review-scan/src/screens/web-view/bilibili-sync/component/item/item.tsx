/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:17:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 18:06:12
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Loading, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover } from '@_'
import { _ } from '@stores'
import { copy, open } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import {
  FROZEN_FN,
  HOST_AC_MEDIA,
  IMG_HEIGHT_SM,
  IMG_WIDTH_SM,
  MODEL_COLLECTION_STATUS
} from '@constants'
import { CollectionStatus, CollectionStatusCn } from '@types'
import {
  getSelectComment,
  getSelectEp,
  getSelectScore,
  useSelectComment,
  useSelectEp,
  useSelectScore,
  useSelectStatus
} from '../../utils'
import Btn from '../btn'
import Column from '../column'
import ColumnBgm from '../column-bgm'
import ColumnSelect from '../column-select'
import { BILIBILI_STATUS, DEFAULT_PROPS, HIT_SLOP } from './ds'

export default memo(
  ({
    navigation,
    styles,
    item = {},
    review = {},
    collection = {},
    hideSame = false,
    onRefreshCollection = FROZEN_FN,
    onBottom = FROZEN_FN,
    onSubmit = FROZEN_FN
  }) => {
    const { subjectId } = item
    const isSubject = !!subjectId
    const isLoaded = !!collection?.loaded
    const progress = item.progress.replace('看到', '').replace('第', '').split(' ')?.[0] || ''

    // hooks
    const [loading, setLoading] = useState(false)
    const [selectStatus, setSelectStatus] = useSelectStatus(item.status, collection?.status)
    const [selectEp, setSelectEp] = useSelectEp(progress, collection?.ep_status)
    const [selectScore, setSelectScore] = useSelectScore(review?.score, collection?.rating)
    const [selectComment, setSelectComment] = useSelectComment(review?.content, collection?.comment)

    // 隐藏进度一致
    const bili = {
      status: BILIBILI_STATUS[item.status] || '',
      ep: progress || '',
      score: review?.score || '',
      comment: review?.content || ''
    }
    const bgm = {
      status: MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(collection?.status) || '',
      ep: collection?.ep_status && `${collection.ep_status}话`,
      score: collection?.rating || '',
      comment: collection?.comment || ''
    }
    if (
      hideSame &&
      bili.status == bgm.status &&
      bili.ep == bgm.ep &&
      bili.score == bgm.score &&
      bili.comment == bgm.comment
    ) {
      return null
    }

    // 若提交确认用的值
    const next = {
      status: BILIBILI_STATUS[item.status],
      ep: getSelectEp(progress, collection?.ep_status).value as string | number,
      score: getSelectScore(review?.score, collection?.rating).value,
      comment: getSelectComment(review?.content, collection?.comment).value
    }
    const onPress = () => {
      if (!isSubject) return

      navigation.push('Subject', {
        subjectId,
        _cn: item.title.replace('（僅限港澳台地區）', ''),
        _image: getCoverSrc(item.cover, IMG_WIDTH_SM)
      })
    }

    return (
      <Flex style={styles.item} align='start'>
        <Cover
          src={item.cover}
          width={IMG_WIDTH_SM}
          height={IMG_HEIGHT_SM}
          radius
          onPress={onPress}
        />
        <Flex.Item>
          <Flex style={styles.body} direction='column' align='start'>
            <Text bold numberOfLines={2} onPress={onPress}>
              {item.title}
            </Text>
            <Flex style={_.mt.md} align='start'>
              {/* side */}
              <View>
                <Column text=' ' type='sub' />
                <Column style={_.mt.md} text='状态' type='sub' />
                <Column style={_.mt.md} text='进度' type='sub' />
                <Column style={_.mt.md} text='评分' type='sub' />
                <Column style={_.mt.md} text='点评' type='sub' />
              </View>

              {/* bilibili */}
              <Flex.Item style={_.ml.md}>
                <Column text='bilibili' type='sub' />
                <Column style={_.mt.md} text={bili.status} />
                <Column style={_.mt.md} text={bili.ep} />
                <Column style={_.mt.md} text={bili.score} />
                <Column
                  style={_.mt.md}
                  text={bili.comment}
                  onPress={() => {
                    if (!review?.content) return
                    copy(review?.content, '已复制')
                  }}
                />
              </Flex.Item>

              {/* bgm */}
              <Flex.Item style={_.ml.md} flex={1.5}>
                <Column
                  text='bgm'
                  type='sub'
                  right={
                    isSubject && (
                      <Touchable
                        style={_.ml.xs}
                        hitSlop={HIT_SLOP}
                        onPress={() => onRefreshCollection(subjectId)}
                      >
                        <Iconfont name='md-refresh' size={12} />
                      </Touchable>
                    )
                  }
                />
                {isSubject ? (
                  isLoaded ? (
                    <>
                      <ColumnBgm select={selectStatus} text={bgm.status} next={next.status} />
                      <ColumnBgm select={selectEp} text={bgm.ep} next={`${next.ep}话`} />
                      <ColumnBgm select={selectScore} text={bgm.score} next={next.score} />
                      <ColumnBgm select={selectComment} text={bgm.comment} next={next.comment} />
                    </>
                  ) : (
                    <Flex style={styles.loading}>
                      <Loading.Mini />
                    </Flex>
                  )
                ) : (
                  <Column style={_.mt.md} text='未找到条目' />
                )}
              </Flex.Item>

              {/* selectors */}
              {isSubject && (
                <View style={styles.selectors}>
                  <Column text=' ' type='sub' />
                  {isLoaded && (
                    <>
                      <ColumnSelect
                        select={selectStatus}
                        disabled={!next.status}
                        onPress={setSelectStatus}
                      />
                      <ColumnSelect
                        select={selectEp}
                        disabled={next.ep === ''}
                        onPress={setSelectEp}
                      />
                      <ColumnSelect
                        select={selectScore}
                        disabled={!next.score}
                        onPress={setSelectScore}
                      />
                      <ColumnSelect
                        select={selectComment}
                        disabled={!next.comment}
                        onPress={setSelectComment}
                      />
                    </>
                  )}
                </View>
              )}
            </Flex>

            {/* toolbar */}
            <View style={styles.toolbar}>
              <Flex style={_.mt.md}>
                <Flex.Item>
                  <Flex>
                    <Btn
                      text='详情'
                      onPress={() => {
                        open(`${HOST_AC_MEDIA}/md${item.id}`)

                        t('bili同步.详情')
                      }}
                    />
                    <Btn
                      style={_.ml.sm}
                      text='搜索'
                      onPress={() => {
                        navigation.push('Search', {
                          type: '动画',
                          value: item.title.replace('（僅限港澳台地區）', '')
                        })

                        t('bili同步.搜索')
                      }}
                    />
                    <Btn style={_.ml.sm} text='置底' onPress={() => onBottom(item.id)} />
                  </Flex>
                </Flex.Item>
                {isSubject && (
                  <Btn
                    style={_.ml.md}
                    type='success'
                    disabled={
                      !isLoaded || !(selectStatus || selectEp || selectScore || selectComment)
                    }
                    loading={loading}
                    onPress={async () => {
                      const flag: {
                        status?: boolean
                        score?: boolean
                        comment?: boolean
                        ep?: boolean
                      } = {}

                      const collectionData: {
                        status?: any
                        rating?: any
                        comment?: any
                        ep?: any
                      } = {}
                      if (selectStatus) {
                        if (next.status === '想看') {
                          flag.status = true
                          collectionData.status = 'wish'
                        } else if (next.status === '看过') {
                          flag.status = true
                          collectionData.status = 'collect'
                        } else if (next.status === '在看') {
                          flag.status = true
                          collectionData.status = 'do'
                        }
                      } else if (bgm.status) {
                        // 即使不更新状态也需要提交当前的状态，不然会变成想看
                        flag.status = true
                        collectionData.status = MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(
                          bgm.status
                        )
                      }

                      if (selectScore) {
                        flag.score = true
                        collectionData.rating = next.score
                      }
                      if (selectComment) {
                        flag.comment = true
                        collectionData.comment = next.comment
                      }

                      const epData: {
                        ep?: any
                      } = {}
                      if (selectEp) {
                        flag.ep = true
                        epData.ep = next.ep
                      }

                      setLoading(true)
                      await onSubmit(subjectId, collectionData, epData)
                      setLoading(false)

                      if (flag.status) setSelectStatus(false)
                      if (flag.ep) setSelectEp(false)
                      if (flag.score) setSelectScore(false)
                      if (flag.comment) setSelectComment(false)
                    }}
                  />
                )}
              </Flex>
            </View>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS
)
