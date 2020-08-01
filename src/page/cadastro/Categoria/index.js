import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '..//../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hocks/useForm';
import categoriasRepository from '../../../repositories/categorias';
import styled from "styled-components";

const Content = styled.button`
color: var(--white);
border: none;
text-decoration-line: none;
background-color: var(--black);
box-sizing: border-box;
cursor: pointer;
padding: 16px 0px;
font-style: normal;
font-weight: bold;
font-size: 16px;
outline: none;
border-radius: 5px;
text-decoration: none;
display: inline-block;
transition: opacity .3s;

&:hover,
&:focus {
opacity: .5;
}
`;

function CadastroCategoria(){
    const [categorias, setCategorias] = useState([]);
    const valoresIniciais = {
        titulo: '',
        descricao: '',
        cor: '#000',
    }
    const {handleChange,values, clearForm} = useForm(valoresIniciais);

    useEffect(() => {
      if(window.location.href.includes('localhost')) {
        const URL = window.location.hostname.includes('localhost')
          ? 'http://localhost:8080/categorias'
          : 'https://brunoflix2.herokuapp.com/categorias'; 
        fetch(URL)
         .then(async (respostaDoServer) =>{
          if(respostaDoServer.ok) {
            const resposta = await respostaDoServer.json();
            setCategorias(resposta);
            return; 
          }
          throw new Error('Não foi possível pegar os dados');
         })
      }    
    }, []);

    return (
      <PageDefault>
        <h1>Cadastro de Categoria: {values.nome}</h1>
        
        <form onSubmit={function handleSubmit(infosDoEvento){
            infosDoEvento.preventDefault();

            categoriasRepository.create({
              titulo: values.titulo,
              cor: values.cor,
              link_extra: {
                text:values.descricao,
                url:"",
              }
            });

            setCategorias([
              ...categorias,
              values
            ]);

            clearForm(valoresIniciais);
        }}>
        
        <FormField
          label="Nome da Categoria"
          type = "text"
          name = "titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type = "textarea"
          name = "descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type = "color"
          name = "cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button type='submit'>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => {
          return (
            <li key={`${categoria.titulo}`}>
              {categoria.titulo}
            </li>
          )
          })}
      </ul>
      <Content>
        <Link to='/' id="clicar">
            Ir para Home
        </Link>
      </Content>
      </PageDefault>
    )
  }
  
export default CadastroCategoria;