<script setup lang="ts">
import {
  StruggleForm,
  downloadBlobText,
  Line,
  ImgFileReader,
} from '@/components/form/index'
import { reactive, ref } from 'vue'

const formSchemas = [
  {
    field: 'text',
    label: '待处理文本',
    component: 'Textarea',
    required: true,
  },
  {
    field: 'generateType',
    label: '生成类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        {
          label: 'Blob',
          value: 0,
        },
      ],
    },
  },
  {
    field: 'name',
    label: '文件名称',
    component: 'Input',
    required: true,
  },
]
const showDownloadBtn = ref(0)
const downloadBtnProps = reactive<{ link?: Blob; title?: string }>({})
const onBlobHandle = ({ name, text }) => {
  const blob = new Blob([text], { type: 'text/plain' })
  const { size, type } = blob
  console.log(`输入文本的大小: ${size}, MIME类型:${type}`)
  showDownloadBtn.value = 1
  downloadBtnProps.link = blob
  downloadBtnProps.title = name
}
const onDownloadDone = () => (showDownloadBtn.value = 0)
const onSubmit = data => {
  const { name, text, generateType } = data
  switch (generateType) {
    case 0:
      onBlobHandle({ name, text })
      break
  }
}
</script>

<template>
  <div>
    <h2>struggle: 德语 奋斗!</h2>
    <Line />
    <StruggleForm :formSchemas="formSchemas" @submit="onSubmit" />
    <Line />
    <downloadBlobText
      v-show="showDownloadBtn"
      :link="downloadBtnProps.link"
      :title="downloadBtnProps.title"
      @done="onDownloadDone"
    />
    <Line />
    <ImgFileReader />
    <Line />
  </div>
</template>
