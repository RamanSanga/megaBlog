import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // 🔒 Logic: allow if authStatus === authentication
        if (authStatus !== authentication) {
            navigate(authentication ? "/login" : "/");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
