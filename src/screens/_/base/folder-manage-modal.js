/*
 * @Author: czy0729
 * @Date: 2021-05-27 14:20:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-06 11:58:08
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
  root: ['修改', '删除'],
  single: ['修改', '移出'],
  top: ['修改', '下移', '置底', '移出'],
  middle: ['修改', '置顶', '上移', '下移', '置底', '移出'],
  bottom: ['修改', '置顶', '上移', '移出']
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
      expand: ['33497'],

      // 编辑
      edit: 0,
      content: '',
      order: '0',

      // 新建
      create: false,
      title: '',
      desc: ''
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

    onBackAndroid = () => {
      const { visible, onClose } = this.props
      if (visible) {
        onClose()
        return true
      }
      return false
    }

    /**
     * 请求目录列表
     */
    fetchCatalogs = async () => {
      const res = usersStore.fetchCatalogs(
        {
          isCollect: false
        },
        true
      )

      const { list } = await res
      queue(list.map(item => () => this.fetchCatalogDetail(item.id, true)))

      return res
    }

    /**
     * 请求目录详情
     */
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

    /**
     * 目录展开
     */
    onExpand = item => {
      const { expand } = this.state
      this.setState({
        expand: expand.includes(item.id)
          ? expand.filter(i => !(i == item.id))
          : [...expand, item.id],
        edit: 0,
        content: '',
        order: '0'
      })
    }

    /**
     * 添加/移出
     */
    onToggle = (item, detail, isIn) => {
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

    /**
     * 更多菜单
     */
    onControl = title => {
      switch (title) {
        case '修改':
          break

        case '删除':
          break

        default:
          break
      }
    }

    /**
     * 创建目录
     */
    onCreate = create => {
      if (create) {
        if (!userStore.formhash) {
          info('授权信息有误, 请尝试重新登陆')
          return
        }

        this.setState({
          create
        })
      } else {
        this.setState({
          create,
          title: '',
          desc: ''
        })
      }
    }

    /**
     * 提交创建目录
     */
    onSubmitCreate = () => {
      const { title, desc } = this.state
      if (!title.length) {
        info('标题不能为空')
        return
      }

      discoveryStore.doCatalogCreate(
        {
          formhash: userStore.formhash,
          title: title || '',
          desc: desc || ''
        },
        () => {
          this.fetchCatalogs()
          this.onCreate(false)
          feedback()
        }
      )
    }

    /**
     * 条目更多菜单
     */
    onSubjectControl = (title, item, pItem) => {
      const detail = this.catalogDetail(pItem.id)
      const current = fixedOrder(item.order)
      let order = 0
      let temp
      let flag

      switch (title) {
        case '置顶':
          temp = detail.list.sort((a, b) => Number(a.sort) - Number(b.sort))[0]
          order = Number(temp.order)
          if (Number.isNaN(order)) {
            order = 0
          } else {
            order -= 10
          }

          this.onSort(item, order, pItem)
          break

        case '上移':
          if (current == 0) {
            order = -10
          } else {
            temp = detail.list
              .map(i => fixedOrder(i.order))
              .sort((a, b) => b - a)
            temp.forEach(i => {
              if (!flag && current > i) {
                order = i - 10
                flag = true
              }
            })

            if (!flag) {
              order = (temp[temp.length - 1] || 0) - 10
            }
          }

          this.onSort(item, order, pItem)
          break

        case '下移':
          detail.list
            .map(i => fixedOrder(i.order))
            .sort((a, b) => a - b)
            .forEach(i => {
              if (!flag && current < i) {
                order = i + 10
                flag = true
              }
            })
          if (!flag) {
            order = current + 10
          }

          this.onSort(item, order, pItem)
          break

        case '置底':
          temp = detail.list.sort((a, b) => Number(b.sort) - Number(a.sort))[0]
          order = Number(temp.order)
          if (Number.isNaN(order)) {
            order = 10
          } else {
            order += 10
          }

          this.onSort(item, order, pItem)
          break

        case '修改':
          this.onSubjectEdit(item)
          break

        case '移出':
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

    /**
     * 编辑项
     */
    onSubjectEdit = item => {
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

    /**
     * 改变文字
     */
    onChange = (value, key = 'content') => {
      this.setState({
        [key]: value
      })
    }

    /**
     * 改变排序
     */
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

    /**
     * 直接提交顺序
     */
    onSort = (item, order, pItem) => {
      const { modify, erase } = item
      const formhash = erase?.split('?gh=')[1]
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      discoveryStore.doCatalogModifySubject(
        {
          modify,
          formhash,
          content: item.comment || '',
          order: order || '0'
        },
        () => {
          feedback()
          this.fetchCatalogDetail(pItem.id, true)
        }
      )
    }

    /**
     * 提交
     */
    onSubmit = (item, pItem) => {
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
          this.fetchCatalogDetail(pItem.id, true)
          this.onSubjectEdit()
        }
      )
    }

    @computed get catalogs() {
      return usersStore.catalogs()
    }

    catalogDetail(id) {
      return computed(() => discoveryStore.catalogDetail(id)).get()
    }

    renderCreate() {
      const { create, title, desc } = this.state
      if (!create) {
        return null
      }

      return (
        <View style={this.styles.create}>
          <Text bold>新建目录</Text>
          <Input
            style={[this.styles.textarea, _.mt.md]}
            defaultValue={title}
            placeholder='输入标题'
            clear
            onChangeText={text => this.onChange(text, 'title')}
          />
          <TextareaItem
            style={[this.styles.textarea, _.mt.md]}
            value={desc}
            placeholder='输入描述'
            placeholderTextColor={_.colorDisabled}
            rows={3}
            selectionColor={_.colorMain}
            clear
            onChange={text => this.onChange(text, 'desc')}
          />
          <IconTouchable
            style={this.styles.btnCreateCancel}
            name='md-close'
            size={22}
            color={_.colorSub}
            onPress={() => this.onCreate(false)}
          />
          <IconTouchable
            style={this.styles.btnCreateSubmit}
            name='md-check'
            size={22}
            color={_.colorSub}
            onPress={this.onSubmitCreate}
          />
        </View>
      )
    }

    renderList() {
      const { create, expand } = this.state
      const { list } = this.catalogs
      return (
        <ScrollView
          style={this.styles.wrap}
          contentContainerStyle={this.styles.content}
        >
          {create
            ? this.renderCreate()
            : list
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
                      {expand.includes(item.id) &&
                        this.renderSubjects(item, detail)}
                    </View>
                  )
                })}
        </ScrollView>
      )
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
                    expand.includes(item.id)
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
                style={_.ml.sm}
                name={isIn ? 'md-star' : 'md-star-outline'}
                size={18}
                color={isIn ? _.colorWarning : _.colorSub}
                onPress={() => this.onToggle(item, detail, isIn)}
              />
            )}
            <Popover
              style={this.styles.touch}
              data={controlDS.root}
              onSelect={title => this.onControl(title, item)}
            >
              <Flex style={this.styles.more} justify='center'>
                <Iconfont name='md-more-vert' size={18} color={_.colorSub} />
              </Flex>
            </Popover>
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
                    type={i.id == id ? 'warning' : 'desc'}
                    bold
                    numberOfLines={1}
                  >
                    {i.title}
                  </Text>
                  <Text style={_.mt.xs} size={10} type='sub' numberOfLines={2}>
                    [{i.order}] {i.info}
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
                        placeholder='输入排序 (越小越前)'
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
                        onPress={() => this.onSubjectEdit()}
                      />
                      <IconTouchable
                        style={this.styles.submit}
                        name='md-check'
                        size={18}
                        color={_.colorSub}
                        onPress={() => this.onSubmit(i, detail)}
                      />
                    </View>
                  )}
                  {!edit && (
                    <Popover
                      style={this.styles.touch}
                      data={data}
                      onSelect={title => this.onSubjectControl(title, i, item)}
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
      const { visible, create } = this.state
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
          {!create && (
            <IconTouchable
              style={this.styles.btnCreate}
              name='md-add'
              size={24}
              color={_.colorSub}
              onPress={() => this.onCreate(true)}
            />
          )}
          {this.renderList()}
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
  btnCreate: {
    position: 'absolute',
    zIndex: 1,
    top: -31,
    right: 12
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
    marginLeft: _.sm,
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
    borderColor: _.select(_.colorIcon, _.colorBorder),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  textarea: {
    padding: _.sm,
    marginTop: _.sm,
    marginBottom: -4,
    color: _.colorDesc,
    ..._.fontSize10,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorIcon, _.colorBorder),
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
  },
  create: {
    paddingTop: _.sm,
    paddingRight: 48,
    paddingLeft: _.sm,
    marginBottom: _.md
  },
  btnCreateCancel: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -4
  },
  btnCreateSubmit: {
    position: 'absolute',
    zIndex: 1,
    right: -4,
    bottom: -4
  }
}))

function fixedOrder(order) {
  const _order = Number(order)
  return Number.isNaN(_order) ? 10 : _order
}
