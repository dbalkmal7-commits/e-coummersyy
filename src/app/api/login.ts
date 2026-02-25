"use server"
import { LoginType } from '@/types/login.type'
import { cookies } from 'next/headers'

export async function MyLogin(values : LoginType){
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
body : JSON.stringify(values),
method : "POST",
headers : {
  "Content-Type" : "application/json"
}
  })

  const finalRes = await res.json();
  const mycookies = await cookies()
  mycookies.set("token" , finalRes.token ,{
    maxAge : 60 * 60 * 24 ,
    httpOnly : true ,
    sameSite : "strict"
  })

  console.log(finalRes);
}