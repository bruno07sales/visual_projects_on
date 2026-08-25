# Visual Projects On

## English

> I got tired of opening fifteen GitHub tabs just to figure out which project I was working on. And realized that probably should not be part of the development workflow.

**Visual Projects On** is an application for tracking selected projects in one place. The dashboard combines information retrieved from GitHub with manually defined planning data, providing a quick overview of each project's current state.

The application will be developed as a **Progressive Web App (PWA)**. It will be installable on Windows computers, tablets, and mobile devices, while also offering basic functionality when there is no internet connection.

### What the dashboard displays

For each configured repository, the application can display:

- Project name and description;
- Technologies used;
- Link to the source code on GitHub;
- Latest commit;
- Date of the latest update;
- Number of open issues;
- Current progress;
- Priority;
- Next planned task;
- Project status: planned, active, paused, or completed.

Public repository data will be retrieved through the **official GitHub REST API**. Personal organization details — such as progress, priority, and the next task — will be maintained manually in the project configuration.

### Objectives

The main objectives of the project are to:

- Centralize the monitoring of the most important repositories;
- Make it easier to identify the current state and next steps of each project;
- Reduce repeated GitHub requests by using a local cache;
- Provide a responsive experience on computers, tablets, and mobile devices;
- Support installation and basic offline use through PWA features;
- Practice an organized, typed, and testable frontend architecture;
- Automate testing and deployment with GitHub Actions;
- Serve as a relevant and demonstrable portfolio project.

### Filters and organization

The dashboard will allow projects to be found and organized using filters for:

- Name;
- Status;
- Priority.

Only repositories selected by the user will be displayed. Initially, this selection will be defined in a typed configuration file.

### Planned technologies

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- GitHub REST API;
- Service Worker and PWA features;
- Automated tests;
- GitHub Actions.

### Project status

**Under development.** The initial architecture is being prepared, and features will be implemented incrementally.

If everything goes well, this dashboard will organize the projects. If it goes really well, it might even organize the developer.

---

## Português

> Cansei de abrir quinze abas do GitHub só para descobrir em qual projeto eu estava trabalhando; e, percebi que isso provavelmente não deveria fazer parte do fluxo de desenvolvimento.

O **Visual Projects On** é uma aplicação para acompanhar, em um único lugar, os projetos selecionados pelo usuário. A dashboard reúne informações obtidas diretamente do GitHub com dados de planejamento definidos manualmente, oferecendo uma visão rápida do estado atual de cada projeto.

A aplicação será desenvolvida como uma **Progressive Web App (PWA)**. Ela poderá ser instalada em computadores Windows, tablets e celulares, além de oferecer funcionalidades básicas mesmo quando não houver conexão com a internet.

### O que a dashboard apresenta

Para cada repositório configurado, a aplicação poderá exibir:

- Nome e descrição do projeto;
- Tecnologias utilizadas;
- Link para o código no GitHub;
- Último commit;
- Data da última atualização;
- Quantidade de issues abertas;
- Progresso atual;
- Prioridade;
- Próxima tarefa planejada;
- Status do projeto: planejado, ativo, pausado ou concluído.

Os dados públicos dos repositórios serão consultados por meio da **API REST oficial do GitHub**. Informações de organização pessoal como: progresso, prioridade e próxima tarefa, serão mantidas manualmente na configuração do projeto.

### Objetivos

Os principais objetivos do projeto são:

- Centralizar o acompanhamento dos repositórios mais importantes;
- Facilitar a identificação do estado atual e dos próximos passos de cada projeto;
- Reduzir consultas repetidas ao GitHub utilizando cache local;
- Disponibilizar uma experiência responsiva em computadores, tablets e celulares;
- Permitir instalação e uso básico offline por meio dos recursos de PWA;
- Praticar uma arquitetura frontend organizada, tipada e testável;
- Automatizar testes e publicação com GitHub Actions;
- Servir como um projeto relevante e demonstrável no portfólio.

### Filtros e organização

A dashboard permitirá localizar e organizar os projetos utilizando filtros por:

- Nome;
- Status;
- Prioridade.

Somente os repositórios escolhidos pelo usuário serão exibidos. Inicialmente, essa seleção será definida em um arquivo de configuração tipado.

### Tecnologias planejadas

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- API REST do GitHub;
- Service Worker e recursos de PWA;
- Testes automatizados;
- GitHub Actions.

### Estado do projeto

**Em desenvolvimento.** A arquitetura inicial está sendo preparada e as funcionalidades serão implementadas de forma incremental.

Se tudo der certo, esta dashboard vai organizar os projetos. Se der muito certo, talvez até organize o desenvolvedor.
