# 📌 VE Divisas 🇻🇪

## 📑 Tabla de Contenido
- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación y Construcción](#ℹ️-instalación-y-construcción)
- [Uso](#-uso)
- [Problemas](#problemas)
- [Licencia](#-licencia)
- [Autor](#%EF%B8%8F-autor)

## 📜 Descripción
**VE Divisas** es un moderno widget financiero de escritorio construido sobre Electron.js. Permite visualizar en tiempo real y desde la comodidad de tu escritorio las tasas oficiales del **Dólar y Euro (BCV)**, así como el precio promedio del **USDT (Binance P2P)** en Bolívares (VES). 

Posee una interfaz vanguardista estilo "Glassmorphism", totalmente transparente y con sutiles acentos neón, diseñada para no interrumpir tu flujo de trabajo.

## 🎯 Características

- Generación de precios en tiempo real utilizando Web Scraping y API's públicas.
- Interfaz moderna, semitransparente ("Glassmorphism") sin bordes de ventana.
- Integración directa con el portal del Banco Central de Venezuela (BCV).
- Cálculo en base al mercado libre de Binance P2P.
- Código limpio, ligero y modular utilizando IPC de Electron para máxima seguridad.

## 💻 Tecnologías Utilizadas
<div>

[![Electron.js](https://img.shields.io/badge/Electron-191970?logo=electron&logoColor=white&style=for-the-badge)](https://www.electronjs.org/) &nbsp;
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) &nbsp;
[![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)](https://axios-http.com/) &nbsp;
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff&style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/CSS) &nbsp;

</div>

## ℹ️ Instalación y Construcción

Para ejecutar este proyecto en tu entorno local o compilar los ejecutables de Windows y Linux, asegúrate de tener Node.js instalado y sigue estos pasos:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm start
   ```

### 🛠️ Crear Instaladores

Gracias a `electron-builder`, generar versiones empaquetadas es muy sencillo. Los instaladores compilados se guardarán automáticamente en la carpeta `dist/`.

- **Para crear el instalador de Windows (.exe):**
  ```bash
  npm run build:win
  ```

- **Para crear el ejecutable de Linux (.AppImage):**
  ```bash
  npm run build:linux
  ```

<br/>

## 👉 Uso

1. Ejecuta la aplicación.
2. Los precios se obtendrán y cargarán automáticamente al abrir la ventana.
3. Puedes hacer clic en el botón inferior de **Actualizar precios** para hacer un *refresh* en tiempo real.
4. Puedes arrastrar la aplicación manteniendo presionado el clic sobre cualquier área vacía.
5. Cierra la aplicación desde el botón redondo con la 'X' en la cabecera.

## ❗Problemas
Si experimentas errores de "Error BCV" es probable que la página oficial del banco se encuentre temporalmente inactiva o sufriendo problemas de conexión. Si notas fallos continuos, puede que el diseño de la web fuente haya cambiado. 

Asegúrate de revisar la consola (DevTools) de Electron para identificar problemas.

## 📝 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

## 🖋️ Autor

- [Carlos Cantero](https://github.com/carloscantero11)
