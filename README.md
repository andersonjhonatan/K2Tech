# TresK Tecnologia

Site institucional da TresK Tecnologia, em Next.js: apresenta a empresa, o Kort (agenda online para barbearias), os serviços (sistemas, sites e convites interativos) e o portfólio.

## Executar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Build de produção

```bash
npm run build
```

## Personalização rápida

- Contatos (WhatsApp, e-mail, Instagram) e o link do Kort ficam em `app/site-config.ts`.
- O logo e o símbolo da TresK estão em `app/tresk-logo.tsx`; o favicon é `app/icon.svg`.
- Projetos: a lista fica em `app/data/projects.ts`. A página inicial mostra seis em destaque, e `/projetos` mostra todos.
- Avaliações de clientes: lista `testimonials` em `app/page.tsx`. Só aparecem quando houver avaliações reais.
- Domínio: defina `NEXT_PUBLIC_SITE_URL` (padrão `https://tresktecnologia.com.br`).
