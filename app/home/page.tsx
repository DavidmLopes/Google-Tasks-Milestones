import React from 'react'
import { cookies } from 'next/headers'
import { getAllTasks, getAllTasksLists } from '@lib/googleTasks'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('access_token')?.value ?? redirect('/')
    const githubAccessToken =
        cookieStore.get('github_access_token')?.value ?? ''

    const tasksLists = await getAllTasksLists(accessToken)
    const tasks = await getAllTasks(accessToken, tasksLists)

    return (
        <div>
            <div>
                <h2 className="my-4 text-2xl font-bold">Tasks</h2>
                <ul>
                    {tasks.map((item) => {
                        return (
                            <li key={item.id}>
                                <h3 className="font-bold">{item.title}</h3>
                                <ul className="indent-4">
                                    {item.tasks.map((task) => {
                                        return (
                                            <li key={task.id}>{task.title}</li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <hr className="my-8"></hr>
            <div>
                <h2 className="my-4 text-2xl font-bold">Github Milestones</h2>
                {githubAccessToken === '' ? (
                    <Link href={'/home/authorize'}>
                        <div className="w-max rounded-lg bg-highlights px-6 py-2 text-center font-medium hover:bg-highlights-h">
                            Authorize Github
                        </div>
                    </Link>
                ) : (
                    <div>You are authorize</div>
                )}
            </div>
        </div>
    )
}
