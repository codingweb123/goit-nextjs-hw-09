import { cookies } from "next/headers"
import { api } from "../../api"
import { NextRequest, NextResponse } from "next/server"
import { isAxiosError } from "axios"
import { logErrorResponse } from "../../_utils/utils"

export const dynamic = "force-dynamic"

export async function GET() {
	try {
		const cookieStore = await cookies()
		const { data } = await api.get("users/me", {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data)
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

export async function PATCH(request: NextRequest) {
	try {
		const cookieStore = await cookies()
		const formData = await request.json()
		const { data } = await api.patch("users/me", formData, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data)
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
