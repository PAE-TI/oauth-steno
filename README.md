# OAuth Steno - Sistema de Autenticación y Suscripciones

Sistema completo de autenticación OAuth2 con Supabase (Google OAuth + Email/Password) y suscripciones con Stripe.

## 🚀 Stack Tecnológico (100% Gratuito)

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Type safety
- **Supabase** - Autenticación + PostgreSQL (Free tier)
- **Stripe** - Procesamiento de pagos (sin costo fijo)
- **Tailwind CSS** - Estilos
- **Vercel** - Hosting (Free tier)

## ✨ Características

- ✅ **Autenticación Dual**:
  - Login con Google OAuth
  - Login con Email y Contraseña
  - Registro con verificación de email
- ✅ **Gestión de Usuarios**:
  - Perfiles con nombre, apellido y email
  - Registro de IP (registro y último login)
  - Verificación de email obligatoria
- ✅ **Suscripciones con Stripe**:
  - Checkout seguro
  - Portal de cliente
  - Webhooks para sincronización
- ✅ **Seguridad**:
  - Row Level Security (RLS) en Supabase
  - Middleware de autenticación
  - Rutas protegidas

## 📋 Prerequisitos

1. **Cuenta de Supabase** (gratuita)
2. **Cuenta de Stripe** (gratuita, modo test)
3. **Node.js 18+** instalado

## 🔧 Configuración Paso a Paso

### 1. Configurar Supabase

#### A. Crear tablas en la base de datos

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Ve a **SQL Editor**
3. Copia y pega el contenido de `supabase/schema.sql`
4. Ejecuta el script (Run)

Esto creará:
- Tabla `user_profiles` (nombre, apellido, email, IPs)
- Tabla `subscriptions` (datos de Stripe)
- Políticas RLS para seguridad
- Triggers automáticos

#### B. Configurar Authentication

##### Google OAuth
1. Ve a **Authentication** → **Providers** → Habilita **Google**
2. Sigue la guía completa en `GOOGLE_OAUTH_SETUP.md`

##### Email/Password
1. Ve a **Authentication** → **Providers** → Asegúrate de que **Email** esté habilitado
2. Activa la verificación de email en **Authentication** → **Settings**
3. Sigue la guía completa en `EMAIL_AUTH_SETUP.md`

#### C. Configurar URLs de Redirección

1. Ve a **Authentication** → **URL Configuration**
2. Configura:
   - **Site URL**: `http://localhost:3000` (dev) / `https://tu-dominio.vercel.app` (prod)
   - **Redirect URLs**:
     ```
     http://localhost:3000/auth/callback
     http://localhost:3000/**
     https://tu-dominio.vercel.app/auth/callback
     https://tu-dominio.vercel.app/**
     ```

### 2. Configurar Stripe

#### A. Crear cuenta y obtener API keys

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com)
2. Activa **Test Mode** (toggle en la esquina superior derecha)
3. Ve a **Developers** → **API keys**
4. Copia:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

#### B. Crear producto

1. Ve a **Products** → **Add Product**
2. Configura:
   - Name: `Premium License`
   - Description: `Acceso completo por 1 mes`
   - Pricing model: `Recurring`
   - Price: `$9.00 USD`
   - Billing period: `Monthly`
3. Guarda y copia el **Price ID** (price_...)

#### C. Configurar webhook (después del deploy)

1. Ve a **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `https://tu-dominio.vercel.app/api/stripe/webhook`
3. Selecciona eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copia el **Signing secret** (whsec_...)

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Configurar Variables de Entorno

Edita `.env.local` con tus credenciales reales:

```bash
# Supabase (YA CONFIGURADO)
NEXT_PUBLIC_SUPABASE_URL=https://d6d9081b-a518-48ba-b110-3027ea5cfcac.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=hypmTWS4UVRYQkPV4n3-qzbg2dNzLB9T0qaACsWOa_0

# Stripe (REEMPLAZA CON TUS KEYS)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_KEY_AQUI
STRIPE_SECRET_KEY=sk_test_TU_KEY_AQUI
STRIPE_WEBHOOK_SECRET=whsec_TU_SECRET_AQUI
NEXT_PUBLIC_STRIPE_PRICE_ID=price_TU_PRICE_ID_AQUI

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🚢 Deploy en Vercel (Gratuito)

### 1. Preparar repositorio

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/oauth-steno.git
git push -u origin main
```

### 2. Deploy en Vercel

1. Ve a [Vercel](https://vercel.com)
2. **Import Project** → Selecciona tu repositorio
3. **Configure Project**:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
4. **Environment Variables** → Agrega todas las variables de `.env.local`
5. **Deploy**

### 3. Actualizar URLs

Después del deploy, actualiza:

**En Supabase:**
- Authentication → URL Configuration → Redirect URLs:
  ```
  https://tu-proyecto.vercel.app/auth/callback
  ```

**En Stripe:**
- Developers → Webhooks → Endpoint URL:
  ```
  https://tu-proyecto.vercel.app/api/stripe/webhook
  ```

**En Google Cloud Console:**
- Credentials → OAuth 2.0 Client → Authorized redirect URIs:
  ```
  https://d6d9081b-a518-48ba-b110-3027ea5cfcac.supabase.co/auth/v1/callback
  ```

**En Vercel:**
- Settings → Environment Variables → `NEXT_PUBLIC_APP_URL`:
  ```
  https://tu-proyecto.vercel.app
  ```

## 🧪 Probar el Flujo Completo

### 1. Probar Registro con Email/Password

1. Ve a `/signup`
2. Completa el formulario:
   - Nombre
   - Apellido
   - Email
   - Contraseña (mínimo 6 caracteres)
3. Click en "Registrarse"
4. Revisa tu email y haz clic en el enlace de verificación
5. Serás redirigido a `/auth/callback` y luego al dashboard

### 2. Probar Login con Email/Password

1. Ve a `/login`
2. Ingresa tu email y contraseña
3. Click en "Iniciar Sesión"
4. Deberías ser redirigido a `/dashboard`

### 3. Probar Login con Google OAuth

1. Ve a `/login`
2. Click en "Google"
3. Autoriza con tu cuenta de Google
4. Deberías ser redirigido a `/dashboard`
5. Como no tienes suscripción, serás redirigido a `/pricing`

### 4. Probar Suscripción

### 2. Probar Suscripción

1. En `/pricing`, click en "Suscribirse - $9/mes"
2. Serás redirigido a Stripe Checkout
3. Usa tarjeta de prueba:
   - Número: `4242 4242 4242 4242`
   - Fecha: Cualquier fecha futura
   - CVC: Cualquier 3 dígitos
   - ZIP: Cualquier código
4. Completa el pago
5. Serás redirigido a `/dashboard?success=true`
6. Ahora deberías ver tu suscripción activa

### 3. Probar Gestión de Suscripción

1. En `/dashboard`, click en "Gestionar Suscripción"
2. Serás redirigido al Customer Portal de Stripe
3. Puedes cancelar, actualizar método de pago, etc.

## 📁 Estructura del Proyecto

```
oauth-steno/
├── app/
│   ├── api/
│   │   └── stripe/
│   │       ├── checkout/route.ts    # Crear sesión de pago
│   │       ├── webhook/route.ts     # Recibir eventos de Stripe
│   │       └── portal/route.ts      # Portal del cliente
│   ├── auth/
│   │   └── callback/route.ts        # Callback OAuth
│   ├── dashboard/page.tsx           # Dashboard protegido
│   ├── login/page.tsx               # Página de login
│   ├── pricing/page.tsx             # Planes de suscripción
│   └── page.tsx                     # Landing page
├── components/
│   ├── auth/
│   │   ├── AuthButton.tsx           # Botón de login
│   │   └── UserMenu.tsx             # Menú de usuario
│   └── subscription/
│       ├── CheckoutButton.tsx       # Botón de checkout
│       ├── PricingCard.tsx          # Tarjeta de precio
│       └── SubscriptionStatus.tsx   # Estado de suscripción
├── lib/
│   ├── supabase/
│   │   ├── client.ts                # Cliente browser
│   │   ├── server.ts                # Cliente server
│   │   └── middleware.ts            # Cliente middleware
│   ├── stripe.ts                    # Cliente Stripe
│   └── utils.ts                     # Utilidades
├── middleware.ts                    # Protección de rutas
└── supabase/
    └── schema.sql                   # Schema de BD
```

## 🔒 Seguridad

- ✅ Row Level Security (RLS) habilitado en Supabase
- ✅ Service Role Key solo en server-side
- ✅ Webhook signature verification
- ✅ Middleware de protección de rutas
- ✅ Variables de entorno seguras

## 💰 Costos

- **Supabase Free Tier**: $0/mes (hasta 500 MB DB, 50k usuarios)
- **Vercel Free Tier**: $0/mes (100 GB bandwidth)
- **Stripe**: $0/mes + 2.9% + $0.30 por transacción
  - Por cada venta de $9: recibes ~$8.44 neto

## 🐛 Troubleshooting

### Error: "Invalid signature" en webhook

- Verifica que `STRIPE_WEBHOOK_SECRET` sea correcto
- Asegúrate de usar el secret del webhook de producción (no test)

### Error: "Unauthorized" en checkout

- Verifica que el usuario esté autenticado
- Revisa que las cookies de Supabase estén configuradas correctamente

### Error: "No subscription found"

- Verifica que la tabla `subscriptions` exista en Supabase
- Revisa que el webhook de Stripe esté funcionando
- Chequea los logs en Stripe Dashboard → Webhooks

### Usuario no puede acceder al dashboard

- Verifica que el webhook haya actualizado el status a "active"
- Revisa la tabla `subscriptions` en Supabase
- Chequea que el middleware esté funcionando correctamente

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Stripe](https://stripe.com/docs)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Tarjetas de prueba de Stripe](https://stripe.com/docs/testing)

## 📝 Notas Importantes

1. **Modo Test de Stripe**: Asegúrate de estar en modo test durante el desarrollo
2. **Google OAuth**: Requiere configuración en Google Cloud Console
3. **Webhooks**: Solo funcionan en producción (usa Stripe CLI para desarrollo local)
4. **RLS**: Las políticas de Supabase protegen los datos de cada usuario

## 🎯 Próximos Pasos

- [ ] Agregar más providers OAuth (GitHub, Azure, etc.)
- [ ] Implementar planes anuales con descuento
- [ ] Agregar notificaciones por email (Resend)
- [ ] Implementar analytics (Vercel Analytics)
- [ ] Agregar tests (Jest, Playwright)

## 📄 Licencia

MIT
