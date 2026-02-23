import CampoTexto from '../../Inputs/CampoTexto/CampoTexto.js';

import './formLogin.css';
import { useState, useContext } from 'react';
import loginRequest from '../../../request/usuarioRequests/loginRequest.js';
import { Context } from '../../../Context/AuthProvider.js';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {  

    const nav = useNavigate();
    const ctx = useContext(Context)

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const aoClicarNoBotao = (evento) => {
        evento.preventDefault();
        const botaoId = evento.nativeEvent.submitter.id
        
        if (botaoId === 'botao-login') {
            enviar(login, senha);
        } else if (botaoId === 'botao-cadastro') {
            chamaCadastro()
        }
    }

    const chamaCadastro = () => {
        nav("/cadastro")    
    }

    const enviar = async (login, senha) => {
        loginRequest(login, senha).then(response => {
            if (response != null ) {
              
                ctx.setToken(response.tokenJWT);
                ctx.setLogin(login);
                ctx.setAutenticado(true);
                ctx.setTempoDeCriacaoDoToken(new Date().getTime());
                new Promise(resolve => setTimeout(resolve, 2000));
                nav("/home")
            }
        });

    }

    return (
       <section className="container vh-100 d-flex align-items-center justify-content-center">
  <div className="row w-100 justify-content-center">
    <div className="col-md-5 col-lg-4">
      <div className="card shadow">
        <div className="card-body p-4">
          
          <h3 className="text-center mb-4">Login</h3>

          <form onSubmit={aoClicarNoBotao}>
            <CampoTexto
              label="Login"
              placeholder="Digite seu login"
              valor={login}
              aoAlterado={valor => setLogin(valor)}
            />

            <CampoTexto
              label="Senha"
              tipo="password"
              placeholder="Digite sua senha"
              valor={senha}
              aoAlterado={valor => setSenha(valor)}
            />

            <div className="d-grid gap-2 mt-4">
              <button id="botao-login" type="submit" className="btn btn-primary">
                Entrar
              </button>
              <button id="botao-cadastro" type="submit" className="btn btn-outline-secondary">
                Cadastrar
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</section>
    );
}

export default FormLogin;
