'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { token } from '@/types/token';
import Aside from '@/components/Admin/Aside';
import Message from '@/components/Admin/Message';
import { useUIStore } from '@/stores/uiStore';
import Popup from '@/components/Admin/Popup';


export default function Layout({ children }: {children: React.ReactNode}){
    const {
        darkMode, setDarkMode,
        successMessage, setSuccessMessage,
        errorMessage, setErrorMessage,
        popUpDelete, setPopUpDelete,
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

          {popUpDelete.visible && (
            <Popup
              title={popUpDelete.title}
              subtitle={popUpDelete.subtitle}
              visible={popUpDelete.visible}
              setVisible={popUpDelete.setVisible}
              onConfirm={popUpDelete.onConfirm}
            />
          )}
        <Aside
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          ></Aside>
        <main className="main-dashboard">{children}</main>
      </>
    );
}