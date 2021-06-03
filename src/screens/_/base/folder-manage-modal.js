/*
 * @Author: czy0729
 * @Date: 2021-05-27 14:20:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-04 02:06:06
 */
import React from 'react'
import { Alert, BackHandler, ScrollView, View } from 'react-native'
import { computed } from 'mobx'
import { Touchable, Flex, Text, Iconfont, Input } from '@components'
import Modal from '@components/@/ant-design/modal'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { _, userStore, usersStore, discoveryStore } from '@stores'
import { getTimestamp } from '@utils'
import { ob } from '@utils/decorators'
import { queue } from '@utils/fetch'
import { info, feedback } from '@utils/ui'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { Cover } from './cover'
import { Popover } from './popover'
import { IconTouchable } from '../icon/touchable'

const width = parseInt(IMG_WIDTH / 1.6)
const height = parseInt(IMG_HEIGHT / 1.6)
const controlDS = {
  single: ['修改', '删除'],
  top: ['修改', '下移', '置底', '删除'],
  middle: ['修改', '置顶', '上移', '下移', '置底', '删除'],
  bottom: ['修改', '置顶', '上移', '删除']
}

export const FolderManageModal = ob(
  class extends React.Component {
    static defaultProps = {
      id: 0,
      visible: true,
      title: '目录',
      onSubmit: Function.prototype,
      onClose: Function.prototype
    }

    state = {
      visible: true,
      expand: 33497,
      edit: 0,
      content: '',
      order: '0'
    }

    componentDidMount() {
      setTimeout(() => {
        this.fetchCatalogs()
      }, 800)

      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }

    fetchCatalogs = async (key, refresh) => {
      const res = usersStore.fetchCatalogs(
        {
          isCollect: key === 'collect'
        },
        refresh
      )

      const { list } = await res
      queue(list.map(item => () => this.fetchCatalogDetail(item.id, true)))

      return res
    }

    fetchCatalogDetail = async (id, refresh) => {
      if (!refresh) {
        const data = discoveryStore.catalogDetail(id)
        const { _loaded } = data
        if (_loaded && getTimestamp() - _loaded <= 300) {
          return true
        }
      }

      return discoveryStore.fetchCatalogDetail({
        id
      })
    }

    onBackAndroid = () => {
      const { visible, onClose } = this.props
      if (visible) {
        onClose()
        return true
      }
      return false
    }

    onExpand = item => {
      const { expand } = this.state
      this.setState({
        expand: expand == item.id ? 0 : item.id,
        edit: 0,
        content: '',
        order: '0'
      })
    }

    onPress = (item, detail, isIn) => {
      if (!isIn) {
        discoveryStore.doCatalogAddRelate(
          {
            catalogId: item.id,
            subjectId: this.props.id,
            formhash: userStore.formhash
          },
          () => {
            info('已添加')
            feedback()
            this.fetchCatalogDetail(item.id, true)
          }
        )
        return
      }

      const { id } = this.props
      const find = detail.list.find(i => i.id == id)
      if (!find || !find.erase) {
        info('目录信息有误, 暂不能把该条目移出目录, 请重新进入页面')
        return
      }

      Alert.alert('警告', '确定移出目录?', [
        {
          text: '取消',
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => {
            discoveryStore.doCatalogDeleteRelate(
              {
                erase: find.erase
              },
              () => {
                info('已移出')
                feedback()
                this.fetchCatalogDetail(item.id, true)
              }
            )
          }
        }
      ])
    }

    onControl = (title, item, pItem) => {
      switch (title) {
        case '修改':
          this.onEdit(item)
          break

        case '删除':
          setTimeout(() => {
            Alert.alert('警告', '确定移出目录?', [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: () => {
                  discoveryStore.doCatalogDeleteRelate(
                    {
                      erase: item.erase
                    },
                    () => {
                      info('已移出')
                      feedback()
                      this.fetchCatalogDetail(pItem.id, true)
                    }
                  )
                }
              }
            ])
          }, 240)
          break

        default:
          break
      }
    }

    onEdit = item => {
      if (item) {
        this.setState({
          edit: item.id,
          content: item.comment || '',
          order: item.order || '0'
        })
        return
      }

      this.setState({
        edit: 0,
        content: '',
        order: '0'
      })
    }

    onChange = content => {
      this.setState({
        content
      })
    }

    onOrder = order => {
      if (!order) {
        this.setState({
          order: ''
        })
        return
      }

      const _order = Number(order)
      if (Number.isNaN(_order)) {
        return
      }

      this.setState({
        order: _order == 0 ? '' : _order
      })
    }

    onSubmit = item => {
      const { modify, erase } = item
      const { content, order } = this.state
      const formhash = erase?.split('?gh=')[1]
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      discoveryStore.doCatalogModifySubject(
        {
          modify,
          formhash,
          content: content || '',
          order: order || '0'
        },
        () => {
          feedback()
          this.fetchCatalogDetail(item.id, true)
          this.onEdit()
        }
      )
    }

    @computed get catalogs() {
      return usersStore.catalogs()
    }

    catalogDetail(id) {
      return computed(() => discoveryStore.catalogDetail(id)).get()
    }

    renderItem(item, detail) {
      const { id } = this.props
      const { expand, edit } = this.state
      const isIn = detail?.list?.some(i => i.id == id)
      const date = item.time?.split(' ')[0]?.replace('创建于:', '') || ''
      return (
        <Flex style={this.styles.item}>
          <Flex.Item>
            <Touchable onPress={() => this.onExpand(item)}>
              <Flex>
                <Text bold>
                  {item.title} ({detail.list.length})
                </Text>
                <Iconfont
                  name={
                    expand == item.id
                      ? 'md-keyboard-arrow-down'
                      : 'md-navigate-next'
                  }
                  size={22}
                  lineHeight={24}
                />
              </Flex>
              <Text style={_.mt.xs} size={11} type='sub' numberOfLines={1}>
                {date} / {detail.content}
              </Text>
            </Touchable>
          </Flex.Item>
          <Flex style={this.styles.control} justify='end'>
            {!edit && (
              <IconTouchable
                name={isIn ? 'md-check-circle-outline' : 'md-radio-button-off'}
                size={18}
                color={isIn ? _.colorMain : _.colorSub}
                onPress={() => this.onPress(item, detail, isIn)}
              />
            )}
          </Flex>
        </Flex>
      )
    }

    renderSubjects(item, detail) {
      const { id } = this.props
      const { edit, content, order } = this.state
      return (
        <View style={this.styles.list}>
          {detail.list.map((i, index) => {
            const isEditing = !!edit && edit == i.id
            const { length } = detail.list
            let data
            if (length <= 1) {
              data = controlDS.single
            } else if (index === 0) {
              data = controlDS.top
            } else if (index === length - 1) {
              data = controlDS.bottom
            } else {
              data = controlDS.middle
            }

            const align = isEditing || i.comment ? 'start' : 'center'
            return (
              <Flex style={this.styles.subject} align={align}>
                <Cover
                  src={i.image}
                  size={width}
                  height={height}
                  radius
                  type={i.type}
                />
                <Flex.Item style={_.ml.sm}>
                  <Text
                    size={11}
                    type={i.id == id ? 'main' : 'desc'}
                    bold
                    numberOfLines={1}
                  >
                    {i.title}
                  </Text>
                  <Text style={_.mt.xs} size={10} type='sub' numberOfLines={2}>
                    {i.info}
                  </Text>
                  {!isEditing && !!i.comment && (
                    <Text style={this.styles.comment} size={10}>
                      {i.comment}
                    </Text>
                  )}
                  {isEditing && (
                    <>
                      <TextareaItem
                        style={this.styles.textarea}
                        value={content}
                        placeholder='输入评价'
                        placeholderTextColor={_.colorDisabled}
                        rows={3}
                        selectionColor={_.colorMain}
                        clear
                        onChange={this.onChange}
                      />
                      <Input
                        style={[this.styles.textarea, _.mt.md]}
                        defaultValue={order == '0' ? '' : order}
                        keyboardType='number-pad'
                        placeholder='输入排序'
                        onChangeText={this.onOrder}
                      />
                    </>
                  )}
                </Flex.Item>
                <Flex style={this.styles.control} justify='end'>
                  {isEditing && (
                    <View style={this.styles.edit}>
                      <IconTouchable
                        name='md-close'
                        size={18}
                        color={_.colorSub}
                        onPress={() => this.onEdit()}
                      />
                      <IconTouchable
                        style={this.styles.submit}
                        name='md-check'
                        size={18}
                        color={_.colorSub}
                        onPress={() => this.onSubmit(i)}
                      />
                    </View>
                  )}
                  {!edit && (
                    <Popover
                      style={this.styles.touch}
                      data={data}
                      onSelect={title => this.onControl(title, i, item)}
                    >
                      <Flex style={this.styles.more} justify='center'>
                        <Iconfont
                          name='md-more-vert'
                          size={18}
                          color={_.colorSub}
                        />
                      </Flex>
                    </Popover>
                  )}
                </Flex>
              </Flex>
            )
          })}
        </View>
      )
    }

    render() {
      const { title, onClose } = this.props
      const { visible, expand } = this.state
      const { list } = this.catalogs
      return (
        <Modal
          style={this.styles.modal}
          visible={visible}
          title={
            <Text type='title' size={16}>
              {title}
            </Text>
          }
          transparent
          maskClosable
          closable
          onClose={onClose}
        >
          <ScrollView
            style={this.styles.wrap}
            contentContainerStyle={this.styles.content}
          >
            {list
              .sort(a => {
                const { id } = this.props
                const detail = this.catalogDetail(a.id)
                const isIn = detail?.list?.some(i => i.id == id)
                return isIn ? -1 : 0
              })
              .map(item => {
                const detail = this.catalogDetail(item.id)
                return (
                  <View key={item.id}>
                    {this.renderItem(item, detail)}
                    {expand == item.id && this.renderSubjects(item, detail)}
                  </View>
                )
              })}
          </ScrollView>
        </Modal>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)

const memoStyles = _.memoStyles(_ => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 400,
    backgroundColor: _.select(_.colorBg, _.colorBg)
  },
  wrap: {
    height: _.window.height * 0.64,
    marginTop: _.md
  },
  contentContainerStyle: {
    width: '100%'
  },
  item: {
    padding: _.sm,
    paddingRight: 0,
    marginBottom: _.sm
  },
  control: {
    width: 48,
    height: '100%'
  },
  btn: {
    width: 56,
    height: 24
  },
  list: {
    paddingLeft: _.sm,
    paddingBottom: _.sm,
    marginTop: -_.sm
  },
  subject: {
    paddingVertical: _.sm
  },
  touch: {
    marginRight: -2,
    borderRadius: 20,
    overflow: 'hidden'
  },
  more: {
    width: 38,
    height: 38
  },
  comment: {
    padding: _.sm,
    marginTop: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  textarea: {
    padding: _.sm,
    marginTop: _.sm,
    marginBottom: -4,
    color: _.colorDesc,
    ..._.fontSize10,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  edit: {
    height: '100%'
  },
  submit: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: -4
  }
}))
