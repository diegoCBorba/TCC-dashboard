# Dashboard Web para Irrigação Inteligente 

Dashboard web em tempo real para monitoramento do sistema automatizado de irrigação hidropônica desenvolvido como Trabalho de Conclusão de Curso.

---

## Sobre o projeto

Este repositório contém o frontend do sistema de irrigação automatizada com visão computacional. O dashboard consome dados do [Supabase](https://supabase.com) em tempo real, refletindo o estado do dispositivo ESP32-S3 sem necessidade de recarregar a página.

O sistema completo é composto por:
- **ESP32-S3** — controla o relé da bomba d'água via MQTT
- **Raspberry Pi** — roda o modelo YOLO, gerencia a lógica de irrigação e escreve no Supabase
- **Supabase** — banco de dados e camada de Realtime
- **Este repositório** — dashboard de monitoramento

---

## Funcionalidades

- Status do dispositivo em tempo real (online / offline)
- Estado atual da bomba (ligada / desligada)
- Uptime do ESP32-S3
- Horário da última atualização recebida
- Atualização automática via Supabase Realtime — sem polling, sem reload

---

## Tecnologias

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/) — PostgreSQL + Realtime
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Estrutura do projeto

```
├── app/
│   └── page.tsx              ← dashboard principal
├── hooks/
│   └── useDeviceState.ts     ← carga inicial + canal Realtime
├── lib/
│   └── supabase.ts           ← cliente Supabase centralizado
├── types/
│   └── device.ts             ← tipo DeviceState
└── .env.local                ← variáveis de ambiente (não versionado)
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com) com o projeto configurado

### Instalação

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key
```

### Rodando

```bash
npm run dev
```

Acesse `http://localhost:3000`.

---

## Pré-requisito — tabela no Supabase

A tabela `device_state` deve estar criada e com Realtime habilitado. No **SQL Editor** do Supabase:

```sql
create table device_state (
  device_id   text primary key,
  online      boolean,
  pump        text,
  uptime_s    bigint,
  updated_at  timestamptz default now()
);

alter publication supabase_realtime add table device_state;
```

---

## Repositórios relacionados

- [rasp-mqtt-esp32s3](https://github.com/diegoCBorba/rasp-mqtt-esp32s3) — versionamento da arquitetura de comunicação MQTT entre Raspberry Pi e ESP32-S3, incluindo os códigos `.ino` (firmware) e `.py` (backend)

---

## Contexto acadêmico

Projeto desenvolvido como TCC do curso de Engenharia de Computação. O sistema completa um ciclo de cultivo hidropônico de coentro automatizando as decisões de irrigação com base em detecção de fase de crescimento via visão computacional (YOLO).

---

## Autores

- Diego Cardoso
- Ivysson Uchoa