# Identidade "dossiê de arquivo" — documentação dos tokens

Direção: a estética vem do universo REAL do processo de cidadania (papel de
certidão, tinta de registro, lacre, ficha de arquivo), não do clichê de
agência de intercâmbio. Proibidos por decisão de projeto: dourado + verde
bandeira, serif pomposa com brasão, foto de stock de passaporte/malas/Coliseu,
"viva seu sonho europeu".

Fonte única dos valores: bloco `:root` de `src/app/globals.css` + fontes no
`src/app/layout.tsx` + textos de marca em `src/lib/marca.ts`. White-label =
trocar esses três pontos + `src/variantes/*`.

## Cores (com papel semântico)

| Token | Valor | Papel |
|---|---|---|
| `--papel` | #F6F2EA | Fundo. Papel quente de certidão, nunca branco puro |
| `--papel-2` | #FDFBF6 | Ficha/cartão sobre o papel |
| `--papel-3` | #EFE9DC | Faixa de apoio (seção do filtro) |
| `--tinta` | #1E2433 | Texto. Azul-preto de caneta de registro |
| `--tinta-2` | #4C5364 | Texto secundário |
| `--tinta-3` | #667085 | Metadado (só em texto de 14px pra cima) |
| `--lacre` | #9E2B25 | A ÚNICA cor de ação (botões, destaque itálico, foco) |
| `--lacre-2` | #7E1F1A | Hover/pressionado |
| `--arquivo` | #232A3B | Seção escura (VSL, footer), texto em papel |
| `--selo` | #3E5C4B | Exclusivo do selo "caminho aberto" no quiz |
| `--linha` / `--linha-forte` | #DCD4C3 / #B9AE97 | Hairlines de ficha |

Contrastes verificados (WCAG AA): tinta/papel 13.0:1 · tinta-2/papel 7.0:1 ·
branco/lacre 7.4:1 · papel/arquivo 11.4:1.

Regra de proporção: lacre é escasso. Um botão por dobra, o itálico do hero e
microdetalhes (barra de progresso, riscos do filtro). Se o lacre passar de
~5% da tela, está errado.

## Tipografia

| Fonte | Papel | Pesos |
|---|---|---|
| Newsreader (serif editorial, `--fonte-titulo`) | Títulos, números do método, wordmark. Itálico = ênfase de voz (destaque do hero) | 400/500/600 + itálico |
| Archivo (`--fonte-texto`) | Corpo, interface, etiquetas | 400/500/600/700 |

Nunca Newsreader em texto corrido longo. Etiquetas (`.etiqueta`) sempre
Archivo 600, caps, tracking 0.14em, com o traço de 22px à esquerda.

## Motivos visuais da identidade

- **Ficha**: cartões com hairline `--linha`, canto quase reto (3px), sombra
  curta, furo de fichário no canto (hero).
- **Selo/carimbo**: resultado do quiz em caps com borda 1.5px e rotação de
  -1.2deg. Único elemento com rotação; não abusar.
- **Numeração editorial**: método com "01." em Newsreader itálico lacre.
- **Grão de papel**: dois gradientes quase invisíveis no body; custo zero.
- **Seção arquivo**: o momento do vídeo é escuro (mudança de ambiente = senta
  e escuta), com glow discreto de lacre atrás do play.

## O que é da Funnely e o que é do cliente

A marca do advogado é DELE (este arquivo documenta a dele). Da Funnely, o
template herda só o rigor: tokens como fonte única, papel semântico por cor,
proporção da cor de ação, contraste AA verificado e gate de verificação antes
de publicar.
