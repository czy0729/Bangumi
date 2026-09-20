/*
 * @Author: czy0729
 * @Date: 2026-09-20 13:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 00:07:39
 *
 * 期望值由旧 HTMLToTree/findTreeNode 链路差分冻结
 */
jest.mock('@constants', () => ({
  HOST_BGM_STATIC: '//lain.bgm.tv'
}))

/**
 * 覆盖 setup.js 的 @utils 替身, 把 cheerio 接回真实门面 (替身不传 removeCF / decodeEntities)
 * 只保留 ../common 用到的导出, 其余用具在本文件内会静默为 undefined, 新增用具需同步在此补齐
 */
jest.mock('@utils', () => {
  const html = jest.requireActual('@utils/thirdParty/html')

  return {
    cheerio: html.cheerio,
    cMap: html.cMap,
    cText: html.cText
  }
})

import { cheerioFeaturedItems } from '../common'

/** 5 个分类, 覆盖封面两分支 / 文本节点 / data-cf 前缀属性 / style 与 data-cfstyle 并存 */
const FRAGMENT = `
<li class="featuredGroup">
<ul class="featuredTab"><li class="focus"><a href="/anime">动画</a></li></ul>
<div class="featuredItem">
<a href="/subject/10001" title="アニメ A"><div data-cfstyle="background:url('//lain.bgm.tv/pic/cover/l/ab/cd/10001.jpg')"></div></a>
<p><small>2026年10月3日 起</small></p>
</div>
<div class="featuredItem">
<a href="/subject/10002" title="アニメ B"><div></div></a>
<p><small>2026年10月4日 起</small></p>
</div>
</li>
<li class="featuredGroup">
<ul class="featuredTab"><li class="focus"><a href="/game">游戏</a></li></ul>
<div class="featuredItem">
<a href="/subject/20001" title="ゲーム A" style="background:url('//lain.bgm.tv/pic/cover/l/ef/gh/20001.jpg')"></a>
<div><small>2026年11月</small></div>
</div>
<div class="featuredItem">
<a href="/subject/20002" title="ゲーム B"><div style="background:url('//lain.bgm.tv/pic/cover/l/aa/aa/old.jpg')" data-cfstyle="background:url('//lain.bgm.tv/pic/cover/l/zz/zz/20002.jpg')"></div></a>
<p><small>2026年11月2日</small></p>
</div>
<div class="featuredItem">
<a href="/subject/20003" title="ゲーム C"><div style="" data-cfstyle="background:url('//lain.bgm.tv/pic/cover/l/yy/yy/20003.jpg')"></div></a>
<p><small>2026年11月3日</small></p>
</div>
</li>
<li class="featuredGroup">
<ul class="featuredTab"><li class="focus"><a href="/book">书籍</a></li></ul>
<div class="featuredItem">
<a href="/subject/30001" title="本 A"><div style="background:url('//lain.bgm.tv/pic/cover/l/ij/kl/30001.jpg')"></div></a>
<p><small>2026年12月<em> 冬</em></small></p>
</div>
</li>
<li class="featuredGroup">
<ul class="featuredTab"><li class="focus"><a href="/music">音乐</a></li></ul>
<div class="featuredItem">
<a href="/subject/40001">封面</a>
<a href="/subject/40002" title="音楽 B&amp;A"><div style="background:url('//lain.bgm.tv/pic/cover/l/mn/op/40002.jpg')"></div></a>
<p><small>2027年1月</small></p>
</div>
</li>
<li class="featuredGroup">
<ul class="featuredTab"><li class="focus"><a href="/real">三次元</a></li></ul>
<div class="featuredItem">
<a href="/subject/50001" title="実写 C"><div style="background:url('//lain.bgm.tv/pic/cover/l/qr/st/50001.jpg')"></div></a>
<div><small>2027年2月</small></div>
</div>
</li>
`

describe('cheerioFeaturedItems', () => {
  it('按分类解析轮播', () => {
    expect(cheerioFeaturedItems(FRAGMENT)).toEqual({
      anime: [
        {
          cover: '//lain.bgm.tv/pic/cover/l/ab/cd/10001.jpg',
          title: 'アニメ A',
          subjectId: '10001',
          info: '2026年10月3日 起'
        },
        {
          cover: '',
          title: 'アニメ B',
          subjectId: '10002',
          info: '2026年10月4日 起'
        }
      ],
      game: [
        {
          cover: '//lain.bgm.tv/pic/cover/l/ef/gh/20001.jpg',
          title: 'ゲーム A',
          subjectId: '20001',
          info: '2026年11月'
        },
        {
          // style 与 data-cfstyle 并存时取原生属性 (与旧实现同名覆盖的语义不同, 属有意选择)
          cover: '//lain.bgm.tv/pic/cover/l/aa/aa/old.jpg',
          title: 'ゲーム B',
          subjectId: '20002',
          info: '2026年11月2日'
        },
        {
          // 原生 style 为空串时回退到 data-cfstyle
          cover: '//lain.bgm.tv/pic/cover/l/yy/yy/20003.jpg',
          title: 'ゲーム C',
          subjectId: '20003',
          info: '2026年11月3日'
        }
      ],
      book: [
        {
          cover: '//lain.bgm.tv/pic/cover/l/ij/kl/30001.jpg',
          title: '本 A',
          subjectId: '30001',
          // 只取第一个一级文本节点
          info: '2026年12月'
        }
      ],
      music: [
        {
          cover: '//lain.bgm.tv/pic/cover/l/mn/op/40002.jpg',
          // 跳过没有 title 的链接; 属性值保留实体原文 (门面 decodeEntities false)
          title: '音楽 B&amp;A',
          subjectId: '40002',
          info: '2027年1月'
        }
      ],
      real: [
        {
          cover: '//lain.bgm.tv/pic/cover/l/qr/st/50001.jpg',
          title: '実写 C',
          subjectId: '50001',
          info: '2027年2月'
        }
      ]
    })
  })

  it('按标签栏 href 归类, 与分组位置无关', () => {
    const fragment = `
<li>
<ul class="featuredTab"><li class="focus"><a href="/music">音乐</a></li></ul>
<div class="featuredItem">
<a href="/subject/90001" title="音楽 Z"><div style="background:url('//lain.bgm.tv/pic/cover/l/zz/zz/90001.jpg')"></div></a>
<p><small>2027年3月</small></p>
</div>
</li>
`

    expect(cheerioFeaturedItems(fragment)).toEqual({
      anime: [],
      game: [],
      book: [],
      music: [
        {
          cover: '//lain.bgm.tv/pic/cover/l/zz/zz/90001.jpg',
          title: '音楽 Z',
          subjectId: '90001',
          info: '2027年3月'
        }
      ],
      real: []
    })
  })

  it('标签栏取不到分类时按位置回退', () => {
    const fragment = `
<li>
<ul class="featuredTab"><li><a href="/unknown">未知</a></li></ul>
<div class="featuredItem">
<a href="/subject/90002" title="未知分类 A"><div style="background:url('//lain.bgm.tv/pic/cover/l/zz/zz/90002.jpg')"></div></a>
<p><small>2027年4月</small></p>
</div>
</li>
`

    expect(cheerioFeaturedItems(fragment).anime).toEqual([
      {
        cover: '//lain.bgm.tv/pic/cover/l/zz/zz/90002.jpg',
        title: '未知分类 A',
        subjectId: '90002',
        info: '2027年4月'
      }
    ])
  })

  it('空输入返回 5 个空分类', () => {
    const empty = { anime: [], game: [], book: [], music: [], real: [] }
    expect(cheerioFeaturedItems('')).toEqual(empty)
    expect(cheerioFeaturedItems('<li></li>')).toEqual(empty)
  })

  it('超出分类数量的节点被忽略', () => {
    const result = cheerioFeaturedItems(
      '<li>a</li><li>b</li><li>c</li><li>d</li><li>e</li><li>f</li>'
    )

    expect(Object.keys(result)).toEqual(['anime', 'game', 'book', 'music', 'real'])
  })
})
