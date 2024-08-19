import { NextResponse } from "next/server";
import { words } from "./data";

export async function GET(){
    return NextResponse.json({results: words})
}