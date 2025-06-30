<template>
  <div class="flex gap-2 items-center">
    <!-- 日付ピッカー -->
    <v-dialog v-model="datePickerOpen" width="290px" persistent>
      <template #activator="{ props }">
        <v-text-field
          v-model="dateDisplay"
          label="日付"
          readonly
          v-bind="props"
          class="w-40"
          density="comfortable"
        />
      </template>
      <v-date-picker
        v-model="date"
        @update:modelValue="handleDateSelect"
        scrollable
      />
    </v-dialog>

    <!-- 開始時刻 -->
    <v-select
      v-model="startHour"
      :items="hourItems"
      label="開始時刻"
      density="comfortable"
      class="w-32"
      required
    />

    <!-- 終了時刻 -->
    <v-select
      v-model="endHour"
      :items="hourItems"
      label="終了時刻"
      density="comfortable"
      class="w-32"
      required
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

// props & emits
const props = defineProps<{
  start: string
  end: string
}>()

const emit = defineEmits<{
  (e: 'update:start', value: string): void
  (e: 'update:end', value: string): void
}>()

const handleDateSelect = () => {
  updateDateDisplay()
  datePickerOpen.value = false  // ✅ ダイアログを閉じる
}

// 内部状態
const date = ref('')
const dateDisplay = ref('')
const datePickerOpen = ref(false)

const startHour = ref('')
const endHour = ref('')

// 0〜23時の選択肢
const hourItems = Array.from({ length: 24 }, (_, i) => ({
  title: `${i}:00`,
  value: String(i).padStart(2, '0'),
}))

// 日付表示用の変換（yyyy/MM/dd）
const updateDateDisplay = () => {
  if (!date.value) return

  const value = date.value as unknown

  let dt: Date

  if (typeof value === 'string') {
    dt = new Date(value)
  } else if (value instanceof Date) {
    dt = value
  } else {
    return
  }

  const yyyy = dt.getFullYear()
  const mm = String(dt.getMonth() + 1).padStart(2, '0')
  const dd = String(dt.getDate()).padStart(2, '0')

  dateDisplay.value = `${yyyy}/${mm}/${dd}`
}


// emit用フォーマット関数
const formatDateTime = (dateStr: string | Date, hourStr: string): string => {
  let yyyy = '', mm = '', dd = ''

  if (typeof dateStr === 'string') {
    const [y, m, d] = dateStr.split('-')
    yyyy = y
    mm = m
    dd = d
  } else if (dateStr instanceof Date) {
    yyyy = String(dateStr.getFullYear())
    mm = String(dateStr.getMonth() + 1).padStart(2, '0')
    dd = String(dateStr.getDate()).padStart(2, '0')
  } else {
    return ''
  }

  const hh = hourStr.padStart(2, '0')
  return `${yyyy}/${mm}/${dd} ${hh}:00`
}

// emit start
watch([date, startHour], ([d, h]) => {
  if (d && h !== '') {
    emit('update:start', formatDateTime(d, h))
  }
})

// emit end
watch([date, endHour], ([d, h]) => {
  if (d && h !== '') {
    emit('update:end', formatDateTime(d, h))
  }
})

// 外からリセットされたら内部もクリア
watch(() => props.start, (newVal) => {
  if (!newVal) {
    date.value = ''
    dateDisplay.value = ''
    startHour.value = ''
  }
})

watch(() => props.end, (newVal) => {
  if (!newVal) {
    endHour.value = ''
  }
})
</script>
