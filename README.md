

# :file_cabinet: Banco de Dados

Este projeto utiliza o MongoDB como sistema de gerenciamento de banco de dados NoSQL, aproveitando sua flexibilidade de esquema de documentos para armazenar as informações do caixa eletrônico. A estrutura do banco de dados é composta pelas seguintes coleções:

---

### :bust_in_silhouette: clientes
Esta coleção armazena os dados básicos de cada cliente do sistema.

-   **_id**: `ObjectId` (ID único gerado pelo MongoDB)
-   **nome**: `String` (Nome completo do cliente)
-   **cpf**: `String` (CPF do cliente, deve ser único)
-   **dataNascimento**: `ISODate` (Data de nascimento do cliente)
-   **telefone**: `String` (Número de telefone para contato)
-   **email**: `String` (Endereço de e-mail do cliente, deve ser único)

---

### :credit_card: contas
Cada documento nesta coleção representa uma conta bancária individual, associada a um cliente.

-   **_id**: `ObjectId` (ID único gerado pelo MongoDB)
-   **clienteId**: `ObjectId` (Referência ao `_id` do cliente na coleção `clientes`)
-   **tipoConta**: `String` (Ex: "Corrente", "Poupanca")
-   **numeroConta**: `String` (Número da conta, deve ser único)
-   **saldo**: `Decimal128` (Saldo atual da conta, padrão 0.00)
-   **ativa**: `Boolean` (Indica se a conta está ativa, padrão `true`)

---

### :closed_lock_with_key: credenciais
Esta coleção é dedicada exclusivamente ao armazenamento seguro das informações de autenticação das contas.

-   **_id**: `ObjectId` (ID único gerado pelo MongoDB)
-   **contaId**: `ObjectId` (Referência ao `_id` da conta na coleção `contas`, deve ser único)
-   **senhaHash**: `String` (Hash da senha da conta, armazenado de forma segura com algoritmos como bcrypt)
-   **ultimoLogin**: `ISODate` (Opcional: Data e hora do último login bem-sucedido)
-   **tentativasFalhas**: `Number` (Opcional: Contador de tentativas de login falhas, padrão 0)

---

### :money_with_wings: transacoes
Esta coleção registra todas as operações financeiras realizadas, como saques, depósitos e transferências.

-   **_id**: `ObjectId` (ID único gerado pelo MongoDB)
-   **contaOrigemId**: `ObjectId` (Referência ao `_id` da conta de origem na coleção `contas`; pode ser `null` para depósitos externos)
-   **contaDestinoId**: `ObjectId` (Referência ao `_id` da conta de destino na coleção `contas`; pode ser `null` para saques)
-   **tipoTransacao**: `String` (Ex: "Saque", "Deposito", "Transferencia")
-   **valor**: `Decimal128` (Valor da transação)
-   **dataTransacao**: `ISODate` (Data e hora da transação, padrão: data/hora atual)
-   **status**: `String` (Ex: "Concluida", "Pendente", "Falha")

---

### :link: Relações e Índices
As coleções estão interligadas através de referências de `ObjectId`, garantindo a integridade dos dados. Para otimizar o desempenho e assegurar a unicidade de campos críticos, os seguintes índices únicos e de busca são aplicados:

-   **clientes**: Índice único em `cpf` e `email`.
-   **contas**: Índice único em `numeroConta` e índice de busca em `clienteId`.
-   **credenciais**: Índice único em `contaId`.
-   **transacoes**: Índices de busca em `contaOrigemId` e `contaDestinoId`.

Esta estrutura proporciona uma base robusta e segura para o desenvolvimento do sistema de caixa eletrônico.