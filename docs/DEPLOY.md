# Deploy — stack Docker isolada

Mesmo padrão da LP da Funnely: nginx servindo o export estático + certbot,
tudo em stack própria (containers `cidadania-web`/`cidadania-certbot`, rede e
volumes próprios).

## Decisão pendente: onde rodar

O servidor atual (129.213.128.191) já tem a `funnely-lp` ocupando 80/443.
Duas portas públicas não podem ser compartilhadas por dois nginx. Opções:

1. **Servidor/VPS dedicado pro cliente** (recomendado: isola de vez o risco e
   o billing do cliente): deploy padrão abaixo, sem mudar nada.
2. **Mesmo servidor**: rodar esta stack em portas altas
   (`echo "PORTA_HTTP=8081" >> .env`; `PORTA_HTTPS=8443`) e fazer o nginx da
   funnely-lp virar edge com `server_name` + `proxy_pass` para 8081/8443.
   Funciona, mas acopla os projetos: o certbot desta stack precisa do desafio
   ACME chegando na porta 80 pública (rotear
   `/.well-known/acme-challenge/` no edge). Só escolher esta opção com essa
   rota configurada.

## Deploy padrão (servidor dedicado)

```bash
# 1. primeiro deploy (sobe em HTTP:80)
git clone <repositorio> /opt/cidadania-lp
cd /opt/cidadania-lp
docker compose up -d --build

# 2. apontar DNS: A @ -> IP do servidor · A www -> IP (ou CNAME www -> @)
#    dominio: drgustavoribeiro.com.br (registrar no Registro.br)

# 3. com DNS propagado, ativar HTTPS (emite cert e troca a conf do nginx)
./deploy/init-ssl.sh contato@dominio.com

# 4. atualizações
git pull && docker compose up -d --build web
```

O `init-ssl.sh` grava `NGINX_CONF=./deploy/nginx-ssl.conf` no `.env` (não
versionado), então `git pull` não desfaz o HTTPS. Renovação do cert roda no
container certbot a cada 12h.

## Checklist pós-deploy

- [ ] `curl -I https://drgustavoribeiro.com.br/cidadania-lituana` → 200
- [ ] As 3 rotas + /privacidade respondem; www redireciona pro apex
- [ ] Formulário de teste chega na planilha (docs/SETUP-CLIENTE.md)
- [ ] `npm run build && npm run verificar` passou no commit deployado
