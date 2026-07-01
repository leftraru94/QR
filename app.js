window.addEventListener("DOMContentLoaded", () => {

    const qr = new Html5Qrcode("reader");

    function onScanSuccess(decodedText) {
        document.getElementById("resultado").innerHTML =
            "Código leído:<br><br>" + decodedText;
    }

    Html5Qrcode.getCameras().then(devices => {

        if (devices && devices.length) {

            const cameraId = devices[0].id;

            qr.start(
                cameraId,
                {
                    fps: 10,
                    qrbox: 250
                },
                onScanSuccess
            );

        } else {
            document.getElementById("resultado").innerHTML =
                "No se detectó cámara";
        }

    }).catch(err => {
        console.error(err);
        document.getElementById("resultado").innerHTML =
            "Error al acceder a la cámara";
    });

});
