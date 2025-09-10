import { NextRequest, NextResponse } from "next/server"
import { api } from "../api"
import { cookies } from "next/headers"
import { isAxiosError } from "axios"
import { logErrorResponse } from "../_utils/utils"

export async function GET() {
	try {
		const cookieStore = await cookies()
		const { data } = await api.get("notes", {
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

export async function POST(request: NextRequest) {
	try {
		const body = request.json()
		const { data } = await api.post("notes", body)
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
