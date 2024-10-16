import { defineComponent, reactive, ref, toRaw, getCurrentInstance } from 'vue'
import { Form, FormItem, Button } from 'ant-design-vue'
import styled, { css } from 'styled-components'
import { componentConfig } from './componentTypes'
import style from './style.module.less'

export const Line = () => {
  return <div className={style.line}></div>
}

export const FormFile = () => {
  const blob = new Blob(['测试文字'], { type: 'text/plain' })
  const onFileChange = e => {
    console.log('file change', e.target)
  }
  const onExchange = async e => {
    console.log('exchange', blob, blob.size, blob.type)
    const text = await blob.slice(0, 3).text()
    console.log('exchange slice', text)
  }
  return (
    <div>
      {/* <input type="file" onChange={onFileChange} /> */}
      <Button onClick={onExchange} type="primary">
        测试
      </Button>
    </div>
  )
}

export const FormTitle = defineComponent({
  name: 'FormTitle',
  props: {},
  setup(props) {
    return () => <h1>表单标题</h1>
  },
})

export const StruggleForm = defineComponent({
  name: 'StruggleForm',
  props: {
    formSchemas: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  emits: ['submit'],
  setup(props) {
    const formRef = ref()
    const vm = getCurrentInstance()

    const { formSchemas } = props
    const formState = reactive(
      formSchemas
        .map(schema => {
          return {
            key: schema.field,
            value: schema.defaultValue,
          }
        })
        .reduce((prev, cur) => {
          return {
            ...prev,
            [cur.key]: cur.value,
          }
        }, {}),
    )
    const formProps = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }
    const onSubmit = async () => {
      // console.log('submit', toRaw(formState))
      // console.log('submit ref', formRef.value)
      await formRef.value?.validate?.()
      vm?.emit('submit', formState)
    }
    return () => (
      <div>
        <Form name="form" {...formProps} model={formState} ref={formRef}>
          {formSchemas.map(formSchema => {
            const FormItemCompoent = componentConfig[formSchema.component]
            return (
              <FormItem
                label={formSchema.label}
                rules={[
                  {
                    required: formSchema.required,
                    message: formSchema.message || '必填',
                  },
                ]}
              >
                <FormItemCompoent
                  {...formSchema.componentProps}
                  onChange={e => {
                    // console.log('onChange', e)
                    switch (formSchema.component) {
                      case 'Textarea':
                      case 'Input':
                        formState[formSchema.field] = e.target.value
                        break
                      case 'Select':
                        formState[formSchema.field] = e
                        break
                    }
                  }}
                />
              </FormItem>
            )
          })}
          <FormItem>
            <Button type="primary" onClick={onSubmit}>
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  },
})

export const downloadBlobText = props => {
  const { title = '下载文件', link, done } = props || {}
  const dom = ref()
  const onClick = e => {
    const url = URL.createObjectURL(link)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.txt`
    a.click()
    URL.revokeObjectURL(url)
    done?.()
  }
  return (
    <span className={style.downloadLink} onClick={onClick}>
      {title}
      <span className={style.download} ref={dom}></span>
    </span>
  )
}

export const ImgFileReader = defineComponent({
  name: 'ImgFileReader',
  props: {},
  setup(props, ctx) {
    const imgList = ref([])
    const onChange = e => {
      const file = e.target.files[0]
      imgList.value.push(URL.createObjectURL(file))
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = readerEvent => {
          imgList.value.push(readerEvent.target?.result)
        }
        reader.readAsDataURL(file)
      }
    }
    return () => (
      <div>
        <input type="file" accept="image/*" onChange={onChange} />
        <div id={style.imageContainer}>
          {imgList.value.map(img => (
            <img className={style.img} src={img} />
          ))}
        </div>
      </div>
    )
  },
})

export const StyleWrapper = styled.section`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`

export const StyleButton = styled.button`
  background-color: #ff1010;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: none;

  ${props =>
    props.primary &&
    css`
      background: #639ef4;
    `}
`
