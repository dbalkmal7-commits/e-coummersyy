/** استجابة خطأ من الـ API أو من axios */
export interface ApiErrorResponse {
  status: "fail";
  message?: string;
}

/** استجابة ناجحة لتحديث/حذف السلة قد تحتوي على cart أو data مباشرة */
export interface CartMutationData {
  products?: { _id: string; count: number; price: number; product: unknown }[];
  totalCartPrice?: number;
  cart?: CartMutationData;
}

export interface CartMutationResponse {
  status: string;
  data?: CartMutationData;
  message?: string;
}

export function getAxiosErrorMessage(err: unknown): string | undefined {
  if (err && typeof err === "object" && "response" in err) {
    const res = (err as { response?: { data?: { message?: string } } }).response;
    return res?.data?.message;
  }
  return undefined;
}

/** توكن مفكوك من next-auth (يحتوي حقول مخصصة) */
export interface DecodedToken {
  backendToken?: string;
  [key: string]: unknown;
}
