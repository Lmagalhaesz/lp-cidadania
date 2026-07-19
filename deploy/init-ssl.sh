#!/bin/sh
# Emite o certificado Let's Encrypt e ativa o HTTPS.
# Pré-requisito: DNS de drgustavoribeiro.com.br (e www) apontando pro servidor
# e a porta 80 pública chegando neste stack (ver docs/DEPLOY.md).
# Uso: ./deploy/init-ssl.sh seu-email@dominio.com
set -e

EMAIL="$1"
DOMAIN="drgustavoribeiro.com.br"

if [ -z "$EMAIL" ]; then
  echo "uso: ./deploy/init-ssl.sh seu-email@dominio.com"
  exit 1
fi

cd "$(dirname "$0")/.."

echo "==> checando DNS de $DOMAIN..."
if ! getent hosts "$DOMAIN" >/dev/null 2>&1; then
  echo "AVISO: $DOMAIN ainda não resolve. Aponte o DNS pro IP do servidor antes."
  exit 1
fi

echo "==> emitindo certificado (webroot)..."
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
  -d $DOMAIN -d www.$DOMAIN \
  --email $EMAIL --agree-tos --no-eff-email --non-interactive" certbot

echo "==> ativando conf HTTPS..."
# preserva PORTA_HTTP/PORTA_HTTPS se já existirem no .env
grep -v '^NGINX_CONF=' .env 2>/dev/null > .env.tmp || true
echo "NGINX_CONF=./deploy/nginx-ssl.conf" >> .env.tmp
mv .env.tmp .env
docker compose up -d web

sleep 2
echo "==> testando nginx..."
docker compose exec web nginx -t

echo "==> pronto. https://$DOMAIN no ar. Renovação automática a cada 12h."
