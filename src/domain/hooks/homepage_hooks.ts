import {iQuestion} from "@/domain/interfaces/question_intefaces";
import {ElMessage} from "element-plus";
import {iCategory} from "@/domain/interfaces/category_interfaces";
import {inject} from "vue";
import {IAccountRepository} from "@/domain/repositories/abstracts/AccountRepository.types";

export function UseHomepageHooks():any {
    const accountRepository = inject('accountRepository') as IAccountRepository;

    const get_all_questions = async() => {
        try {
            const response = await accountRepository.get_questions()
            const questions:Array<iQuestion> = response.data.results
            return questions
        } catch (e) {
            ElMessage({
                showClose: true,
                message: `${e}`,
                type: 'error',
            })
        }
    };
    const get_all_categories = async() => {
        try {
            const response = await accountRepository.get_categories()
            const categories:Array<iCategory> = response.data.results
            return categories
        } catch (e) {
            ElMessage({
                showClose: true,
                message: `${e}`,
                type: 'error',
            })
        }
    };
    const get_all_users = async() => {
        try {
            const response = await accountRepository.get_users()
            const users = response.data.results
            return users
        } catch (e) {
            ElMessage({
                showClose: true,
                message: `${e}`,
                type: 'error',
            })
        }
    };


    return {
        get_all_questions,
        get_all_categories,
        get_all_users,
    }
}