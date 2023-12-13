import fs from 'fs/promises'
import crypto from 'crypto'
import { redirect } from 'next/navigation'

export async function saveUser(email: string, access_token: string) {
    const uniqueToken = generateUniqueToken()

    const tokenData = {
        [uniqueToken]: {
            email: email,
            accessToken: access_token,
        },
    }

    const existingTokenToData = await getData()

    const updatedTokenToData = { ...existingTokenToData, ...tokenData }

    await fs.writeFile('users.json', JSON.stringify(updatedTokenToData))

    return uniqueToken
}

function isValidJson(json: string) {
    try {
        JSON.parse(json)
        return true
    } catch (e) {
        return false
    }
}

function generateUniqueToken() {
    return crypto.randomBytes(32).toString('hex')
}

export async function getUser(token: string) {
    const data = await fs.readFile('users.json', 'utf-8')
    const tokenToData = JSON.parse(data) as {
        [token: string]: {
            email: string
            accessToken: string
            github_username: string
            github_accessToken: string
        }
    }

    const user = tokenToData[token]

    if (user === undefined) {
        redirect('/logout')
    }

    return tokenToData[token]
}

export async function addGithub(
    token: string,
    github_username: string,
    github_access_token: string,
) {
    const data = (await getData()) as {
        [token: string]: {
            email: string
            accessToken: string
            github_username: string
            github_accessToken: string
        }
    }

    if (token in data) {
        data[token].github_username = github_username
        data[token].github_accessToken = github_access_token
    } else {
        redirect('/logout')
    }

    await fs.writeFile('users.json', JSON.stringify(data))
}

async function getData() {
    let existingTokenToData = {}
    try {
        const existingData = await fs.readFile('users.json', 'utf-8')
        if (isValidJson(existingData)) {
            existingTokenToData = JSON.parse(existingData)
        }
    } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            await fs.writeFile('users.json', '{}')
        }
    }
    return existingTokenToData
}
