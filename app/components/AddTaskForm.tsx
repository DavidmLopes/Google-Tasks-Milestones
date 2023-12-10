'use client'

import React from 'react'
import Image from 'next/image'
import { addTask } from './actionAddTask'

export default function AddTaskForm({
    google,
    taskLists,
    name,
}: {
    google: { accessToken: string }
    taskLists: Array<{ id: string; title: string }>
    name: string
}) {
    const [selectedTaskList, setSelectedTaskList] = React.useState('')

    async function action(dataForm: FormData) {
        dataForm.append('name', name)
        dataForm.append('taskList', selectedTaskList)
        await addTask(dataForm, google.accessToken)
    }

    return (
        <form action={action} className="flex gap-2">
            <select
                name="taskList"
                value={selectedTaskList}
                onChange={(e) => setSelectedTaskList(e.target.value)}
                className="cursor-pointer rounded-xl bg-neutral-300 p-2 dark:bg-neutral-700"
            >
                {taskLists.map((taskList) => {
                    return (
                        <option
                            key={taskList.id}
                            value={taskList.id}
                            label={taskList.title}
                        ></option>
                    )
                })}
            </select>
            <button
                type="submit"
                className="rounded-xl bg-neutral-300 p-2 dark:bg-neutral-700"
            >
                <Image
                    src="/plus-white.svg"
                    alt={''}
                    width={24}
                    height={24}
                ></Image>
            </button>
        </form>
    )
}
