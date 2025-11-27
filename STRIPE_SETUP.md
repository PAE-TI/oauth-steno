# Guía Rápida de Configuración de Stripe

## 1. Crear Cuenta y Obtener API Keys

1. Ve a https://dashboard.stripe.com/register
2. Crea tu cuenta (gratis)
3. Activa **Test Mode** (toggle arriba a la derecha)
4. Ve a **Developers** → **API keys**
5. Copia las keys:

```bash
# Publishable key (empieza con pk_test_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Q...

# Secret key (empieza con sk_test_)
STRIPE_SECRET_KEY=sk_test_51Q...
```

## 2. Crear Producto de Suscripción

1. Ve a **Products** → **Add Product**
2. Configura:
   - **Name**: Premium License
   - **Description**: Acceso completo por 1 mes
   - **Pricing model**: Recurring
   - **Price**: $9.00 USD
   - **Billing period**: Monthly
3. Click **Save product**
4. Copia el **Price ID** (empieza con price_)

```bash
NEXT_PUBLIC_STRIPE_PRICE_ID=price_1Q...
```

## 3. Configurar Webhook (Después del Deploy)

### Para Desarrollo Local (Opcional)

1. Instala Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.4/stripe_1.19.4_linux_x86_64.tar.gz
tar -xvf stripe_1.19.4_linux_x86_64.tar.gz
```

2. Login:
```bash
stripe login
```

3. Forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

4. Copia el webhook secret que aparece (whsec_...)

### Para Producción

1. Deploy tu app en Vercel primero
2. Ve a **Developers** → **Webhooks** → **Add endpoint**
3. Configura:
   - **Endpoint URL**: `https://tu-dominio.vercel.app/api/stripe/webhook`
   - **Description**: Production webhook
   - **Events to send**:
     - ✅ checkout.session.completed
     - ✅ customer.subscription.created
     - ✅ customer.subscription.updated
     - ✅ customer.subscription.deleted
4. Click **Add endpoint**
5. Copia el **Signing secret** (whsec_...)

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 4. Tarjetas de Prueba

Para probar pagos en modo test, usa estas tarjetas:

### Pago Exitoso
```
Número: 4242 4242 4242 4242
Fecha: Cualquier fecha futura (ej: 12/25)
CVC: Cualquier 3 dígitos (ej: 123)
ZIP: Cualquier código (ej: 12345)
```

### Pago Rechazado
```
Número: 4000 0000 0000 0002
```

### Requiere Autenticación 3D Secure
```
Número: 4000 0025 0000 3155
```

## 5. Verificar Configuración

### Checklist:
- [ ] API keys copiadas en `.env.local`
- [ ] Producto creado con Price ID
- [ ] Webhook configurado (producción)
- [ ] Variables de entorno actualizadas en Vercel

### Probar:
1. Ejecuta `npm run dev`
2. Ve a http://localhost:3000/login
3. Inicia sesión con Google
4. Ve a http://localhost:3000/pricing
5. Click en "Suscribirse"
6. Usa tarjeta de prueba: 4242 4242 4242 4242
7. Completa el pago
8. Deberías ser redirigido a /dashboard con suscripción activa

## 6. Monitorear Webhooks

1. Ve a **Developers** → **Webhooks**
2. Click en tu endpoint
3. Ve a la pestaña **Logs**
4. Aquí verás todos los eventos enviados y su estado

### Estados:
- ✅ **Succeeded**: Webhook procesado correctamente
- ❌ **Failed**: Error al procesar (revisa logs)
- ⏳ **Pending**: Esperando respuesta

## 7. Customer Portal (Gestión de Suscripciones)

El Customer Portal permite a los usuarios:
- Cancelar suscripción
- Actualizar método de pago
- Ver historial de facturas
- Descargar recibos

Ya está configurado automáticamente en `/api/stripe/portal`

## 8. Modo Producción

Cuando estés listo para producción:

1. **Activa tu cuenta de Stripe**:
   - Completa verificación de identidad
   - Agrega información bancaria

2. **Cambia a Live Mode**:
   - Toggle "Test Mode" → OFF
   - Obtén nuevas API keys (pk_live_ y sk_live_)

3. **Actualiza variables de entorno en Vercel**:
   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```

4. **Crea nuevo webhook para producción**:
   - Usa las mismas URLs pero en Live Mode
   - Copia el nuevo webhook secret

5. **Actualiza Price ID**:
   - Crea el producto en Live Mode
   - Actualiza `NEXT_PUBLIC_STRIPE_PRICE_ID`

## 9. Recursos Útiles

- [Stripe Dashboard](https://dashboard.stripe.com)
- [Documentación de Webhooks](https://stripe.com/docs/webhooks)
- [Tarjetas de Prueba](https://stripe.com/docs/testing)
- [Customer Portal](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## 10. Troubleshooting

### Webhook no funciona
- Verifica que la URL sea correcta
- Revisa que el signing secret esté en `.env.local`
- Chequea los logs en Stripe Dashboard

### Pago no se procesa
- Verifica que estés en Test Mode
- Usa tarjeta de prueba correcta
- Revisa console del navegador

### Suscripción no se activa
- Verifica que el webhook esté funcionando
- Revisa la tabla `subscriptions` en Supabase
- Chequea logs del servidor

## 11. Comisiones de Stripe

### Modo Test
- **Gratis**: Sin cargos en modo test

### Modo Producción
- **Por transacción**: 2.9% + $0.30 USD
- **Sin costo mensual**: $0/mes
- **Ejemplo**: Venta de $9.00
  - Comisión: $0.56
  - Recibes: $8.44 neto

### Pagos Internacionales
- **Tarjetas internacionales**: +1.5%
- **Conversión de moneda**: +1%

## 12. Seguridad

✅ **Buenas prácticas implementadas**:
- Secret key solo en server-side
- Webhook signature verification
- HTTPS obligatorio en producción
- No exponer API keys en frontend

❌ **Nunca hagas esto**:
- Exponer `STRIPE_SECRET_KEY` en el cliente
- Deshabilitar webhook signature verification
- Usar HTTP en producción
- Commitear API keys en Git
