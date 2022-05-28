<template>
  <div class="login__wrapper">
    <el-form
        ref="registerFormRef"
        :model="register_form"
        :rules="register_rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
    >
      <el-form-item label="Логин" prop="username">
        <el-input v-model="register_form.username" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="register_form.email" />
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="register_form.password" type="password" autocomplete="off" show-password placeholder="Минимум 8 символов"/>
      </el-form-item>
      <el-form-item label="Повторите пароль" prop="password_again">
        <el-input v-model="register_form.password_again" type="password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(registerFormRef)">Очистить форму</el-button>
        <el-button type="success" @click="submitForm(registerFormRef)">Зарегистрироваться</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, ref, reactive} from 'vue';
import {useRouter} from "vue-router";
import {IJWTNetworkDriver} from "@/domain/drivers/IJWTNetworkDriver";
import {IAccountRepository} from "@/domain/repositories/abstracts/AccountRepository.types";
import {ElMessage} from "element-plus";
import {useCookies} from "vue3-cookies";
import type { FormInstance, FormRules } from 'element-plus'

export default defineComponent({
  setup() {
    const router = useRouter();
    const networkDriver = inject('networkDriver') as IJWTNetworkDriver;
    const accountRepository = inject('accountRepository') as IAccountRepository;

    const formSize = ref('default')
    const registerFormRef = ref<FormInstance>()
    const register_form = reactive({
      username: '',
      email: '',
      password: '',
      password_again: '',
    })


    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Введите пароль'))
      } else if (register_form.password.length<7) {
        callback(new Error('Минимум 8 символов'))
      } else {
        if (register_form.password !== '') {
          if (!registerFormRef.value) return
          registerFormRef.value.validateField('checkPass', () => null)
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Введите пароль'))
      } else if (value !== register_form.password) {
        callback(new Error("Пароли не совпадают"))
      } else {
        callback()
      }
    }

    const register_rules = reactive<FormRules>({
      username: [
        { required: true, message: 'Пожалуйста, введите логин', trigger: 'blur' },
        { min: 3, message: 'Минимум 3 буквы', trigger: 'blur' },
      ],
      email: [
        {
          required: true,
          message: 'Введите почту',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Введите корректную почту',
          trigger: 'blur',
        },
      ],
      password: [{ validator: validatePass, trigger: 'blur' }],
      password_again: [{ validator: validatePass2, trigger: 'blur' }],

    })


    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          let data = {
            username: register_form.username,
            // email: register_form.email,
            password: register_form.password,
          }
          const res = networkDriver.register(data).then((response:any) => {
            if (response.status === 201) {
              ElMessage({
                showClose: true,
                message: 'Вы успешно зарегистрировались',
                type: 'success',
              })
              router.replace({
                name: 'login'
              })
            } else if (typeof response.response.status !== 'undefined' && response.response.status === 400) {
              const errors:any = Object.values(response.response.data)[0]
              errors.forEach((i:any) => {
                ElMessage({
                  showClose: true,
                  message: `${i}`,
                  type: 'error',
                })
              })
            } else {
              ElMessage({
                showClose: true,
                message: 'Неизвестная ошибка, обратитесь к администратору',
                type: 'error',
              })
            }
          }).catch((err:any) => {
            const errors:any = Object.values(err.response.data)[0]
            errors.forEach((i:any) => {
              ElMessage({
                showClose: true,
                message: `${i}`,
                type: 'error',
              })
            })
          })
        } else {
          ElMessage({
            showClose: true,
            message: 'Заполните обязательные поля.',
            type: 'error',
          })
        }
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return {
      // validatePass,
      // validatePass2,
      networkDriver,
      accountRepository,
      formSize,
      register_rules,
      registerFormRef,
      register_form,
      submitForm,
      resetForm
    }
  },
});
</script>




<style lang="scss">
@import "@/assets/styles/login_page/login_page.scss";

</style>