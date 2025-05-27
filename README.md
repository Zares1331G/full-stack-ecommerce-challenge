# PRUEBA-TACNICA

## 🎯 Objetivo

Desarrollar una aplicación en VTEX IO que permita a los administradores de una tienda configurar promociones inteligentes basadas en comportamiento del usuario y datos externos. La app debe ofrecer una interfaz en el admin, registrar eventos y activar campañas dinámicas.

---

## 🔩 Requisitos Técnicos

### 🧑‍💻 Frontend (VTEX IO Admin + Store)

#### Admin:
- Crear una sección en el Admin de VTEX IO con:
  - Lista de promociones activas
  - Formulario para crear o editar reglas de promociones:
    - Categoría objetivo
    - Rango de fechas
    - Monto mínimo de compra
    - Tipo de incentivo: descuento, regalo, envío gratis

#### Storefront:
- Mostrar banner condicional en el home o categoría cuando la promoción aplica.
- Mostrar mensaje dinámico en el minicart si el carrito cumple con alguna promoción activa.

---

### 🧠 Backend (Node.js en VTEX IO)

- Endpoint `/promo-check`  y devuelva promociones aplicables.
- Guardar y administrar las reglas de promociones (puede ser en un `vbase`, o base de datos externa si lo prefieres).
- Crear un servicio que escuche eventos del carrito y analice cuándo se cumple una promoción.
- Registrar en logs cuándo un usuario ve o usa una promoción.

---

### 🌐 Integraciones

- Simular integración con un sistema externo de analytics (mock o endpoint local) para enviar eventos:  
  - `"promotion_viewed"`  
  - `"promotion_applied"`

---

## 🧱 Detalles Técnicos

- Uso de VTEX IO Admin Pages para el panel de control.
- Buen manejo de tipos y modularidad.
- Bloques correctamente configurados en `manifest.json`.
- Traducciones en `messages.json`.

---

## ✅ Criterios de Evaluación

| Criterio                                      | Peso    |
|----------------------------------------------|---------|
| Uso de VTEX IO Admin Pages                   | ⭐⭐⭐⭐ |
| Arquitectura backend y lógica de negocio     | ⭐⭐⭐⭐ |
| Buenas prácticas en modularidad y código limpio | ⭐⭐⭐ |
| Manejo de datos, eventos y estados globales  | ⭐⭐⭐ |
| Documentación y claridad del setup           | ⭐⭐  |
| Bonus: test unitarios, cache, manejo de errores | ⭐  |

---

## 📁 Entregables

- Repositorio en GitHub con:
  - Código fuente completo (admin + storefront + backend)
  - Instrucciones paso a paso para instalar y probar la app
  - Documentación breve del enfoque y decisiones técnicas

---