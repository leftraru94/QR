// REEMPLAZA ESTA URL CON TU URL DE DESPLIEGUE DE APPS SCRIPT
const WEB_APP_URL = "TU_URL_DE_APPS_SCRIPT_AQUI";

document.getElementById('submitBtn').addEventListener('click', async () => {
    const lenguaje = document.getElementById('languageSelect').value;
    const codigo = document.getElementById('codeArea').value;

    if (!codigo.trim()) {
        showStatus("Por favor, ingresa algún código antes de enviar.", "error");
        return;
    }

    showStatus("Enviando...", "success");

    try {
        // Realizar la petición HTTP POST a la API de Apps Script
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Evita restricciones de CORS estrictas con redirecciones de Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lenguaje: lenguaje,
                codigo: codigo
            })
        });

        // Al usar 'no-cors' la respuesta es opaca, si no arroja error asumimos éxito
        showStatus("¡Código enviado con éxito!", "success");
        document.getElementById('codeArea').value = ""; // Limpia el editor de texto

    } catch (error) {
        console.error("Error:", error);
        showStatus("Hubo un error al intentar guardar el código.", "error");
    }
});

function showStatus(message, type) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.className = type;
    statusMessage.style.display = 'block';
}