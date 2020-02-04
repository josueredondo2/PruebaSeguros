import swal from 'sweetalert2';


export default class Mensajes {


    static advertencia(texto) {
        swal.fire({ title: 'Advertencia', text: texto, icon: 'warning' });
    }
    static error(texto) {
        swal.fire({ title: 'Error', text: texto, icon: 'error' });
    }

    static exitoso(texto) {
        swal.fire({ title: 'Exitoso', text: texto, icon: 'success' });
    }

 
    static informativo(texto) {
        swal.fire({ title: 'Informativo', text: texto, icon: 'info' });
    }

  
    static async confirmacion(titulo, texto, textoBotonConfirmacion)
    {
        const result = await swal.fire({
            title: titulo,
            text: texto,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: textoBotonConfirmacion
        });
        return result.value;
    }
}