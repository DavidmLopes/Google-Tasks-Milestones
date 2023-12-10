import { getAllTasks } from '@/lib/googleTasks'
import React from 'react'

export default async function Tasks({
    google,
}: {
    google: { accessToken: string }
}) {
    const tasks = await getAllTasks(google.accessToken)

    return (
        <ul>
            {tasks.map((item) => {
                return (
                    <li key={item.id}>
                        <h3 className="rounded-md bg-neutral-300 p-2 font-bold dark:bg-neutral-700">
                            {item.title}
                        </h3>
                        <ul className="indent-4">
                            {item.tasks.map((task) => {
                                return (
                                    <li
                                        key={task.id}
                                        className="my-1 flex items-center justify-between rounded-md bg-neutral-100 p-2 dark:bg-neutral-900"
                                    >
                                        {task.title}
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
