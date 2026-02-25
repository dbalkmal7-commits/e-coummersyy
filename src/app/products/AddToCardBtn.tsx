"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { addItemToCart } from '../api/addToCarts'
import { toast } from 'sonner'

export default function AddToCardBtn( {productId} : { productId : string } ) {
   async function handelAddItem() {
   const data =  await addItemToCart(productId)
   
   console.log(data);
   if (data?.status === "success") {
      toast.success("تمت إضافة المنتج إلى السلة", { position: "top-center" });
   } else {
      toast.error((data as any)?.message ?? "حدث خطأ", { position: "top-center" });
   }

   }
   return <>
   <Button onClick={handelAddItem}> 
      
      <i className="fa-solid fa-plus"></i>add to cart 
      <i className="fa-duotone fa-solid fa-cart-arrow-down fa-bounce --fa-primary-color: rgba(177, 151, 252, 1); --fa-secondary-color: rgba(177, 151, 252, 0.4);"></i>
      
      </Button>
   </>
   }
