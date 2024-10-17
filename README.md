# T&T - Test

Esta aplicación tiene como objetivo simular un portal web que permite a usuarios administradores 
crear enventos, para que usuarios en general puedan registarse, loguearse e inscribirse en los eventos y/o dejar sus comentarios sobre ellos. 


## Arquitectura

Usa una arquitectura REST que se basa en el protocolo HTTP para el tráfico de información entre dos servicios, el backend creado con django-rest-framework y el frontend creado con react y Tailwind CSS.

## Instalación y configuración 

Para poner en marcha los dos servicios debemos ejecutar los siguientes comandos en sus respectivas rutas:

### Backend
    
* Crear entorno virtual: `python3 -m venv .venv`
* Activar entorno: `source .venv/bin/activate` (linux)
* Activar entorno: `.venv\Scripts\activate` (windows)
* Instalar módulos: `pip install -r requirements.txt`
* Crear migraciones: `python manage.py makemigrations`
* Aplicar migraciones: `python manage.py migrate`
* Crear superusuario: `python3 manage.py createsuperuser`
* Lanzar servicio: `python manage.py runserver`

### Frontend

* Instalar Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
* Inicializar Tailwind CSS: `npx tailwindcss init`
* Instalar plugging de Tailwind CSS: `npm install -D @tailwindcss/forms`
* Lanzar servicio: `npm run start`