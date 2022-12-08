/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:17:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 15:02:10
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Cover } from '@_'
import { _ } from '@stores'
import { cnjp } from '@utils'
import { memo } from '@utils/decorators'
import {
  IMG_WIDTH,
  IMG_WIDTH_SM,
  IMG_HEIGHT,
  IMG_HEIGHT_SM,
  MODEL_COLLECTION_STATUS,
  MODEL_SUBJECT_TYPE
} from '@constants'
import { CollectionStatusCn, SubjectTypeCn } from '@types'
import Column from '../column'
import ColumnBgm from '../column-bgm'
import ColumnSelect from '../column-select'
// import Btn from '../btn'
import {
  useSelectStatus,
  useSelectEp,
  useSelectScore,
  useSelectComment
} from '../utils'
import { DEFAULT_PROPS } from './ds'

export default memo(({ navigation, styles, item, imports, collection }) => {
  /** 是否同步导入模式 */
  const isImport = !!imports.length

  const { subject } = item
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)

  const progress = ''
  const hasEp = ['动画', '书籍', '三次元'].includes(typeCn)

  // hooks
  // const [loading, setLoading] = useState(false)
  const [selectStatus, setSelectStatus] = useSelectStatus('', collection?.status)
  const [selectEp, setSelectEp] = useSelectEp(progress, collection?.ep_status)
  const [selectScore, setSelectScore] = useSelectScore('', collection?.rating)
  const [selectComment, setSelectComment] = useSelectComment('', collection?.comment)

  // 隐藏进度一致
  let status = MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(item.type) || ''
  if (typeCn === '书籍') status = status.replace('看', '读')
  else if (typeCn === '游戏') status = status.replace('看', '玩')
  else if (typeCn === '音乐') status = status.replace('看', '听')

  const a = {
    status,
    ep: `${item.ep_status || 0} / ${subject.eps || '??'}`,
    score: item.rate || '',
    tags: item.tags.join(' ') || '',
    comment: item.comment || ''
  }
  const b = {
    status: '',
    ep: '',
    score: '',
    tags: '',
    comment: ''
  }

  // if (
  //   a.status == b.status &&
  //   a.ep == b.ep &&
  //   a.score == b.score &&
  //   a.comment == b.comment
  // ) {
  //   return null
  // }

  // 若提交确认用的值
  const next = {
    status: '',
    ep: '',
    score: '',
    tags: '',
    comment: ''
  }
  const onPress = () => {
    navigation.push('Subject', {
      subjectId: subject.id
    })
  }

  return (
    <Flex style={styles.item} align='start'>
      <Cover
        src={subject.image}
        width={isImport ? IMG_WIDTH_SM : IMG_WIDTH}
        height={isImport ? IMG_HEIGHT_SM : IMG_HEIGHT}
        radius
        type={typeCn}
        onPress={onPress}
      />
      <Flex.Item>
        <Flex style={styles.body} direction='column' align='start'>
          <Text bold numberOfLines={2} onPress={onPress}>
            {cnjp(subject.cn, subject.jp)}
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
              <Column
                style={_.mt.md}
                show={isImport || (!isImport && !!a.tags)}
                text={a.tags}
              />
              <Column
                style={_.mt.md}
                show={isImport || (!isImport && !!a.comment)}
                text={a.comment}
              />
              <Column
                style={_.mt.md}
                text={item.updated_at.replace('T', ' ').replace('Z', '')}
              />
            </Flex.Item>

            {/* 导入 */}
            {isImport && (
              <Flex.Item style={_.ml.md}>
                <Column text='导入' type='sub' />
                <ColumnBgm select={selectStatus} text={b.status} next={next.status} />
                <ColumnBgm select={selectEp} text={b.ep} next={`${next.ep}话`} />
                <ColumnBgm select={selectScore} text={b.score} next={next.score} />
                <ColumnBgm
                  select={selectComment}
                  text={b.comment}
                  next={next.comment}
                />
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
              </View>
            )}
          </Flex>

          {/* toolbar */}
          {/* {isImport && (
            <View style={styles.toolbar}>
              <Flex style={_.mt.md} justify='end'>
                <Btn
                  text='置底'
                  onPress={() => {
                    // onBottom(item.id)
                  }}
                />
                <Btn
                  style={_.ml.md}
                  type='success'
                  disabled={
                    !isLoaded ||
                    !(selectStatus || selectEp || selectScore || selectComment)
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
                    } else if (b.status) {
                      // 即使不更新状态也需要提交当前的状态，不然会变成想看
                      flag.status = true
                      collectionData.status =
                        MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(b.status)
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
                    // await onSubmit(subjectId, collectionData, epData)
                    setLoading(false)

                    if (flag.status) setSelectStatus(false)
                    if (flag.ep) setSelectEp(false)
                    if (flag.score) setSelectScore(false)
                    if (flag.comment) setSelectComment(false)
                  }}
                />
              </Flex>
            </View>
          )} */}
        </Flex>
      </Flex.Item>
    </Flex>
  )
}, DEFAULT_PROPS)
