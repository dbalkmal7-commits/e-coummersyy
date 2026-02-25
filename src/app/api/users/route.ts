import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        message: "success",
        data: [
            {name: "ahmad", age: 20},
            {name: "ali", age: 25},
            {name: "mohammed", age: 30},
        ],
    });
}
