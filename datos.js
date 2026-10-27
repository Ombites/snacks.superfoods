/* ===================================================================
   OM.BITES — datos.js  (FUENTE ÚNICA de precios, packs y nutrición)
   Para cambiar un precio o un valor nutricional, edita SOLO este archivo.
   Precios: PRECIOS_VIGENTES_OMBITES_OCT2026.xlsx (S/, IGV incluido).
   Nutrición: "Cantidades y tabla nutricional OMBITES.xlsx" (barras y Shanti,
   por 100 g) y "BITES_tabla_nutricional.xlsx" (Bites). Valores referenciales
   calculados con tablas USDA; para etiqueta comercial, análisis de laboratorio.
   porc = por barra/porción entera; bite = por bite; p100 = por 100 g.
   Claves: kcal, grasa, sat, trans (g) · col, sod (mg) · carb, fibra, azuc, prot (g)
   =================================================================== */
window.OMBITES = {
 "whatsapp": "51920316693",
 "actualizado": "2026-10-27",
 "precios": {
  "prana": 12,
  "mantra": 12,
  "sutra": 15.5,
  "aura": 15.5,
  "shanti-fresa": 15.5,
  "shanti-mango": 15.5,
  "shanti-lucuma": 15.5
 },
 "packs3": {
  "prana": 34,
  "mantra": 34,
  "sutra": 43,
  "aura": 43,
  "shanti-fresa": 43,
  "shanti-mango": 43,
  "shanti-lucuma": 43
 },
 "cajas": [
  {
   "id": "caja-6c",
   "nombre": "6 clásicos",
   "precio": 37
  },
  {
   "id": "caja-4c2p",
   "nombre": "4 clásicos + 2 premium",
   "precio": 44
  },
  {
   "id": "caja-3c3p",
   "nombre": "3 clásicos + 3 premium",
   "precio": 47
  },
  {
   "id": "caja-2c4p",
   "nombre": "2 clásicos + 4 premium",
   "precio": 50
  },
  {
   "id": "caja-6p",
   "nombre": "6 premium",
   "precio": 57
  }
 ],
 "items": [
  {
   "id": "prana",
   "nombre": "PRANA",
   "img": "images/prana.webp",
   "grupo": "Barras"
  },
  {
   "id": "mantra",
   "nombre": "MANTRA",
   "img": "images/mantra.webp",
   "grupo": "Barras"
  },
  {
   "id": "aura",
   "nombre": "AURA",
   "img": "images/aura.webp",
   "grupo": "Barras"
  },
  {
   "id": "sutra",
   "nombre": "SUTRA",
   "img": "images/sutra.webp",
   "grupo": "Barras"
  },
  {
   "id": "shanti-fresa",
   "nombre": "SHANTI FRESA",
   "img": "images/shanti.webp",
   "grupo": "Línea Shanti"
  },
  {
   "id": "shanti-mango",
   "nombre": "SHANTI MANGO",
   "img": "images/shanti-mango.webp",
   "grupo": "Línea Shanti"
  },
  {
   "id": "shanti-lucuma",
   "nombre": "SHANTI LÚCUMA",
   "img": "images/shanti-lucuma.webp",
   "grupo": "Línea Shanti"
  },
  {
   "id": "caja-6c",
   "nombre": "CAJA BITES · 6 clásicos",
   "img": "images/bite-prana.webp",
   "grupo": "Cajas Bites x6"
  },
  {
   "id": "caja-4c2p",
   "nombre": "CAJA BITES · 4 clásicos + 2 premium",
   "img": "images/bite-mantra.webp",
   "grupo": "Cajas Bites x6"
  },
  {
   "id": "caja-3c3p",
   "nombre": "CAJA BITES · 3 clásicos + 3 premium",
   "img": "images/bite-sutra.webp",
   "grupo": "Cajas Bites x6"
  },
  {
   "id": "caja-2c4p",
   "nombre": "CAJA BITES · 2 clásicos + 4 premium",
   "img": "images/bite-aura.webp",
   "grupo": "Cajas Bites x6"
  },
  {
   "id": "caja-6p",
   "nombre": "CAJA BITES · 6 premium",
   "img": "images/bite-aura.webp",
   "grupo": "Cajas Bites x6"
  }
 ],
 "nutricion": {
  "mantra": {
   "porcion": 150,
   "p100": {
    "kcal": 427.0,
    "grasa": 21.2,
    "sat": 5.0,
    "trans": 0.0,
    "col": 0.0,
    "sod": 15.0,
    "carb": 49.6,
    "fibra": 8.5,
    "azuc": 24.5,
    "prot": 13.8
   },
   "porc": {
    "kcal": 641.0,
    "grasa": 31.8,
    "sat": 7.5,
    "trans": 0.0,
    "col": 0.0,
    "sod": 23.0,
    "carb": 74.4,
    "fibra": 12.8,
    "azuc": 36.8,
    "prot": 20.7
   },
   "bite": {
    "kcal": 308.0,
    "grasa": 15.6,
    "sat": 3.6,
    "trans": 0.0,
    "col": 0.0,
    "sod": 10.0,
    "carb": 36.1,
    "fibra": 6.0,
    "azuc": 17.1,
    "prot": 8.8
   },
   "tipo": "barra"
  },
  "prana": {
   "porcion": 150,
   "p100": {
    "kcal": 428.0,
    "grasa": 20.7,
    "sat": 4.9,
    "trans": 0.0,
    "col": 0.0,
    "sod": 15.0,
    "carb": 53.3,
    "fibra": 7.7,
    "azuc": 29.4,
    "prot": 13.4
   },
   "porc": {
    "kcal": 642.0,
    "grasa": 31.1,
    "sat": 7.4,
    "trans": 0.0,
    "col": 0.0,
    "sod": 23.0,
    "carb": 80.0,
    "fibra": 11.6,
    "azuc": 44.1,
    "prot": 20.1
   },
   "bite": {
    "kcal": 332.0,
    "grasa": 15.7,
    "sat": 3.5,
    "trans": 0.0,
    "col": 0.0,
    "sod": 12.0,
    "carb": 41.2,
    "fibra": 6.2,
    "azuc": 18.5,
    "prot": 9.6
   },
   "tipo": "barra"
  },
  "sutra": {
   "porcion": 140,
   "p100": {
    "kcal": 405.0,
    "grasa": 17.0,
    "sat": 4.0,
    "trans": 0.0,
    "col": 0.0,
    "sod": 5.0,
    "carb": 56.0,
    "fibra": 9.0,
    "azuc": 26.3,
    "prot": 11.6
   },
   "porc": {
    "kcal": 567.0,
    "grasa": 23.8,
    "sat": 5.6,
    "trans": 0.0,
    "col": 0.0,
    "sod": 7.0,
    "carb": 78.4,
    "fibra": 12.6,
    "azuc": 36.8,
    "prot": 16.2
   },
   "bite": {
    "kcal": 341.0,
    "grasa": 15.2,
    "sat": 3.9,
    "trans": 0.0,
    "col": 0.0,
    "sod": 14.0,
    "carb": 46.4,
    "fibra": 7.5,
    "azuc": 25.2,
    "prot": 8.3
   },
   "tipo": "barra"
  },
  "aura": {
   "porcion": 215,
   "p100": {
    "kcal": 405.0,
    "grasa": 19.5,
    "sat": 4.5,
    "trans": 0.0,
    "col": 0.0,
    "sod": 10.0,
    "carb": 49.1,
    "fibra": 8.1,
    "azuc": 26.2,
    "prot": 12.6
   },
   "porc": {
    "kcal": 871.0,
    "grasa": 41.9,
    "sat": 9.7,
    "trans": 0.0,
    "col": 0.0,
    "sod": 22.0,
    "carb": 105.6,
    "fibra": 17.4,
    "azuc": 56.3,
    "prot": 27.1
   },
   "bite": {
    "kcal": 411.0,
    "grasa": 18.9,
    "sat": 4.9,
    "trans": 0.0,
    "col": 0.0,
    "sod": 16.0,
    "carb": 54.3,
    "fibra": 9.6,
    "azuc": 27.7,
    "prot": 10.5
   },
   "tipo": "barra"
  },
  "shanti-fresa": {
   "porcion": 175,
   "p100": {
    "kcal": 427.0,
    "grasa": 25.9,
    "sat": 3.1,
    "trans": 0.0,
    "col": 2.0,
    "sod": 28.0,
    "carb": 36.5,
    "fibra": 6.4,
    "azuc": 23.1,
    "prot": 19.1
   },
   "porc": {
    "kcal": 747.0,
    "grasa": 45.3,
    "sat": 5.4,
    "trans": 0.0,
    "col": 4.0,
    "sod": 49.0,
    "carb": 63.9,
    "fibra": 11.2,
    "azuc": 40.4,
    "prot": 33.4
   },
   "tipo": "shanti"
  },
  "shanti-lucuma": {
   "porcion": 175,
   "p100": {
    "kcal": 358.0,
    "grasa": 21.7,
    "sat": 3.2,
    "trans": 0.0,
    "col": 2.0,
    "sod": 23.0,
    "carb": 30.1,
    "fibra": 6.0,
    "azuc": 17.1,
    "prot": 16.1
   },
   "porc": {
    "kcal": 627.0,
    "grasa": 38.0,
    "sat": 5.6,
    "trans": 0.0,
    "col": 4.0,
    "sod": 40.0,
    "carb": 52.7,
    "fibra": 10.5,
    "azuc": 29.9,
    "prot": 28.2
   },
   "tipo": "shanti"
  },
  "shanti-mango": {
   "porcion": 175,
   "p100": {
    "kcal": 349.0,
    "grasa": 21.7,
    "sat": 3.2,
    "trans": 0.0,
    "col": 2.0,
    "sod": 22.0,
    "carb": 27.8,
    "fibra": 5.5,
    "azuc": 17.7,
    "prot": 15.8
   },
   "porc": {
    "kcal": 611.0,
    "grasa": 38.0,
    "sat": 5.6,
    "trans": 0.0,
    "col": 4.0,
    "sod": 39.0,
    "carb": 48.7,
    "fibra": 9.6,
    "azuc": 31.0,
    "prot": 27.7
   },
   "tipo": "shanti"
  }
 }
};
