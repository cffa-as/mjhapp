"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, Target, Clock, Save, Sparkles } from "lucide-react"

// 阶段配置
const stages = [
  { name: "一段", jiehui: 0, dadao: 10, tiandao: 10, feiqiu: 0 },
  { name: "二段", jiehui: 1, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "三段", jiehui: 2, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "四段", jiehui: 3, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "五段", jiehui: 4, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "六段", jiehui: 5, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "七段", jiehui: 6, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "八段", jiehui: 7, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "九段", jiehui: 8, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十段", jiehui: 9, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十一段", jiehui: 10, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十二段", jiehui: 11, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十三段", jiehui: 12, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十四段", jiehui: 13, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十五段", jiehui: 14, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十六段", jiehui: 15, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十七段", jiehui: 16, dadao: 20, tiandao: 20, feiqiu: 0 },
  { name: "十八段", jiehui: 17, dadao: 30, tiandao: 30, feiqiu: 0 },
  { name: "准圣", jiehui: 18, dadao: 18, tiandao: 18, feiqiu: 0 },
  { name: "圣人", jiehui: 49, dadao: 49, tiandao: 49, feiqiu: 3 },
]

export default function Component() {
  const [currentStage, setCurrentStage] = useState(8) // 九段对应索引8

  // 每日一句名言数据
  const quotes = [
    { text: "修行如登山，一步一个脚印，终能登顶望远。", author: "修行感悟" },
    { text: "道可道，非常道；名可名，非常名。", author: "老子" },
    { text: "天行健，君子以自强不息。", author: "周易" },
    { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" },
    { text: "不积跬步，无以至千里；不积小流，无以成江海。", author: "荀子" },
    { text: "宝剑锋从磨砺出，梅花香自苦寒来。", author: "古诗" },
    { text: "山重水复疑无路，柳暗花明又一村。", author: "陆游" },
    { text: "千里之行，始于足下。", author: "老子" },
    { text: "业精于勤，荒于嬉；行成于思，毁于随。", author: "韩愈" },
    { text: "锲而舍之，朽木不折；锲而不舍，金石可镂。", author: "荀子" },
    { text: "欲穷千里目，更上一层楼。", author: "王之涣" },
    { text: "海纳百川，有容乃大；壁立千仞，无欲则刚。", author: "林则徐" },
  ]

  // 获取今日名言
  const getTodayQuote = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    return quotes[dayOfYear % quotes.length]
  }

  const todayQuote = getTodayQuote()
  const [currentMaterials, setCurrentMaterials] = useState({
    jiehui: 74,
    dadao: 10,
    tiandao: 11,
  })
  const [targetStage, setTargetStage] = useState(18) // 准圣
  const [extraMaterials, setExtraMaterials] = useState({
    jiehui: 0,
    dadao: 54,
    tiandao: 0,
  })
  const [weeklyActivities, setWeeklyActivities] = useState([
    { id: 1, name: "天府 (10次)", suipian: 3, guize: 1 },
    { id: 2, name: "每日八点活动", suipian: 7, guize: 3.5 },
    { id: 3, name: "八点半活动", suipian: 11, guize: 18 },
    { id: 4, name: "每周打本", suipian: 3, guize: 1 },
  ])

  // 本地存储
  useEffect(() => {
    const saved = localStorage.getItem("mengjianghuprogress")
    if (saved) {
      const data = JSON.parse(saved)
      setCurrentStage(data.currentStage || 8)
      setCurrentMaterials(data.currentMaterials || { jiehui: 74, dadao: 10, tiandao: 11 })
      setTargetStage(data.targetStage || 18)
      setExtraMaterials(data.extraMaterials || { jiehui: 0, dadao: 54, tiandao: 0 })
      setWeeklyActivities(
        data.weeklyActivities || [
          { id: 1, name: "天府 (10次)", suipian: 3, guize: 1 },
          { id: 2, name: "每日八点活动", suipian: 7, guize: 3.5 },
          { id: 3, name: "八点半活动", suipian: 11, guize: 18 },
          { id: 4, name: "每周打本", suipian: 3, guize: 1 },
        ],
      )
    }
  }, [])

  const saveProgress = () => {
    const data = {
      currentStage,
      currentMaterials,
      targetStage,
      extraMaterials,
      weeklyActivities,
    }
    localStorage.setItem("mengjianghuprogress", JSON.stringify(data))
  }

  // 计算所需材料
  const calculateRequiredMaterials = () => {
    let totalJiehui = 0
    let totalDadao = 0
    let totalTiandao = 0
    let totalFeiqiu = 0

    for (let i = currentStage + 1; i <= targetStage; i++) {
      totalJiehui += stages[i].jiehui
      totalDadao += stages[i].dadao
      totalTiandao += stages[i].tiandao
      totalFeiqiu += stages[i].feiqiu
    }

    return {
      jiehui: Math.max(0, totalJiehui - currentMaterials.jiehui - extraMaterials.jiehui),
      dadao: Math.max(0, totalDadao - currentMaterials.dadao - extraMaterials.dadao),
      tiandao: Math.max(0, totalTiandao - currentMaterials.tiandao - extraMaterials.tiandao),
      feiqiu: totalFeiqiu,
    }
  }

  const calculateEstimatedTime = () => {
    const required = calculateRequiredMaterials()

    const totalWeeklyIncome = {
      suipian: weeklyActivities.reduce((sum, activity) => sum + activity.suipian, 0),
      guize: weeklyActivities.reduce((sum, activity) => sum + activity.guize, 0),
    }

    const weeksForGuize = Math.ceil(required.dadao / totalWeeklyIncome.guize)
    const weeksForSuipian = Math.ceil(required.tiandao / totalWeeklyIncome.suipian)

    return Math.max(weeksForGuize, weeksForSuipian)
  }

  const required = calculateRequiredMaterials()
  const estimatedWeeks = calculateEstimatedTime()
  const progressPercentage = ((currentStage + 1) / stages.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-3 sm:p-4">
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
        {/* 标题 */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            梦江湖成圣进度计算器
          </h1>
          <p className="text-sm sm:text-base text-gray-600">精确计算你的成圣之路</p>
        </div>

        {/* 当前进度卡片 */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5" />
              当前进度
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{stages[currentStage].name}</span>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {currentStage + 1}/{stages.length}
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-white/20" />
              <p className="text-sm opacity-90">距离圣人还有 {stages.length - currentStage - 1} 个阶段</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="calculator" className="flex items-center gap-1 text-xs sm:text-sm">
              <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">计算器</span>
              <span className="sm:hidden">计算</span>
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-1 text-xs sm:text-sm">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">材料需求</span>
              <span className="sm:hidden">材料</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-1 text-xs sm:text-sm">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">时间预测</span>
              <span className="sm:hidden">时间</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            {/* 当前状态设置 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">当前状态</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-stage" className="text-sm font-medium">
                    当前阶段
                  </Label>
                  <Select
                    value={currentStage.toString()}
                    onValueChange={(value) => setCurrentStage(Number.parseInt(value))}
                  >
                    <SelectTrigger className="h-12 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {stage.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">当前材料</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label htmlFor="jiehui" className="text-xs text-gray-600">
                        劫灰
                      </Label>
                      <Input
                        id="jiehui"
                        type="number"
                        value={currentMaterials.jiehui}
                        onChange={(e) =>
                          setCurrentMaterials((prev) => ({ ...prev, jiehui: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="h-12 text-center"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dadao" className="text-xs text-gray-600">
                        大道
                      </Label>
                      <Input
                        id="dadao"
                        type="number"
                        value={currentMaterials.dadao}
                        onChange={(e) =>
                          setCurrentMaterials((prev) => ({ ...prev, dadao: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="h-12 text-center"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tiandao" className="text-xs text-gray-600">
                        天道
                      </Label>
                      <Input
                        id="tiandao"
                        type="number"
                        value={currentMaterials.tiandao}
                        onChange={(e) =>
                          setCurrentMaterials((prev) => ({ ...prev, tiandao: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="h-12 text-center"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">额外材料（例如礼包）</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div>
                      <Label htmlFor="extra-jiehui" className="text-xs text-gray-600">
                        劫灰
                      </Label>
                      <Input
                        id="extra-jiehui"
                        type="number"
                        value={extraMaterials.jiehui}
                        onChange={(e) =>
                          setExtraMaterials((prev) => ({ ...prev, jiehui: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="h-12 text-center"
                      />
                    </div>
                    <div>
                      <Label htmlFor="extra-dadao" className="text-xs text-gray-600">
                        规则
                      </Label>
                      <Input
                        id="extra-dadao"
                        type="number"
                        value={extraMaterials.dadao}
                        onChange={(e) =>
                          setExtraMaterials((prev) => ({ ...prev, dadao: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="h-12 text-center"
                      />
                    </div>
                    <div>
                      <Label htmlFor="extra-tiandao" className="text-xs text-gray-600">
                        碎片
                      </Label>
                      <Input
                        id="extra-tiandao"
                        type="number"
                        value={extraMaterials.tiandao}
                        onChange={(e) =>
                          setExtraMaterials((prev) => ({ ...prev, tiandao: Number.parseInt(e.target.value) || 0 }))
                        }
                        className="h-12 text-center"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 目标设置 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">目标设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="target-stage" className="text-sm font-medium">
                    目标阶段
                  </Label>
                  <Select
                    value={targetStage.toString()}
                    onValueChange={(value) => setTargetStage(Number.parseInt(value))}
                  >
                    <SelectTrigger className="h-12 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.slice(currentStage + 1).map((stage, index) => (
                        <SelectItem key={currentStage + 1 + index} value={(currentStage + 1 + index).toString()}>
                          {stage.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={saveProgress} className="w-full h-12 bg-transparent" variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  保存进度
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            {/* 还需材料 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">还需材料</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="font-medium">劫灰</span>
                  <Badge variant={required.jiehui > 0 ? "destructive" : "secondary"} className="text-base px-3 py-1">
                    {required.jiehui}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium">大道规则</span>
                  <Badge variant={required.dadao > 0 ? "destructive" : "secondary"} className="text-base px-3 py-1">
                    {required.dadao}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="font-medium">天道碎片</span>
                  <Badge variant={required.tiandao > 0 ? "destructive" : "secondary"} className="text-base px-3 py-1">
                    {required.tiandao}
                  </Badge>
                </div>
                {required.feiqiu > 0 && (
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium">非酋</span>
                    <Badge variant="destructive" className="text-base px-3 py-1">
                      {required.feiqiu}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 可用资源 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">可用资源</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">劫灰</span>
                  <div className="text-right">
                    <div className="font-medium">{currentMaterials.jiehui + extraMaterials.jiehui}</div>
                    {extraMaterials.jiehui > 0 && (
                      <div className="text-xs text-blue-600">(+{extraMaterials.jiehui}礼包)</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">大道规则</span>
                  <div className="text-right">
                    <div className="font-medium">{currentMaterials.dadao + extraMaterials.dadao}</div>
                    {extraMaterials.dadao > 0 && (
                      <div className="text-xs text-blue-600">(+{extraMaterials.dadao}礼包)</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">天道碎片</span>
                  <div className="text-right">
                    <div className="font-medium">{currentMaterials.tiandao + extraMaterials.tiandao}</div>
                    {extraMaterials.tiandao > 0 && (
                      <div className="text-xs text-blue-600">(+{extraMaterials.tiandao}礼包)</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            {/* 时间预测 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">时间预测</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{estimatedWeeks}</div>
                  <div className="text-gray-600 mb-1">预计需要周数</div>
                  <div className="text-sm text-gray-500">约 {Math.ceil(estimatedWeeks / 4)} 个月</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-700 mb-1">预计完成时间</div>
                  <div className="text-sm text-gray-600">
                    {new Date(Date.now() + estimatedWeeks * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("zh-CN")}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 每周收益设置 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">每周收益设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {weeklyActivities.map((activity, index) => (
                    <div key={activity.id} className="p-3 bg-gray-50 rounded-lg border space-y-3">
                      <Input
                        value={activity.name}
                        onChange={(e) => {
                          const newActivities = [...weeklyActivities]
                          newActivities[index].name = e.target.value
                          setWeeklyActivities(newActivities)
                        }}
                        placeholder="活动名称"
                        className="border-0 bg-transparent focus:bg-white h-10"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            value={activity.suipian}
                            onChange={(e) => {
                              const newActivities = [...weeklyActivities]
                              newActivities[index].suipian = Number.parseFloat(e.target.value) || 0
                              setWeeklyActivities(newActivities)
                            }}
                            placeholder="0"
                            className="w-20 text-center h-10"
                          />
                          <span className="text-sm text-gray-500">碎片</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            value={activity.guize}
                            onChange={(e) => {
                              const newActivities = [...weeklyActivities]
                              newActivities[index].guize = Number.parseFloat(e.target.value) || 0
                              setWeeklyActivities(newActivities)
                            }}
                            placeholder="0"
                            className="w-20 text-center h-10"
                          />
                          <span className="text-sm text-gray-500">规则</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newActivities = weeklyActivities.filter((_, i) => i !== index)
                            setWeeklyActivities(newActivities)
                          }}
                          className="h-10 w-10 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    const newId = Math.max(...weeklyActivities.map((a) => a.id)) + 1
                    setWeeklyActivities([...weeklyActivities, { id: newId, name: "新活动", suipian: 0, guize: 0 }])
                  }}
                  className="w-full h-12 border-dashed border-2 hover:border-blue-300 hover:bg-blue-50"
                >
                  + 添加活动
                </Button>

                <div className="flex justify-between items-center font-medium bg-green-50 p-4 rounded-lg">
                  <span>每周总计</span>
                  <div className="text-right">
                    <div className="text-blue-600">
                      {weeklyActivities.reduce((sum, activity) => sum + activity.suipian, 0).toFixed(1)}碎片
                    </div>
                    <div className="text-blue-600">
                      {weeklyActivities.reduce((sum, activity) => sum + activity.guize, 0).toFixed(1)}规则
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 每日一句 */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="space-y-2">
              <div className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed">"{todayQuote.text}"</div>
              <div className="text-xs sm:text-sm text-gray-500">—— 每日一句 · {todayQuote.author}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
