import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest){
    const token = req.cookies.get('authToken');

    if(!token){
        return NextResponse.redirect(new URL('/', req.url))
    }

    //verificar o token é valido no back

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*', 
}