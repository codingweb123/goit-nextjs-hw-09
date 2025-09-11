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
		const response = await api.get(`/notes/${id}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(response.data, { status: response.status })
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
		const response = await api.delete(`/notes/${id}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(response.data, { status: response.data })
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
		const response = await api.patch(`/notes/${id}`, body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(response.data, { status: response.status })
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
