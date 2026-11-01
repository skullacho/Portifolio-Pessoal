# Portfólio de Pedro Sante Maria Bueno Silva 🚀

Site de portfólio moderno, profissional, responsivo e de alta performance desenvolvido especialmente para **Pedro Sante Maria Bueno Silva**, estudante de 17 anos do 3º ano do Ensino Médio integrado ao Técnico em Tecnologia da Informação (TI).

---

## 🎨 Identidade Visual & Design

- **Inspiração:** Awwwards, SiteInspire e Mobbin.
- **Paleta de Cores:**
  - Fundo principal: `#0B1020` (azul-escuro profundo / void tech)
  - Fundo secundário: `#151D32`
  - Roxo de destaque: `#8B5CF6`
  - Azul elétrico: `#38BDF8`
  - Títulos: `#FFFFFF` / `#0F172A` (Light mode)
  - Textos secundários: `#94A3B8` / `#475569` (Light mode)
- **Tipografia:**
  - Títulos: **Space Grotesk**
  - Textos e descrições: **Inter**
- **Estilo:**
  - Minimalista, futurista e altamente tecnológico.
  - Efeito Spotlight 3D reativo ao cursor nos cards.
  - Canvas interativo de constelação de nós e partículas no Hero.
  - Alternância de Modo Claro e Escuro (Light / Dark) com persistência em `localStorage`.
  - Zero dependência externa pesada, alta velocidade de carregamento (Lighthouse 95+).

---

## 📁 Estrutura dos Arquivos

```text
pedro-sante-portfolio/
│
├── index.html        # Estrutura semântica, acessibilidade e SEO completo
├── style.css         # Variáveis CSS para temas, grid, responsividade e animações
├── script.js         # Interatividade, menu mobile, canvas, validações e envio
└── README.md         # Documentação e guia de implantação
```

---

## ⚙️ Funcionalidades Implementadas

1. **Menu de navegação fixo:** Blur translúcido ao rolar (`backdrop-filter: blur(16px)`).
2. **Rolagem suave:** Âncoras nativas fluidas entre todas as seções.
3. **Menu hambúrguer para mobile:** Com trava de rolagem no body e fechamento via ESC ou toque externo.
4. **ScrollSpy ativo:** Identifica em qual seção o usuário está e ilumina o item correspondente da barra.
5. **Alternância Claro/Escuro:** Botão interativo no topo que salva sua preferência no navegador.
6. **Canvas de Partículas no Hero:** Partículas leves com conexões dinâmicas que reagem ao mouse.
7. **Projetos Reais Destacados:**
   - **Hangar Prime Imóveis** (TCC): Link para [lp-wbni.vercel.app](https://lp-wbni.vercel.app/).
   - **GameHub**: Link para [gamehub-backend-nine.vercel.app](https://gamehub-backend-nine.vercel.app/).
   - **Em desenvolvimento**: Card visual com animação de radar e scanner.
8. **Formulário com Envio Real:**
   - Validação de campos em tempo real (nome, e-mail e mensagem com contador).
   - Envio assíncrono via `fetch()` para endpoint HTTP seguro.
   - Feedback autêntico (não simula falsos sucessos).
   - Fallback de 1 clique para abertura do aplicativo de e-mail com a mensagem pré-preenchida em caso de falha de conexão.
9. **Botão Voltar ao Topo:** Aparece suavemente conforme a página é rolada.
10. **100% Responsivo:** Testado e ajustado para celulares, tablets, notebooks e desktops.

---

## 🌐 Como Publicar na Vercel (1 Minuto)

1. Suba este projeto para um repositório no seu GitHub:
   ```bash
   git remote add origin https://github.com/skullacho/Portifolio-Pessoal.git
   git branch -M main
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e faça login com seu GitHub.
3. Clique em **Add New...** > **Project**.
4. Selecione o repositório do seu portfólio e clique em **Deploy**.
5. Pronto! Seu site estará no ar em segundos com certificado SSL gratuito.

---

## ✉️ Como Configurar o Seu Próprio Endpoint do Formspree

Caso queira receber os e-mails diretamente na sua caixa de entrada pessoal gratuitamente:
1. Acesse [formspree.io](https://formspree.io) e crie uma conta gratuita.
2. Crie um novo formulário chamado "Portfólio Pedro Sante".
3. Copie o seu endpoint (ex: `https://formspree.io/f/seu-codigo-aqui`).
4. Abra o arquivo `script.js` na linha 15 e altere:
   ```javascript
   const FORM_ENDPOINT = 'https://formspree.io/f/seu-codigo-aqui';
   ```
5. Pronto! Todas as mensagens preenchidas no formulário chegarão no seu e-mail cadastrado.
