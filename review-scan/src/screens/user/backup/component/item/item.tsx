/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:17:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-06 16:20:47
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Cover } from '@_'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { memo } from '@utils/decorators'
import {
  FROZEN_FN,
  IMG_HEIGHT,
  IMG_HEIGHT_SM,
  IMG_WIDTH,
  IMG_WIDTH_SM,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE
} from '@constants'
import { CollectionStatus, SubjectTypeCn } from '@types'
import {
  actionStatus,
  getSelectComment,
  getSelectEp,
  getSelectScore,
  getSelectStatus,
  getSelectTags,
  useSelectComment,
  useSelectEp,
  useSelectScore,
  useSelectStatus,
  useSelectTags
} from '../../utils'
import Btn from '../btn'
import Column from '../column'
import ColumnBgm from '../column-bgm'
import ColumnSelect from '../column-select'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ navigation, styles, item = {}, upload = {}, onBottom = FROZEN_FN, onSubmit = FROZEN_FN }) => {
    /** 是否同步导入模式 */
    const isImport = !!upload
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.subject?.type)

    const progress = ''
    const hasEp = ['动画', '书籍', '三次元'].includes(typeCn)

    // hooks
    const [loading, setLoading] = useState(false)
    const [selectStatus, setSelectStatus] = useSelectStatus(item.type, upload?.type)
    const [selectEp, setSelectEp] = useSelectEp(progress, upload?.ep_status)
    const [selectScore, setSelectScore] = useSelectScore(item.rate, upload?.rate)
    const [selectTags, setSelectTags] = useSelectTags(
      item.tags.join(' '),
      upload?.tags ? upload.tags.join(' ') : ''
    )
    const [selectComment, setSelectComment] = useSelectComment(item.comment, upload?.comment)

    // 左
    const status = item.type ? actionStatus(item.type, typeCn) : '未收藏'
    const a = {
      status,
      ep: `${item.ep_status || 0} / ${item.subject?.eps || '??'}`,
      score: item.rate || '',
      tags: item.tags.join(' ') || '',
      comment: item.comment || ''
    }

    // 右
    const uploadStatus = actionStatus(upload?.type, typeCn)
    const b = {
      status: uploadStatus,
      ep: `${upload?.ep_status || 0} / ${upload?.subject?.eps || '??'}`,
      score: upload?.rate || '',
      tags: upload?.tags ? upload.tags.join(' ') : '',
      comment: upload?.comment || ''
    }

    // 若提交确认用的值
    const next = {
      status: getSelectStatus(status, uploadStatus).value,
      ep: getSelectEp(item.ep_status, upload?.ep_status).value,
      score: getSelectScore(item.rate, upload?.rate).value,
      tags: getSelectTags(item.tags.join(' '), upload?.tags ? upload.tags.join(' ') : '').value,
      comment: getSelectComment(item.comment, upload?.comment).value
    }
    const onPress = () => {
      navigation.push('Subject', {
        subjectId: item.subject?.id
      })
    }

    return (
      <Flex style={styles.item} align='start'>
        <Cover
          src={item.subject?.image}
          width={isImport ? IMG_WIDTH_SM : IMG_WIDTH}
          height={isImport ? IMG_HEIGHT_SM : IMG_HEIGHT}
          radius
          type={typeCn}
          onPress={onPress}
        />
        <Flex.Item>
          <Flex style={styles.body} direction='column' align='start'>
            <Text bold numberOfLines={2} onPress={onPress}>
              {cnjp(item.subject?.cn, item.subject?.jp)}
            </Text>
            <Flex style={_.mt.md} align='start'>
              {/* side */}
              <View>
                <Column text=' ' type='sub' />
                <Column style={_.mt.md} text='状态' type='sub' />
                <Column
                  style={_.mt.md}
                  show={hasEp && (isImport || (!isImport && !!a.ep))}
                  text='进度'
                  type='sub'
                />
                <Column
                  style={_.mt.md}
                  show={isImport || (!isImport && !!a.score)}
                  text='评分'
                  type='sub'
                />
                <Column
                  style={_.mt.md}
                  show={isImport || (!isImport && !!a.tags)}
                  text='标签'
                  type='sub'
                />
                <Column
                  style={_.mt.md}
                  show={isImport || (!isImport && !!a.comment)}
                  text='点评'
                  type='sub'
                />
                <Column style={_.mt.md} text='更新' type='sub' />
              </View>

              {/* 导出 */}
              <Flex.Item style={_.ml.md}>
                <Column text='导出' type='sub' />
                <Column style={_.mt.md} text={a.status} />
                <Column
                  style={_.mt.md}
                  show={hasEp && (isImport || (!isImport && !!a.ep))}
                  text={a.ep}
                />
                <Column
                  style={_.mt.md}
                  show={isImport || (!isImport && !!a.score)}
                  text={a.score}
                />
                <Column style={_.mt.md} show={isImport || (!isImport && !!a.tags)} text={a.tags} />
                <Column
                  style={_.mt.md}
                  show={isImport || (!isImport && !!a.comment)}
                  text={a.comment}
                />
                <Column style={_.mt.md} text={item.updated_at.replace('T', ' ').replace('Z', '')} />
              </Flex.Item>

              {/* 导入 */}
              {isImport && (
                <Flex.Item style={_.ml.md}>
                  <Column text='导入' type='sub' />
                  <ColumnBgm select={selectStatus} text={b.status} next={next.status} />
                  <ColumnBgm select={selectEp} text={b.ep} next={`${next.ep}话`} />
                  <ColumnBgm select={selectScore} text={b.score} next={next.score} />
                  <ColumnBgm select={selectTags} text={b.tags} next={next.tags} />
                  <ColumnBgm select={selectComment} text={b.comment} next={next.comment} />
                </Flex.Item>
              )}

              {/* selectors */}
              {isImport && (
                <View style={styles.selectors}>
                  <Column text=' ' type='sub' />
                  <ColumnSelect
                    select={selectStatus}
                    disabled={!next.status}
                    onPress={setSelectStatus}
                  />
                  <ColumnSelect select={selectEp} disabled={!next.ep} onPress={setSelectEp} />
                  <ColumnSelect
                    select={selectScore}
                    disabled={!next.score}
                    onPress={setSelectScore}
                  />
                  <ColumnSelect select={selectTags} disabled={!next.tags} onPress={setSelectTags} />
                  <ColumnSelect
                    select={selectComment}
                    disabled={!next.comment}
                    onPress={setSelectComment}
                  />
                </View>
              )}
            </Flex>

            {/* toolbar */}
            {isImport && (
              <View style={styles.toolbar}>
                <Flex style={_.mt.md} justify='end'>
                  <Btn
                    text='置底'
                    onPress={() => {
                      onBottom(item.subject?.id)
                    }}
                  />
                  <Btn
                    style={_.ml.md}
                    type='success'
                    disabled={!(selectStatus || selectEp || selectScore || selectComment)}
                    loading={loading}
                    onPress={async () => {
                      const flag: {
                        status?: boolean
                        score?: boolean
                        tags?: boolean
                        comment?: boolean
                        ep?: boolean
                      } = {}

                      const collectionData: {
                        status?: any
                        rating?: any
                        tags?: any
                        comment?: any
                        ep?: any
                        private?: any
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
                      } else if (b.status) {
                        // 即使不更新状态也需要提交当前的状态，不然会变成想看
                        flag.status = true
                        collectionData.status = MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(
                          b.status
                        )
                      }

                      if (selectScore) {
                        flag.score = true
                        collectionData.rating = next.score
                      }
                      if (selectTags) {
                        flag.tags = true
                        collectionData.tags = next.tags
                      }
                      if (selectComment) {
                        flag.comment = true
                        collectionData.comment = next.comment
                      }
                      collectionData.private = item.private

                      const epData: {
                        ep?: any
                      } = {}
                      if (selectEp) {
                        flag.ep = true
                        epData.ep = next.ep
                      }

                      setLoading(true)
                      await onSubmit(item.subject?.id, collectionData, epData)
                      setLoading(false)

                      if (flag.status) setSelectStatus(false)
                      if (flag.ep) setSelectEp(false)
                      if (flag.score) setSelectScore(false)
                      if (flag.comment) setSelectComment(false)
                    }}
                  />
                </Flex>
              </View>
            )}
          </Flex>
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS
)
