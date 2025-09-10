import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
	const data = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"]
	return NextResponse.json(data)
}
