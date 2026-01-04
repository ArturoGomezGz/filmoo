# 📘 Guía práctica de Firestore (CRUD) con React / React Native

Esta guía es una referencia rápida para **usar Firestore desde React / React Native** (Expo incluido), enfocada en **operaciones CRUD** y pensada para desarrolladores con **background en SQL**.

---

## 🧠 Modelo mental básico

* Firestore es una **base de datos NoSQL orientada a documentos**
* Los datos se organizan así:

```text
colección → documento → campos (JSON)
```

* No existen JOINs
* El **ID del documento** es clave (frecuentemente el `uid` de Firebase Auth)
* Se optimiza para **lecturas rápidas**

---

## 📦 Configuración base

Asumimos que ya tienes Firebase Auth configurado y este archivo:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 📌 Importaciones más usadas

```ts
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
```

---

## 📁 Referencias (concepto clave)

Firestore **no ejecuta nada** sin una referencia.

### Referencia a una colección

```ts
collection(db, "users");
```

### Referencia a un documento

```ts
doc(db, "users", uid);
```

---

## 🟢 CREATE (Crear)

### Crear documento con ID automático

```ts
await addDoc(collection(db, "posts"), {
  title: "Hola Firestore",
  createdAt: serverTimestamp()
});
```

### Crear documento con ID específico (recomendado para usuarios)

```ts
await setDoc(doc(db, "users", uid), {
  name: "Arturo",
  email: "arturo@email.com",
  createdAt: serverTimestamp()
});
```

---

## 🔵 READ (Leer)

### Leer un documento

```ts
const snap = await getDoc(doc(db, "users", uid));

if (snap.exists()) {
  console.log(snap.data());
}
```

### Leer todos los documentos de una colección

```ts
const snap = await getDocs(collection(db, "posts"));

const data = snap.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

---

## 🟡 UPDATE (Actualizar)

```ts
await updateDoc(doc(db, "users", uid), {
  name: "Nuevo nombre"
});
```

* Solo actualiza los campos indicados
* No sobrescribe el documento completo

---

## 🔴 DELETE (Eliminar)

```ts
await deleteDoc(doc(db, "posts", postId));
```

> ⚠️ El borrado es permanente

---

## 🔍 QUERIES (Filtros)

### Filtro simple (WHERE)

```ts
const q = query(
  collection(db, "posts"),
  where("userId", "==", uid)
);

const snap = await getDocs(q);
```

### Múltiples filtros

```ts
query(
  collection(db, "events"),
  where("status", "==", "active"),
  where("city", "==", "GDL")
);
```

> Firestore puede pedir crear índices automáticamente

---

## 📂 Subcolecciones

```text
users/{uid}/events
```

```ts
await addDoc(collection(db, "users", uid, "events"), {
  title: "Evento privado"
});
```

Usa subcolecciones cuando los datos:

* Pertenecen solo al usuario
* No se consultan globalmente

---

## 🔐 Reglas de seguridad (básicas)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

---

## 🔄 SQL vs Firestore

| SQL    | Firestore        |
| ------ | ---------------- |
| INSERT | addDoc / setDoc  |
| SELECT | getDoc / getDocs |
| WHERE  | query + where    |
| UPDATE | updateDoc        |
| DELETE | deleteDoc        |
| JOIN   | ❌ No existe      |

---

## ❌ Errores comunes

* Pensar en tablas
* Usar email como ID
* Guardar contraseñas
* No usar reglas
* Documentos gigantes

---

## ✅ Buenas prácticas

* Usa `uid` como ID
* Centraliza CRUD en `services/`
* Diseña según pantallas
* Prefiere lecturas simples
* Denormaliza sin miedo

---

## 🎯 Resumen final

> **Firestore = CRUD sobre documentos JSON usando referencias, no relaciones.**

Esta guía sirve como base para cualquier app con Firebase + React / React Native.
