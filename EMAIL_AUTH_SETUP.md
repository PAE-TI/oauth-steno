# Configuración de Autenticación Email/Password

Esta guía te ayudará a configurar la autenticación con email y contraseña en Supabase, además del OAuth con Google.

## 1. Habilitar Email/Password Authentication en Supabase

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **Authentication** → **Providers**
3. Busca **Email** en la lista de proveedores
4. Asegúrate de que esté **habilitado** (toggle en verde)

## 2. Configurar Email Verification

### Habilitar Confirmación de Email

1. En Supabase Dashboard, ve a **Authentication** → **Settings**
2. Busca la sección **Email Auth**
3. Activa **Enable email confirmations**
4. Configura las siguientes opciones:
   - **Confirm email**: ✅ Activado
   - **Secure email change**: ✅ Activado (recomendado)
   - **Double confirm email changes**: ✅ Activado (opcional, más seguro)

### Configurar Email Templates

1. Ve a **Authentication** → **Email Templates**
2. Personaliza los siguientes templates:

#### Confirm Signup Template
```html
<h2>Confirma tu registro</h2>
<p>Hola,</p>
<p>Gracias por registrarte en OAuth Steno. Por favor confirma tu email haciendo clic en el siguiente enlace:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar Email</a></p>
<p>Si no creaste esta cuenta, puedes ignorar este email.</p>
```

#### Magic Link Template (opcional)
```html
<h2>Inicia sesión en OAuth Steno</h2>
<p>Hola,</p>
<p>Haz clic en el siguiente enlace para iniciar sesión:</p>
<p><a href="{{ .ConfirmationURL }}">Iniciar Sesión</a></p>
```

## 3. Configurar URLs de Redirección

1. Ve a **Authentication** → **URL Configuration**
2. Configura las siguientes URLs:

### Para Desarrollo Local
```
Site URL: http://localhost:3000
Redirect URLs:
  - http://localhost:3000/auth/callback
  - http://localhost:3000/**
```

### Para Producción (Vercel)
```
Site URL: https://tu-proyecto.vercel.app
Redirect URLs:
  - https://tu-proyecto.vercel.app/auth/callback
  - https://tu-proyecto.vercel.app/**
```

## 4. Crear las Tablas en Supabase

Ejecuta el siguiente SQL en **SQL Editor** de Supabase:

```sql
-- Ejecutar el contenido completo de supabase/schema.sql
```

O copia y pega el contenido del archivo `supabase/schema.sql` en el SQL Editor.

## 5. Configurar SMTP (Opcional pero Recomendado)

Por defecto, Supabase usa su propio servicio de email, pero tiene límites. Para producción, configura tu propio SMTP:

1. Ve a **Project Settings** → **Auth** → **SMTP Settings**
2. Habilita **Enable Custom SMTP**
3. Configura tu proveedor SMTP:

### Ejemplo con Gmail
```
Host: smtp.gmail.com
Port: 587
Username: tu-email@gmail.com
Password: tu-app-password
Sender email: tu-email@gmail.com
Sender name: OAuth Steno
```

### Ejemplo con SendGrid
```
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: TU_SENDGRID_API_KEY
Sender email: noreply@tudominio.com
Sender name: OAuth Steno
```

### Ejemplo con AWS SES
```
Host: email-smtp.us-east-1.amazonaws.com
Port: 587
Username: TU_SMTP_USERNAME
Password: TU_SMTP_PASSWORD
Sender email: noreply@tudominio.com
Sender name: OAuth Steno
```

## 6. Configurar Rate Limiting (Seguridad)

1. Ve a **Authentication** → **Rate Limits**
2. Configura los límites recomendados:
   - **Sign ups**: 10 por hora por IP
   - **Sign ins**: 30 por hora por IP
   - **Password resets**: 5 por hora por IP
   - **Email sends**: 10 por hora por usuario

## 7. Políticas de Contraseña

1. Ve a **Authentication** → **Policies**
2. Configura:
   - **Minimum password length**: 6 caracteres (ya configurado en el frontend)
   - **Require uppercase**: Opcional
   - **Require lowercase**: Opcional
   - **Require numbers**: Opcional
   - **Require special characters**: Opcional

## 8. Verificar la Configuración

### Probar Registro
1. Ve a `http://localhost:3000/signup`
2. Completa el formulario con:
   - Nombre
   - Apellido
   - Email
   - Contraseña
3. Haz clic en "Registrarse"
4. Deberías recibir un email de confirmación
5. Haz clic en el enlace del email
6. Serás redirigido a `/auth/callback` y luego al dashboard

### Probar Login
1. Ve a `http://localhost:3000/login`
2. Ingresa tu email y contraseña
3. Haz clic en "Iniciar Sesión"
4. Deberías ser redirigido al dashboard

### Verificar IP en la Base de Datos
1. Ve a **Table Editor** en Supabase
2. Abre la tabla `user_profiles`
3. Verifica que los campos `registration_ip` y `last_login_ip` se hayan guardado correctamente

## 9. Troubleshooting

### El email de verificación no llega
- Revisa la carpeta de spam
- Verifica que el SMTP esté configurado correctamente
- Revisa los logs en **Authentication** → **Logs**

### Error al crear el perfil
- Verifica que la tabla `user_profiles` exista
- Verifica que las políticas RLS estén configuradas correctamente
- Revisa los logs del servidor en la consola

### Error de redirección
- Verifica que las URLs de redirección estén configuradas en Supabase
- Verifica que `NEXT_PUBLIC_APP_URL` esté configurado en `.env.local`

## 10. Seguridad Adicional

### Habilitar 2FA (Opcional)
1. Ve a **Authentication** → **Settings**
2. Habilita **Enable Phone Auth** para 2FA con SMS
3. O usa **TOTP** para autenticación de dos factores

### Habilitar CAPTCHA (Recomendado para Producción)
1. Ve a **Authentication** → **Settings**
2. Habilita **Enable Captcha protection**
3. Configura tu clave de reCAPTCHA de Google

## Resumen de Flujo

1. **Registro**:
   - Usuario completa formulario → Supabase crea cuenta → Email de verificación enviado → Usuario confirma email → Perfil creado con IP

2. **Login**:
   - Usuario ingresa credenciales → Supabase valida → IP actualizada → Redirigido al dashboard

3. **Login con Google**:
   - Usuario hace clic en "Google" → OAuth flow → Callback → Dashboard

## Próximos Pasos

- ✅ Configurar Supabase Auth
- ✅ Crear tablas en la base de datos
- ✅ Configurar URLs de redirección
- ✅ Probar registro y login
- 🔄 Configurar SMTP personalizado (opcional)
- 🔄 Habilitar CAPTCHA (recomendado)
- 🔄 Configurar 2FA (opcional)
