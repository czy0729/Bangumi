/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:17:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 12:15:05
 */
export const COMPONENT = 'Catalog'

/** 列表类型 */
export const TYPE_DS = [
  {
    key: 'advance',
    title: '高级'
  },
  {
    key: 'collect',
    title: '热门'
  },
  {
    key: '',
    title: '最新'
  }
] as const

/** 条目类型 */
export const FILTER_TYPE_DS = ['不限', '动画', '书籍', '游戏', '音乐', '三次元'] as const

/** 年份 */
export const FILTER_YEAR_DS = [
  '不限',
  '近1年',
  '近3年',
  2024,
  2023,
  2022,
  2021,
  2020,
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010
] as const

/** 关键字 */
export const FILTER_KEY_DS = [
  ['不限', 1000],
  ['画', 266],
  ['动画', 169],
  ['作', 156],
  ['漫', 113],
  ['漫画', 87],
  ['作品', 78],
  ['推荐', 61],
  ['游戏', 58],
  ['目录', 51],
  ['个人', 49],
  ['系', 46],
  ['小说', 41],
  ['榜', 41],
  ['日本', 40],
  ['裏', 38],
  ['排行', 36],
  ['排行榜', 34],
  ['轻', 33],
  ['完', 33],
  ['选', 31],
  ['补', 30],
  ['百合', 29],
  ['全', 27],
  ['汉化', 26],
  ['最', 25],
  ['版', 25],
  ['看', 24],
  ['佳', 22],
  ['真', 21],
  ['原', 20],
  ['神', 20],
  ['销量', 18],
  ['世界', 18],
  ['评分', 17],
  ['黄油', 17],
  ['店', 16],
  ['名作', 15],
  ['葉', 15],
  ['史', 15],
  ['剧场', 15],
  ['网站', 14],
  ['实用', 14],
  ['已', 14],
  ['收录', 14],
  ['女性', 13],
  ['计划', 13],
  ['组', 13],
  ['世纪', 13],
  ['动漫', 13],
  ['男', 13],
  ['空间', 12],
  ['综合', 12],
  ['收集', 12],
  ['佳作', 12],
  ['记录', 12],
  ['合集', 12],
  ['赏', 12],
  ['列表', 11],
  ['批评', 11],
  ['厉害', 11],
  ['补完', 11],
  ['动画短片', 11],
  ['少女', 11],
  ['剧场版', 11],
  ['同人', 10],
  ['排名', 10],
  ['历年', 10],
  ['妹', 10],
  ['自用', 9],
  ['冷门', 9],
  ['收藏', 9],
  ['坑', 9],
  ['一般', 8],
  ['经典', 8],
  ['相关', 8],
  ['适合', 8],
  ['资源', 8],
  ['值得', 8],
  ['中文', 8],
  ['后宫', 8],
  ['致', 8],
  ['作画', 7],
  ['完结', 7],
  ['音乐', 7],
  ['剧情', 7],
  ['动画电影', 7],
  ['纯爱', 7],
  ['更新', 7],
  ['角色', 7],
  ['年鉴', 7],
  ['物', 7],
  ['美少女', 6],
  ['国产', 6],
  ['含有', 6],
  ['持续', 6],
  ['施工', 6],
  ['萌', 6],
  ['選', 6],
  ['人气', 6],
  ['群友', 6],
  ['回', 6],
  ['元素', 6],
  ['提及', 6],
  ['文化', 6],
  ['异', 6],
  ['待', 6],
  ['获奖', 6],
  ['制作', 5],
  ['独立', 5],
  ['整理', 5],
  ['部门', 5],
  ['艺术', 5],
  ['不错', 5],
  ['本子', 5],
  ['推理', 5],
  ['评选', 5],
  ['超级', 5],
  ['优秀', 5],
  ['狂', 5],
  ['战士', 5],
  ['泡面', 5],
  ['选集', 5]
] as const
