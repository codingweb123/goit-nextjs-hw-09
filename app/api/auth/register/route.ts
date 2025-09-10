import { NextRequest, NextResponse } from "next/server"
import { api } from "../../api"
import { cookies } from "next/headers"
import { parse } from "cookie"
import { isAxiosError } from "axios"
import { logErrorResponse } from "../../_utils/utils"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const apiResponse = await api.post("auth/register", body)
		const cookieStore = await cookies()
		const setCookie = apiResponse.headers["set-cookie"]
		if (setCookie) {
			const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]
			for (const cookie of cookieArray) {
				const parsed = parse(cookie)
				const options = {
					expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
					path: parsed.Path,
					maxAge: Number(parsed["Max-Age"]),
				}
				if (parsed.accessToken) {
					cookieStore.set("accessToken", parsed.accessToken, options)
				}
				if (parsed.refreshToken) {
					cookieStore.set("refreshToken", parsed.refreshToken, options)
				}
			}
			return NextResponse.json(apiResponse.data)
		}
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
	} catch (error) {
		if (isAxiosError(error)) {
			logErrorResponse(error.response?.data)
			return NextResponse.json(
				{
					error: error.message,
					response: error.response?.data,
				},
				{
					status: error.status,
				}
			)
		}
		logErrorResponse({ message: (error as Error).message })
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
