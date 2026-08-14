# 项目架构

## 技术栈

- **框架**: React Native + Expo SDK 54
- **状态管理**: MobX 6 + mobx-react 9
- **导航**: React Navigation 6（native-stack + bottom-tabs）
- **样式**: StyleSheet + 自定义 memoStyles() 缓存
- **HTTP**: 自封装 fetchAPI() + fetchHTML()（cheerio 解析 HTML）
- **构建**: EAS (Expo Application Services) + Fastlane + GitHub Actions

## 目录结构

```
├── src/                    # 主源码
│   ├── App.tsx             # 入口（平台拆分: App.android.tsx）
│   ├── config.ts           # 开发标志、代理、初始路由
│   ├── components/         # ~80+ 可复用 UI 组件
│   ├── screens/            # 所有页面模块（~100+）
│   ├── stores/             # MobX domain stores（18个）
│   ├── navigations/        # React Navigation 配置
│   ├── constants/          # 常量: api/, html/, cdn/, device/, model/, site/, i18n/
│   ├── styles/             # 主题、颜色、布局工具 (index.ts 汇总; colors.ts 单文件; layout.ts 布局/尺寸; device.ts 设备检测; tools/ 工具类: container/margin/border/effect/legacy)
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # ~35+ 工具模块
│   └── assets/             # 图片、字体、JSON 数据
├── android/                # Android 原生工程
├── ios/                    # iOS 原生工程
├── packages/               # 构建脚本（android/ios/ipa/web）
├── web/                    # IPA 构建、更新日志
├── patches/                # patch-package 补丁
├── [deprecated]/           # 废弃代码
└── test/                   # 测试数据
```

## 路径别名

| 别名 | 路径 |
|------|------|
| `@components` | `src/components/` |
| `@screens` | `src/screens/` |
| `@stores` | `src/stores/` |
| `@utils` | `src/utils/` |
| `@constants` | `src/constants/` |
| `@styles` | `src/styles/` |
| `@types` | `src/types/` |
| `@assets` | `src/assets/` |
| `@src` | `src/` |

## 导航结构

- **Root Stack**: `createNativeStackNavigator()` — 所有页面作为 Stack.Screen
- **Bottom Tab**: 6 个主 tab — Discovery / Timeline / Home / Rakuen / User / Tinygrail
- **懒加载**: 非 tab 页面使用 `React.lazy()` 代码分割
- **配置**: `src/screens/index.ts` 导出 ~100+ 页面组件

## 构建/部署

- **EAS**: `eas.json` — development / preview / production profiles
- **Fastlane**: Android 商店元数据
- **CI**: `.github/workflows/build-upstream-ipa.yml` — IPA 构建
- **发布**: `npm run pub`（eas update → production channel）
