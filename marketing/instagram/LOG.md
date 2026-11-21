# Instagram @tresktecnologia — registro de posts

| Data | Tipo | Tema | Imagens | Status |
|---|---|---|---|---|
| 2026-11-20 | Carrossel 3 slides | Post 1 — Apresentação da Tresk (quem somos, 3 pilares, KORT + Divina Baby) | public/instagram/tresk-post1-*.jpg | Publicado (media id 18135129823786649) |
| 2026-11-20 | Story | Serviços (para o destaque Serviços) | public/instagram/stories/tresk-story-servicos.jpg | Publicado (media id 18454411993121483) |
| 2026-11-20 | Story | Orçamento (para o destaque Orçamento) | public/instagram/stories/tresk-story-orcamento.jpg | Publicado (media id 18113746550081268) |
| 2026-11-20 | Carrossel 6 slides | Post 2 — Case KORT (telas reais: página, horários, fidelidade, agenda, faturamento) | public/instagram/tresk-post2-*.jpg | Publicado (media id 18361172917173093) |
| 2026-11-20 | Reels (33s) | KORT: cliente agendando + visão do dono | public/instagram/tresk-reel-kort.mp4 | Aguardando decisão de publicação |
| 2026-11-21 | Reels (25s, 19h) | 3 sinais de que seu comércio precisa de um sistema (+ case Divina Baby) · 🎵 Believer – Imagine Dragons (125 BPM, refrão; trocada a pedido do Anderson, antes era What You Waiting For? – Gwen Stefani) | public/instagram/tresk-2026-11-21-reels.mp4 (+ -capa.jpg) | Publicado pelo Anderson no app em 2026-11-21 (com música; capa estilo YouTube antes/depois: tresk-2026-11-21-reels-capa-yt.jpg); abertura de 10 batidas = 4,8 s |
| 2026-11-21 | Reels (2min22) | KORT explicativo passo a passo (cliente + dono), narração feminina (Kokoro pf_dora) + legendas + destaques | public/instagram/tresk-reel-kort-explicativo.mp4 (+ -capa.jpg) | Enviado ao Anderson para revisão |
| 2026-11-21 | Stories (3) | Destaque KORT: agenda sozinha, 4 toques, painel do dono | public/instagram/stories/tresk-story-kort-1..3.jpg | Publicados (media ids 17923240650462621, 18111817562248746, 18110076422459451) |
| 2026-11-21 | Stories (3) | Destaque Cases: Divina Baby (sistema + Meu Crediário em breve) e KORT | public/instagram/stories/tresk-story-cases-1..3.jpg | Publicados (media ids 18103324130670961, 18150999637576678, 18080338442467506) |
| 2026-11-21 | Capas de destaque v2 | Ícone grande no círculo + nova capa Dicas | public/instagram/destaques/v2/ | Entregues ao Anderson para trocar no app |

## Músicas já usadas
- Believer – Imagine Dragons (2026-11-21)
- What You Waiting For? – Gwen Stefani (preparada em 2026-11-21, não usada)

## Próximos temas (plano inicial dos 9 primeiros posts)
3. Case Divina Baby — loja, PDV e crediário num sistema só
5. Bastidores: desenvolvimento
7. Depoimento de cliente (quando houver)
8. Serviços e como funciona o orçamento
9. Chamada para o KORT com teste grátis

## Recursos já criados
- Abertura padrão dos Reels (logo animado, ~5 s, com som): public/instagram/tresk-abertura.mp4. Todo Reels começa com ela; em Reels com música, cortar a abertura num número inteiro de batidas (floor(4,969 / (60/BPM)) batidas) para não desalinhar o ritmo.
- Página de links da bio: /links (app/links/page.tsx)
- Capas de destaque: public/instagram/destaques/ (Serviços, KORT, Cases, Orçamento, Bastidores); modelo em template-destaques.html
- Modelo de stories: template-stories.html (1080x1920)
