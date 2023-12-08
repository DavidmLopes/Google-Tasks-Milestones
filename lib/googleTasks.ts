export async function getAllTasksLists(access_token: string) {
    const items: Array<{ title: string; id: string }> = await fetch(
        'https://tasks.googleapis.com/tasks/v1/users/@me/lists',
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        },
    )
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data.items.map((item: { title: string; id: string }) => {
                return item
            })
        })

    return items
}

export async function getAllTasks(
    access_token: string,
    tasksLists: Array<{ title: string; id: string }>,
) {
    const tasksPromises = tasksLists.map(async (item) => {
        const tasks: Array<{ title: string; id: string }> = await fetch(
            `https://tasks.googleapis.com/tasks/v1/lists/${item.id}/tasks`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                return data.items.map((item: { title: string; id: string }) => {
                    return item
                })
            })
        return { title: item.title, id: item.id, tasks: tasks }
    })
    const tasks = await Promise.all(tasksPromises).then((data) => {
        return data.flat()
    })

    return tasks
}
