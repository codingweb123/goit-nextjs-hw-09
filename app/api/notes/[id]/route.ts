import { NextRequest, NextResponse } from "next/server"
import { api } from "../../api"
import { cookies } from "next/headers"
import { isAxiosError } from "axios"
import { logErrorResponse } from "../../_utils/utils"

interface Props {
	params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
	try {
		const cookieStore = await cookies()
		const { id } = await params
		const { data } = await api.get(`notes/${id}`, {
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

export async function DELETE(request: NextRequest, { params }: Props) {
	try {
		const cookieStore = await cookies()
		const { id } = await params
		const { data } = await api.delete(`notes/${id}`, {
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

export async function PATCH(request: NextRequest, { params }: Props) {
	try {
		const cookieStore = await cookies()
		const { id } = await params
		const body = await request.json()
		const { data } = await api.patch(`notes/${id}`, body, {
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
