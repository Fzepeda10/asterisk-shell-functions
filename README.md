# **Asterisk Shell Functions**

## **Autor**

* Fernando Enrique Zepeda Castellanos.
* Juan Manuel Salazar Castro.

## **Requisitos**

### En Windows

1. Ejecutar el siguiente comando:

    >ssh-keygen

2. Acceder al directorio `C:\Users\<USUARIO>\.ssh`.

3. Copiar la cadena dentro del archivo `id_rsa.pub`.

4. Pegar la cadena en el servidor linux deseado en la siguiente ruta: `/root/.ssh/authorized_keys`  (utilizando Vim, Vi, Nano).

    >nano /root/.ssh/authorized_keys

5. Iniciar una terminal `CMD, Bash, Powershell` y ejecutar el siguiente comando remplazando `server` por la direccion ip de tu servidor:

    >ssh root@server uname -u

## **Funcionamiento**

### **Directo sobre la funcion**

Para la ejecucion correcta de las funciones, las funciones deberan de tener la siguiente sintaxis.
**Unicamente deberá ser utilizado el string vacio al estar en producción**

~~~js
function obtenerAgente("Nombre","ssh root@server");
~~~

### **Variables de entorno**

Para ejecutar correctamente las funciones, dentro del archivo `.env` de tu proyecto incluir la siguiente linea en caso de que tu conexion sea remota.

~~~sh
SSH = "ssh root@server"
~~~
