import React from 'react'
import { cookies } from 'next/headers'
import { getAllTasks, getAllTasksLists } from '@lib/googleTasks'
import { redirect } from 'next/navigation'

export default async function Home() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('access_token')?.value ?? redirect('/')

    const tasksLists = await getAllTasksLists(accessToken)
    const tasks = await getAllTasks(accessToken, tasksLists)

    return (
        <div>
            <h2 className="my-2 text-2xl font-bold">Tasks</h2>
            <ul>
                {tasks.map((item) => {
                    return (
                        <li key={item.id}>
                            <h3 className="font-bold">{item.title}</h3>
                            <ul className="indent-4">
                                {item.tasks.map((task) => {
                                    return <li key={task.id}>{task.title}</li>
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
