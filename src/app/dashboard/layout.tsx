'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { token } from '@/types/token';
import Aside from '@/components/Admin/Aside';
import Message from '@/components/Admin/Message';
import { useUIStore } from '@/stores/uiStore';


export default function Layout({ children }: {children: React.ReactNode}){
    const {
        darkMode, setDarkMode,
        successMessage, setSuccessMessage,
        errorMessage, setErrorMessage,
    } = useUIStore();

    const [name, setName] = useState<string>();

    useEffect(() => {
        const cookie = Cookies.get('authToken') as string;
        const token = jwt.decode(cookie) as token;
        setName(token?.name);
    }, []);

    return (
      <>
        {successMessage.visible && (
          <Message
            success
            message={successMessage.message}
            setVisible={(visible) =>
                setSuccessMessage({ ...successMessage, visible })
            }
            visible={successMessage.visible}></Message>
        )}
        {errorMessage.visible && (
          <Message
            error
            message={errorMessage.message}
            setVisible={(visible) =>
                setErrorMessage({ ...errorMessage, visible })
            }
            visible={errorMessage.visible}></Message>
        )}
        <Aside
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          userName={name}></Aside>
        <main className="main-dashboard">{children}</main>
      </>
    );
}