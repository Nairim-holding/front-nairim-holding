import { NextRequest, NextResponse } from "next/server"

interface ResVerifyToken {
    status: number;
    message: string;
}

export default async function middleware(req: NextRequest){
    const token = req.cookies.get('authToken');

    if(!token){
        return NextResponse.redirect(new URL('/', req.url))
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/authenticate/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.value })
    });

    const tokenIsValid = await response.json() as ResVerifyToken;
    
    if(tokenIsValid.status == 401 || tokenIsValid.status == 400){
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/dashboard/:path*', 
}