# Guía de Configuración de Google OAuth en Supabase

## 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Click en el selector de proyectos (arriba a la izquierda)
3. Click en **NEW PROJECT**
4. Configura:
   - **Project name**: oauth-steno (o el nombre que prefieras)
   - **Organization**: Dejar en blanco si es personal
5. Click **CREATE**
6. Espera a que se cree el proyecto (30 segundos aprox)
7. Selecciona el proyecto recién creado

## 2. Configurar OAuth Consent Screen

1. En el menú lateral, ve a **APIs & Services** → **OAuth consent screen**
2. Selecciona **External** (para usuarios fuera de tu organización)
3. Click **CREATE**
4. Configura la pantalla de consentimiento:

### App Information
- **App name**: OAuth Steno
- **User support email**: tu-email@gmail.com
- **App logo**: (opcional) Sube un logo de 120x120px

### App Domain (opcional para desarrollo)
- **Application home page**: http://localhost:3000
- **Application privacy policy link**: (dejar vacío por ahora)
- **Application terms of service link**: (dejar vacío por ahora)

### Developer Contact Information
- **Email addresses**: tu-email@gmail.com

5. Click **SAVE AND CONTINUE**

### Scopes
6. Click **ADD OR REMOVE SCOPES**
7. Selecciona:
   - ✅ `.../auth/userinfo.email`
   - ✅ `.../auth/userinfo.profile`
   - ✅ `openid`
8. Click **UPDATE**
9. Click **SAVE AND CONTINUE**

### Test Users (solo para desarrollo)
10. Click **ADD USERS**
11. Agrega tu email de prueba
12. Click **ADD**
13. Click **SAVE AND CONTINUE**

### Summary
14. Revisa la información
15. Click **BACK TO DASHBOARD**

## 3. Crear OAuth 2.0 Client ID

1. Ve a **APIs & Services** → **Credentials**
2. Click **CREATE CREDENTIALS** → **OAuth client ID**
3. Configura:

### Application Type
- Selecciona: **Web application**

### Name
- **Name**: OAuth Steno Web Client

### Authorized JavaScript Origins
- Click **ADD URI**
- Agrega:
  ```
  http://localhost:3000
  ```
- Para producción, agrega también:
  ```
  https://tu-dominio.vercel.app
  ```

### Authorized Redirect URIs
- Click **ADD URI**
- Agrega la URL de callback de Supabase:
  ```
  https://d6d9081b-a518-48ba-b110-3027ea5cfcac.supabase.co/auth/v1/callback
  ```

4. Click **CREATE**

## 4. Copiar Credenciales

Aparecerá un modal con tus credenciales:

```
Client ID: 123456789-abcdefg.apps.googleusercontent.com
Client Secret: GOCSPX-abc123def456
```

**¡IMPORTANTE!** Copia estas credenciales ahora. Las necesitarás en el siguiente paso.

## 5. Configurar en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Ve a **Authentication** → **Providers**
3. Busca **Google** en la lista
4. Habilita el toggle
5. Pega las credenciales:
   - **Client ID**: (el que copiaste de Google)
   - **Client Secret**: (el que copiaste de Google)
6. Click **Save**

## 6. Configurar URLs en Supabase

1. Ve a **Authentication** → **URL Configuration**
2. Configura:

### Site URL
```
http://localhost:3000
```

### Redirect URLs
```
http://localhost:3000/auth/callback
http://localhost:3000/**
```

Para producción, agrega también:
```
https://tu-dominio.vercel.app/auth/callback
https://tu-dominio.vercel.app/**
```

3. Click **Save**

## 7. Probar la Configuración

1. Ejecuta tu app:
```bash
npm run dev
```

2. Ve a http://localhost:3000/login

3. Click en "Continue with Google"

4. Deberías ver la pantalla de consentimiento de Google

5. Selecciona tu cuenta de Google

6. Autoriza la aplicación

7. Deberías ser redirigido a `/dashboard`

## 8. Verificar en Supabase

1. Ve a **Authentication** → **Users**
2. Deberías ver tu usuario recién creado
3. Verifica que tenga:
   - Email
   - Provider: google
   - Created at: fecha actual

## 9. Configuración para Producción

Cuando despliegues a producción:

### A. Actualizar Google Cloud Console

1. Ve a **Credentials** → Tu OAuth Client
2. En **Authorized JavaScript origins**, agrega:
   ```
   https://tu-dominio.vercel.app
   ```
3. Las redirect URIs ya están configuradas (usan Supabase)
4. Click **SAVE**

### B. Actualizar Supabase

1. Ve a **Authentication** → **URL Configuration**
2. Actualiza **Site URL**:
   ```
   https://tu-dominio.vercel.app
   ```
3. Agrega a **Redirect URLs**:
   ```
   https://tu-dominio.vercel.app/auth/callback
   https://tu-dominio.vercel.app/**
   ```

### C. Publicar la App (Opcional)

Si quieres que cualquier usuario pueda usar tu app:

1. Ve a Google Cloud Console
2. **APIs & Services** → **OAuth consent screen**
3. Click **PUBLISH APP**
4. Confirma la publicación

**Nota**: Para apps en producción con muchos usuarios, Google puede requerir verificación.

## 10. Agregar Más Providers (Opcional)

Supabase soporta muchos providers OAuth:

### GitHub
1. Ve a GitHub → Settings → Developer settings → OAuth Apps
2. New OAuth App
3. Callback URL: `https://[tu-proyecto].supabase.co/auth/v1/callback`

### Azure (Microsoft)
1. Ve a Azure Portal → App registrations
2. New registration
3. Redirect URI: `https://[tu-proyecto].supabase.co/auth/v1/callback`

### Facebook
1. Ve a Facebook Developers
2. Create App
3. Add Facebook Login product
4. Valid OAuth Redirect URIs: `https://[tu-proyecto].supabase.co/auth/v1/callback`

## 11. Troubleshooting

### Error: "redirect_uri_mismatch"
- Verifica que la redirect URI en Google Cloud Console sea exactamente:
  ```
  https://d6d9081b-a518-48ba-b110-3027ea5cfcac.supabase.co/auth/v1/callback
  ```
- No debe tener espacios ni caracteres extra

### Error: "Access blocked: This app's request is invalid"
- Verifica que hayas configurado el OAuth Consent Screen
- Agrega tu email como test user

### Error: "Invalid client"
- Verifica que el Client ID y Secret estén correctos en Supabase
- Asegúrate de no tener espacios al copiar/pegar

### Usuario no se crea en Supabase
- Verifica que el provider Google esté habilitado
- Revisa los logs en Supabase → Logs → Auth Logs

### Redirect loop infinito
- Verifica que las redirect URLs estén configuradas correctamente
- Asegúrate de que `/auth/callback` esté en la lista

## 12. Seguridad

✅ **Buenas prácticas**:
- Client Secret solo en Supabase (nunca en frontend)
- HTTPS obligatorio en producción
- Redirect URIs específicas (no wildcards en producción)
- Scopes mínimos necesarios (email, profile, openid)

❌ **Evitar**:
- Exponer Client Secret en código
- Usar HTTP en producción
- Agregar redirect URIs no confiables
- Solicitar scopes innecesarios

## 13. Límites y Cuotas

### Google OAuth (Gratis)
- **Usuarios**: Ilimitados
- **Requests**: 10,000 por día (gratis)
- **Costo**: $0

Si necesitas más:
- Puedes solicitar aumento de cuota (gratis)
- O pagar por cuotas mayores

## 14. Recursos

- [Google Cloud Console](https://console.cloud.google.com)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth with Google](https://supabase.com/docs/guides/auth/social-login/auth-google)

## 15. Checklist Final

- [ ] Proyecto creado en Google Cloud Console
- [ ] OAuth Consent Screen configurado
- [ ] OAuth Client ID creado
- [ ] Redirect URI configurada correctamente
- [ ] Credenciales copiadas a Supabase
- [ ] Provider Google habilitado en Supabase
- [ ] Site URL configurada en Supabase
- [ ] Redirect URLs configuradas en Supabase
- [ ] Probado el flujo de login
- [ ] Usuario creado correctamente en Supabase

¡Listo! Ahora tu app tiene autenticación con Google OAuth 2.0 🎉
