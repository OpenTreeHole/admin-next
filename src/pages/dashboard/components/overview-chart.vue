<script setup lang="ts">
import { VisArea, VisAxis, VisLine, VisXYContainer } from '@unovis/vue'
import { computed, ref } from 'vue'

import type { ChartConfig } from '@/components/ui/chart'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartCrosshair,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const chartData = [
  { date: new Date('2024-04-01'), count: 5 },
  { date: new Date('2024-04-02'), count: 8 },
  { date: new Date('2024-04-03'), count: 3 },
  { date: new Date('2024-04-04'), count: 12 },
  { date: new Date('2024-04-05'), count: 6 },
  { date: new Date('2024-04-06'), count: 9 },
  { date: new Date('2024-04-07'), count: 4 },
  { date: new Date('2024-04-08'), count: 15 },
  { date: new Date('2024-04-09'), count: 2 },
  { date: new Date('2024-04-10'), count: 7 },
  { date: new Date('2024-04-11'), count: 11 },
  { date: new Date('2024-04-12'), count: 8 },
  { date: new Date('2024-04-13'), count: 13 },
  { date: new Date('2024-04-14'), count: 6 },
  { date: new Date('2024-04-15'), count: 4 },
  { date: new Date('2024-04-16'), count: 10 },
  { date: new Date('2024-04-17'), count: 18 },
  { date: new Date('2024-04-18'), count: 14 },
  { date: new Date('2024-04-19'), count: 7 },
  { date: new Date('2024-04-20'), count: 3 },
  { date: new Date('2024-04-21'), count: 6 },
  { date: new Date('2024-04-22'), count: 9 },
  { date: new Date('2024-04-23'), count: 5 },
  { date: new Date('2024-04-24'), count: 16 },
  { date: new Date('2024-04-25'), count: 8 },
  { date: new Date('2024-04-26'), count: 2 },
  { date: new Date('2024-04-27'), count: 19 },
  { date: new Date('2024-04-28'), count: 5 },
  { date: new Date('2024-04-29'), count: 12 },
  { date: new Date('2024-04-30'), count: 22 },
  { date: new Date('2024-05-01'), count: 6 },
  { date: new Date('2024-05-02'), count: 14 },
  { date: new Date('2024-05-03'), count: 9 },
  { date: new Date('2024-05-04'), count: 17 },
  { date: new Date('2024-05-05'), count: 24 },
  { date: new Date('2024-05-06'), count: 26 },
  { date: new Date('2024-05-07'), count: 15 },
  { date: new Date('2024-05-08'), count: 5 },
  { date: new Date('2024-05-09'), count: 8 },
  { date: new Date('2024-05-10'), count: 14 },
  { date: new Date('2024-05-11'), count: 16 },
  { date: new Date('2024-05-12'), count: 7 },
  { date: new Date('2024-05-13'), count: 6 },
  { date: new Date('2024-05-14'), count: 25 },
  { date: new Date('2024-05-15'), count: 23 },
  { date: new Date('2024-05-16'), count: 16 },
  { date: new Date('2024-05-17'), count: 28 },
  { date: new Date('2024-05-18'), count: 13 },
  { date: new Date('2024-05-19'), count: 8 },
  { date: new Date('2024-05-20'), count: 6 },
  { date: new Date('2024-05-21'), count: 3 },
  { date: new Date('2024-05-22'), count: 2 },
  { date: new Date('2024-05-23'), count: 11 },
  { date: new Date('2024-05-24'), count: 14 },
  { date: new Date('2024-05-25'), count: 7 },
  { date: new Date('2024-05-26'), count: 6 },
  { date: new Date('2024-05-27'), count: 21 },
  { date: new Date('2024-05-28'), count: 9 },
  { date: new Date('2024-05-29'), count: 2 },
  { date: new Date('2024-05-30'), count: 17 },
  { date: new Date('2024-05-31'), count: 6 },
  { date: new Date('2024-06-01'), count: 8 },
  { date: new Date('2024-06-02'), count: 24 },
  { date: new Date('2024-06-03'), count: 4 },
  { date: new Date('2024-06-04'), count: 22 },
  { date: new Date('2024-06-05'), count: 3 },
  { date: new Date('2024-06-06'), count: 14 },
  { date: new Date('2024-06-07'), count: 16 },
  { date: new Date('2024-06-08'), count: 18 },
  { date: new Date('2024-06-09'), count: 25 },
  { date: new Date('2024-06-10'), count: 5 },
  { date: new Date('2024-06-11'), count: 3 },
  { date: new Date('2024-06-12'), count: 28 },
  { date: new Date('2024-06-13'), count: 2 },
  { date: new Date('2024-06-14'), count: 23 },
  { date: new Date('2024-06-15'), count: 15 },
  { date: new Date('2024-06-16'), count: 17 },
  { date: new Date('2024-06-17'), count: 27 },
  { date: new Date('2024-06-18'), count: 4 },
  { date: new Date('2024-06-19'), count: 16 },
  { date: new Date('2024-06-20'), count: 20 },
  { date: new Date('2024-06-21'), count: 6 },
  { date: new Date('2024-06-22'), count: 13 },
  { date: new Date('2024-06-23'), count: 26 },
  { date: new Date('2024-06-24'), count: 5 },
  { date: new Date('2024-06-25'), count: 6 },
  { date: new Date('2024-06-26'), count: 22 },
  { date: new Date('2024-06-27'), count: 24 },
  { date: new Date('2024-06-28'), count: 7 },
  { date: new Date('2024-06-29'), count: 4 },
  { date: new Date('2024-06-30'), count: 23 },
]
type Data = typeof chartData[number]

const chartConfig = {
  count: {
    label: '发送数量',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const svgDefs = `
  <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
    <stop
      offset="5%"
      stop-color="var(--color-count)"
      stop-opacity="0.8"
    />
    <stop
      offset="95%"
      stop-color="var(--color-count)"
      stop-opacity="0.1"
    />
  </linearGradient>
`

const timeRange = ref('90d')

const filterRange = computed(() => {
  return chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange.value === '30d') {
      daysToSubtract = 30
    }
    else if (timeRange.value === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })
})
</script>

<template>
  <Card class="pt-0">
    <CardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div class="grid flex-1 gap-1">
        <CardTitle>站内信发送统计</CardTitle>
        <CardDescription>
          显示过去 3 个月的站内信发送数量
        </CardDescription>
      </div>
      <Select v-model="timeRange">
        <SelectTrigger
          class="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="过去 3 个月" />
        </SelectTrigger>
        <SelectContent class="rounded-xl">
          <SelectItem value="90d" class="rounded-lg">
            过去 3 个月
          </SelectItem>
          <SelectItem value="30d" class="rounded-lg">
            过去 30 天
          </SelectItem>
          <SelectItem value="7d" class="rounded-lg">
            过去 7 天
          </SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6 pb-4">
      <ChartContainer :config="chartConfig" class="aspect-auto h-[250px] w-full" :cursor="false">
        <VisXYContainer
          :data="filterRange"
          :svg-defs="svgDefs"
          :margin="{ left: -40 }"
          :y-domain="[0, 30]"
        >
          <VisArea
            :x="(d: Data) => d.date"
            :y="(d: Data) => d.count"
            color="url(#fillCount)"
            :opacity="0.6"
          />
          <VisLine
            :x="(d: Data) => d.date"
            :y="(d: Data) => d.count"
            :color="chartConfig.count.color"
            :line-width="1"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="6"
            :tick-format="(d: number, _index: number) => {
              const date = new Date(d)
              return date.toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
              })
            }"
          />
          <VisAxis
            type="y"
            :num-ticks="3"
            :tick-line="false"
            :domain-line="false"
          />
          <ChartTooltip />
          <ChartCrosshair
            :template="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: (d) => {
                return new Date(d).toLocaleDateString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                })
              },
            })"
            :color="chartConfig.count.color"
          />
        </VisXYContainer>

        <ChartLegendContent />
      </ChartContainer>
    </CardContent>
  </Card>
</template>
