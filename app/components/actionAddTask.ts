'use server'

import { insertTask } from '@/lib/googleTasks'
import { revalidatePath } from 'next/cache'

export async function addTask(dataForm: FormData, access_token: string) {
    const name = dataForm.get('name')?.toString() ?? ''
    const taskList = dataForm.get('taskList')?.toString() ?? ''

    await insertTask(access_token, taskList, name)

    revalidatePath('/home')
}
