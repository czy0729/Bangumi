/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:35:43
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap } from '@components'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { TabsLabel } from '../../types'
import IsTop from '../is-top'
import Time from '../time'
import Collapsible from './collapsible'
import Container from './container'
import ContentContainer from './container-content'
import ContainerTouchable from './container-touchable'
import Count from './count'
import Cover from './cover'
import Loading from './loading'
import OnAir from './onair'
import Progress from './progress'
import Title from './title'
import ToolBar from './tool-bar'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Item = memo(
  ({
    index = 0,
    title = '' as TabsLabel,
    subjectId = 0,
    type = '2',
    image = '',
    name = '',
    name_cn = '',
    time = '',
    doing = 0,
    epStatus = ''
  }) => {
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
    const isGame = typeCn === '游戏' || title === '游戏'
    const isFirst = index === 0
    return (
      <Container subjectId={subjectId}>
        <Flex style={styles.hd}>
          <Cover
            index={index}
            subjectId={subjectId}
            typeCn={typeCn}
            name={name}
            name_cn={name_cn}
            image={image}
          />
          <Flex.Item style={styles.content}>
            <ContainerTouchable
              subjectId={subjectId}
              typeCn={typeCn}
              name={name}
              name_cn={name_cn}
              image={image}
            >
              <Flex align='start'>
                <Flex.Item>
                  <Title
                    subjectId={subjectId}
                    typeCn={typeCn}
                    title={title}
                    name={name}
                    name_cn={name_cn}
                    doing={doing}
                  />
                </Flex.Item>
                <Loading subjectId={subjectId} />
                <OnAir subjectId={subjectId} typeCn={typeCn} />
              </Flex>
            </ContainerTouchable>
            <View>
              <ContentContainer>
                <Count
                  subjectId={subjectId}
                  typeCn={typeCn}
                  epStatus={epStatus}
                  isFirst={isFirst}
                />
                <Flex.Item />
                <ToolBar
                  subjectId={subjectId}
                  typeCn={typeCn}
                  epStatus={epStatus}
                  name={name}
                  name_cn={name_cn}
                  isFirst={isFirst}
                />
              </ContentContainer>
              {isGame ? (
                <Time value={time} />
              ) : (
                <Progress subjectId={subjectId} epStatus={epStatus} />
              )}
            </View>
          </Flex.Item>
          {isFirst && (
            <View>
              <Heatmap id='首页.置顶或取消置顶' />
            </View>
          )}
        </Flex>
        <Collapsible subjectId={subjectId} isFirst={isFirst} />
        <IsTop subjectId={subjectId} />
      </Container>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Item
