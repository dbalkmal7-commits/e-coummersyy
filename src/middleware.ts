import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function midddleware(req : NextRequest) {

  const jwt = await getToken({req})

  console.log("jwt" , jwt);

  if(jwt != null) {
  
  return NextResponse.next()
}

return NextResponse.redirect("http://localhost:3000/")

}

export const config = {



  matcher : [ "/cart" , "/order" ]
}