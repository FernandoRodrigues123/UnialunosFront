import CampoTexto from '../../Inputs/CampoTexto/CampoTexto';
import { useState } from 'react';
import cadastroRequest from '../../../request/usuarioRequests/cadastrorequest';
import { useNavigate } from 'react-router-dom';
import uploadFile from '../../../services/uplouds3/uplouds3';

const Cadastro = () => {
  const nav = useNavigate();

  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [areaDeEstudo, setAreaDeEstudo] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const aoClicarNoBotao = async (evento) => {
    evento.preventDefault();

    let urlImagem = '';

    try {
      if (imagem) {
        const data = await uploadFile({ target: { files: [imagem] } });
        urlImagem = data.Location;
      }

      const response = await cadastroRequest(
        nome,
        dataDeNascimento,
        areaDeEstudo,
        email,
        login,
        senha,
        urlImagem
      );

      if (response.status === 201) {
        nav('/login');
      }
    } catch (error) {
      console.error('Erro no cadastro', error);
    }
  };

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">

              <header className="mb-4 text-center">
                <h2 className="fw-semibold">Criar perfil acadêmico</h2>
                <p className="text-muted mt-2">
                  Compartilhe sua trajetória, projetos e ideias
                </p>
              </header>

              <form onSubmit={aoClicarNoBotao}>

                <div className="mb-4">
                  <label className="form-label text-muted">
                    Foto de perfil
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={e => setImagem(e.target.files[0])}
                  />
                </div>

                <CampoTexto label="Nome completo" valor={nome} aoAlterado={setNome} />
                <CampoTexto label="Data de nascimento" tipo="date" valor={dataDeNascimento} aoAlterado={setDataDeNascimento} />
                <CampoTexto label="Área de estudo" valor={areaDeEstudo} aoAlterado={setAreaDeEstudo} />
                <CampoTexto label="Email institucional ou pessoal" valor={email} aoAlterado={setEmail} />
                <CampoTexto label="Login público" valor={login} aoAlterado={setLogin} />
                <CampoTexto label="Senha" tipo="password" valor={senha} aoAlterado={setSenha} />

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-dark py-2">
                    Criar conta
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cadastro;
