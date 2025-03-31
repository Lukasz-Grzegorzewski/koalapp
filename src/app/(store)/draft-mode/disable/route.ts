import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  (await draftMode()).enable();
  return NextResponse.redirect(new URL("/", req.url));
}
