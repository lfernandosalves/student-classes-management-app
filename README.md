
## Descrição

Aplicação de gerenciamento de turmas, alunos e aulas.

Usados: 
- Banco de dados PostgreSQL
- REST API NodeJS com NestJS
- Ambos rodando em containers Docker

## Instalação

```bash
$ npm install
```

## Subindo o ambiente para rodar a aplicação

```bash
docker-compose up -d
```
Isso deve rodar o banco de dados Postgres e a API NodeJS

PS.: Necessário ter o [docker-compose](https://docs.docker.com/compose/) instalado.

## Caso prefira rodar somente a API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Documentação

Com a aplicação rodando, a documentação estará disponível em http://localhost:3000/api

## Stay in touch

- Author - [Luiz Fernando Alves](https://linkedin.com/in/lfalves)
- Site - [Github](https://github.com/lfernandosalves)

## Extras

Regras de negócio da aplicação:

● Uma turma não pode acontecer enquanto outra estiver em andamento
● Um aluno não pode participar de mais de uma turma
● Uma aula não pode acontecer enquanto outra estiver em andamento 
● Uma aula não pode acontecer fora das datas de início e encerramento da turma
● Uma turma só poder ter, no máximo, uma aula por dia
