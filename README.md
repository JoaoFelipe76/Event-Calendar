# Event Calendar Application

Uma aplicação para gerenciamento de eventos, desenvolvida com **Spring Framework** no back-end e **Angular 16** no front-end. Este projeto permite que os usuários visualizem, criem, editem e excluam eventos em um calendário interativo.

## 🛠 Tecnologias Utilizadas

### Back-End:
- **Spring Framework**: Framework para construção de APIs robustas e escaláveis.
- **Spring Security**: Implementação de autenticação e autorização seguras.
- **JWT (JSON Web Tokens)**: Utilizado para autenticação e controle de acesso.
- **Redis**: Usado como cache para otimizar o desempenho, principalmente para controle de autenticação e autorização, garantindo respostas rápidas.
- **JPA (Java Persistence API)**: Para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional para armazenar informações dos eventos e usuários.

### Front-End:
- **Angular 16**: Framework para construção da interface dinâmica e interativa.
- **Bootstrap**: Framework CSS para garantir uma interface responsiva e acessível.
- **DHTMLX Scheduler**: Biblioteca de calendário para gerenciamento visual dos eventos.

### Justificativa:
- **Spring Framework** foi utilizado para fornecer uma base sólida e escalável para a API.
- **Spring Security** e **JWT** garantem que a aplicação seja segura, com autenticação eficiente.
- **Redis** melhora o desempenho do sistema ao fornecer cache para as informações de controle de acesso.
- **Angular 16** oferece uma experiência de usuário moderna, com componentes reutilizáveis e eficientes.
- **DHTMLX Scheduler** proporciona uma interface de calendário interativa e intuitiva.

---

## ⚙️ Funcionalidades da Aplicação

1. **Gerenciamento de Eventos**:
   - Criação de novos eventos, onde o usuário pode definir:
     - **Título**, **Descrição**, **Data de Início**, **Hora de Início**, **Hora de Término**.
   - Edição e exclusão de eventos.
   - Exibição de eventos passados, presentes e futuros.
   - **Eventos ligados ao usuário**: Cada evento é associado ao usuário que o criou, garantindo que os usuários só possam acessar e gerenciar seus próprios eventos.
   
2. **Visualização de Eventos**:
   - Exibição de eventos por **dia**, **semana** ou **mês**.
   - Possibilidade de visualizar eventos em diferentes perspectivas para uma melhor organização e acompanhamento.
   - Filtro para eventos que ocorrem em datas específicas ou que duram mais de um dia.
   
3. **Eventos com Duração de Mais de um Dia**:
   - Suporte para eventos que se estendem por vários dias, com visualização clara da duração no calendário.
   - Os eventos com duração superior a um dia serão exibidos de forma destacada, para fácil identificação.

4. **Autenticação e Autorização**:
   - Cadastro de usuários com email e senha.
   - Login com autenticação via JWT.
   - Controle de acesso às funcionalidades de eventos com segurança de token.

5. **Validações e Segurança**:
   - Validação de dados para criação e edição de eventos (como campos obrigatórios).
   - Proteção contra ataques como injeção de SQL e XSS.

---

## 🚀 Instruções de Instalação

### Pré-requisitos:
- Java 17+ (para o back-end)
- Node.js (versão 16+)
- PostgreSQL (para o banco de dados)
- Redis (para cache)

### Back-End

1. **Configuração das Variáveis de Ambiente:**
   Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:

   ```env
   SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/eventcalendar
   SPRING_DATASOURCE_USERNAME=seu_usuario
   SPRING_DATASOURCE_PASSWORD=sua_senha
   JWT_SECRET=sua_chave_secreta
   REDIS_HOST=localhost
   REDIS_PORT=6379
   
### Front-End

1. **Instalar dependências e iniciar o projeto:**

   Para iniciar o front-end, siga as instruções abaixo:

   ```bash
   cd client
   npm install
   npm start

---

## 🖼️ Imagens do Projeto

### Tela de Cadastro

O usuário pode criar uma conta fornecendo seu  nome de usuário, email, e senha. Após o registro, ele poderá acessar a aplicação e gerenciar seus eventos.

![image](https://github.com/user-attachments/assets/264c651f-bc4e-4ec2-8f0f-086b6663afd0)

### Tela de Login

Nesta tela, o usuário realiza o login utilizando seu nome de usuário e senha. Após a autenticação, um token JWT é gerado e enviado ao front-end para garantir o acesso às rotas protegidas da aplicação.

![image](https://github.com/user-attachments/assets/67c3d58d-7f23-4039-a004-248900e677bb)

### Tela de Listagem de Eventos

Na tela principal, o usuário pode visualizar todos os eventos criados. A interface é organizada de acordo com a visualização escolhida: **dia**, **semana** ou **mês**. Todos os eventos estão listados, com detalhes como descrição, data e hora de início e término. O usuário pode clicar sobre qualquer evento para ver mais detalhes editá-lo ou excluí-lo".

**Funcionalidades**:
- **Visualização por dia, semana ou mês**: O usuário pode alternar entre essas visões para encontrar o evento desejado mais rapidamente.
- **Eventos com duração superior a um dia**: Eventos que duram mais de um dia são destacados visualmente para fácil identificação.

![image](https://github.com/user-attachments/assets/14100cf6-8f51-470c-869f-80e41cbfd844)


### Adicionar Novo Evento

Na tela de criação de eventos, o usuário pode adicionar um novo evento, preenchendo campos como  **descrição**, **data de início**, **hora de início**, **hora de término** e **localização**. Após salvar, o evento é exibido na listagem de eventos e está visível no calendário de acordo com a data e horário definidos.

**Funcionalidades**:
- **Descrição**: Informações principais sobre o evento.
- **Datas e horas**: O usuário pode especificar a data e hora de início e término do evento, permitindo uma flexibilidade para eventos curtos ou longos.
- **Visualização no calendário**: O evento será automaticamente exibido na visualização correspondente no calendário, seja ele diário, semanal ou mensal.

![image](https://github.com/user-attachments/assets/1a0371db-9380-46fe-b498-a8e0226a3d07)

### Editar Evento

Ao clicar em um evento na tela principal, o usuário tem a opção de editá-lo. Nesta tela, ele pode modificar qualquer detalhe do evento como descrição, data e hora. Após salvar, as mudanças são refletidas imediatamente na visualização do calendário.

**Funcionalidades**:
- **Alteração descrição**: O usuário pode modificar os dados principais do evento.
- **Alteração de horário e data**: Caso o evento precise ser movido, o usuário pode alterar o horário de início e término ou até mesmo estender a duração do evento para mais de um dia.
- **Reflexão imediata na visualização**: Ao salvar a edição, o evento atualizado é mostrado no calendário sem a necessidade de recarregar a página.

![image](https://github.com/user-attachments/assets/1d120af0-167a-4fef-9e5f-fe1636fb8a55)

### Estender Evento (Eventos de Duração Longa)

Se um evento precisar ser estendido para mais de um dia, o usuário pode facilmente fazer isso ajustando a data de término. O evento será mostrado de forma destacada no calendário, ocupando todos os dias em que ocorrer. A funcionalidade permite que o usuário estenda eventos de maneira fluida, sem a necessidade de criar múltiplos eventos.

**Funcionalidades**:
- **Extensão para mais de um dia**: O usuário pode ajustar o horário de término do evento, fazendo com que ele ocupe vários dias no calendário.
- **Exibição visual clara**: A interface adapta a visualização para mostrar claramente eventos que duram mais de um dia, para que o usuário saiba exatamente qual a duração do evento.

![image](https://github.com/user-attachments/assets/9684f284-8625-4c00-ad89-9d409053c4ff)

### Excluir Evento

Caso o usuário deseje remover um evento, ele pode clicar na opção de excluir evento. Ao confirmar a exclusão, o evento será removido da base de dados e não aparecerá mais no calendário.

**Funcionalidades**:
- **Confirmação de exclusão**: Uma janela de confirmação é exibida para garantir que o usuário realmente deseja excluir o evento.
- **Remoção do calendário**: Após a exclusão, o evento desaparece da interface do calendário, mantendo a listagem de eventos atualizada.

![image](https://github.com/user-attachments/assets/5f07669c-7b36-45be-9fd3-68b15c3d8ac0)

### Integração com Redis

O Redis é utilizado como cache para melhorar o desempenho das operações de autenticação e controle de acesso via tokens JWT. A utilização do Redis também ajuda a reduzir a carga no banco de dados e a garantir respostas mais rápidas para as requisições.

![image](https://github.com/user-attachments/assets/c9e61939-96c4-424f-8030-5e2c36e93177)

---

### Clonando o Repositório:
```bash
https://github.com/JoaoFelipe76/Event-Calendar.git

