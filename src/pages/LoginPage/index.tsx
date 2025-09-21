// src/pages/LoginPage/index.tsx

import React from 'react';

import './LoginPage.css'; 

import StarsBackground from '../../components/login/StarsBackground';
import LeftPanel from '../../components/login/LeftPanel';
import RightPanel from '../../components/login/RightPanel';

const LoginPage: React.FC = () => {
    // A lógica específica desta página, como definir o texto do slogan, fica aqui.
    const slogan = <>Conectando talentos em<br/>uma única órbita</>;

    return (
        <main className="login-page">
            <StarsBackground />
            <LeftPanel title={slogan} />
            <RightPanel />
        </main>
    );
}

export default LoginPage;