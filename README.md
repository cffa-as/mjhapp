# MJH App

这是一个使用Next.js和Capacitor构建的移动应用项目。

## 构建APK

### 方法1: 使用GitHub Actions (推荐)

1. 将代码推送到GitHub仓库
2. GitHub Actions会自动构建APK
3. 在Releases页面下载生成的APK文件

### 方法2: 本地构建

#### 前置要求
- Node.js 18+
- Java 17+
- Android SDK
- Android Studio (可选)

#### 构建步骤

1. 安装依赖：
```bash
npm install --legacy-peer-deps
```

2. 构建Next.js应用：
```bash
npm run build
```

3. 添加Android平台：
```bash
npx cap add android
```

4. 同步项目：
```bash
npx cap sync android
```

5. 构建APK：
```bash
cd android
./gradlew assembleDebug
```

生成的APK文件位于：`android/app/build/outputs/apk/debug/app-debug.apk`

## 项目信息

- 开发者邮箱: ff23301@163.com
- 用户名: cffa-as
- 应用ID: com.cffa.mjhapp

## 技术栈

- Next.js 15
- React 19
- Capacitor
- TypeScript
- Tailwind CSS
- Radix UI 