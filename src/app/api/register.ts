import { RegisterType } from "@/types/register.type";
import { toast } from "sonner";

export const register = async (data: RegisterType)=>{
  try {
const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",{
    method:"POST",
    body: JSON.stringify(data),
    headers:{
        "Content-Type":"application/json"
    }
}
)
const finaldata = await res.json();
console.log(finaldata);

if(!res.ok){
toast.error(finaldata.message,{position:"top-right"});
throw new Error(finaldata.message);
}
toast.success("user added successfully",{position:"top-right"});
return true;
  }
  catch (error) {
    console.log(error);
    return null;
  }
};