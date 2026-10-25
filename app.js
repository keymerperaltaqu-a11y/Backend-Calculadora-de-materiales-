const API_URL = '/api/calculos';

// Guardar historial en la base de datos JSON mediante Fetch
async function guardarEnBackend(modulo, detalles) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: new Date().toLocaleString(),
        modulo: modulo,
        detalles: detalles
      })
    });
  } catch (error) {
    console.error('Error al guardar calculo:', error);
  }
}

// 1. Cálculo Muro
function calcularMuro() {
  const largo = parseFloat(document.getElementById('muro-largo').value) || 0;
  const alto = parseFloat(document.getElementById('muro-alto').value) || 0;
  const superficie = (largo * alto).toFixed(2);

  const cemento = (superficie * 15.20).toFixed(2);
  const arena = (superficie * 0.115).toFixed(3);
  const ladrillos = Math.ceil(superficie * 120);

  const resDiv = document.getElementById('res-muro');
  resDiv.innerHTML = `
    <h4>Tarjeta de salida</h4>
    <p>Superficie total: ${superficie} m²</p>
    <p>Cemento: ${cemento} kg</p>
    <p>Arena: ${arena} m³</p>
    <p>Ladrillos: ${ladrillos} unidades</p>
  `;

  guardarEnBackend('Muro de Ladrillo', { superficie, cemento, arena, ladrillos });
}

// 2. Cálculo Viga
function calcularViga() {
  const largo = parseFloat(document.getElementById('viga-largo').value) || 0;
  const cemento = (largo * 9.00).toFixed(2);
  const arena = (largo * 0.02).toFixed(3);
  const piedra = (largo * 0.02).toFixed(3);
  const hierro = (largo * 4.00).toFixed(2);

  const resDiv = document.getElementById('res-viga');
  resDiv.innerHTML = `
    <h4>Tarjeta de salida</h4>
    <p>Cemento: ${cemento} kg | Arena: ${arena} m³</p>
    <p>Piedra: ${piedra} m³ | Hierro 8: ${hierro} m</p>
  `;

  guardarEnBackend('Viga de Hormigón', { largo, cemento, arena, piedra, hierro });
}

// 3. Cálculo Columna
function calcularColumna() {
  const largo = parseFloat(document.getElementById('col-largo').value) || 0;
  const cemento = (largo * 7.50).toFixed(2);
  const arena = (largo * 0.016).toFixed(3);
  const piedra = (largo * 0.016).toFixed(3);
  const hierro = (largo * 6.00).toFixed(2);

  const resDiv = document.getElementById('res-columna');
  resDiv.innerHTML = `
    <h4>Tarjeta de salida</h4>
    <p>Cemento: ${cemento} kg | Arena: ${arena} m³</p>
    <p>Piedra: ${piedra} m³ | Hierro 10: ${hierro} m</p>
  `;

  guardarEnBackend('Columna de Hormigón', { largo, cemento, arena, piedra, hierro });
}

// 4. Cálculo Contrapiso
function calcularContrapiso() {
  const espesor = parseFloat(document.getElementById('contra-espesor').value) || 0;
  const ancho = parseFloat(document.getElementById('contra-ancho').value) || 0;
  const largo = parseFloat(document.getElementById('contra-largo').value) || 0;
  
  const volumen = (espesor * ancho * largo).toFixed(2);
  const cemento = (volumen * 105.00).toFixed(2);
  const arena = (volumen * 0.45).toFixed(3);

  const resDiv = document.getElementById('res-contrapiso');
  resDiv.innerHTML = `
    <h4>Tarjeta de salida</h4>
    <p>Volumen total: ${volumen} m³</p>
    <p>Cemento: ${cemento} kg | Arena: ${arena} m³</p>
  `;

  guardarEnBackend('Contrapiso', { volumen, cemento, arena });
}

// 5. Cálculo Techo
function calcularTecho() {
  const ancho = parseFloat(document.getElementById('techo-ancho').value) || 0;
  const largo = parseFloat(document.getElementById('techo-largo').value) || 0;
  
  const superficie = (ancho * largo).toFixed(2);
  const cemento = (superficie * 33.00).toFixed(2);
  const hierro = (superficie * 7.00).toFixed(2);

  const resDiv = document.getElementById('res-techo');
  resDiv.innerHTML = `
    <h4>Tarjeta de salida</h4>
    <p>Superficie total: ${superficie} m²</p>
    <p>Cemento: ${cemento} kg | Hierro 8: ${hierro} m</p>
  `;

  guardarEnBackend('Techo', { superficie, cemento, hierro });
}

// 6. Cálculo Pisos
function calcularPisos() {
  const ancho = parseFloat(document.getElementById('pisos-ancho').value) || 0;
  const largo = parseFloat(document.getElementById('pisos-largo').value) || 0;
  
  const neta = (ancho * largo).toFixed(2);
  const total = (neta * 1.10).toFixed(2);

  const resDiv = document.getElementById('res-pisos');
  resDiv.innerHTML = `
    <h4>Tarjeta de salida</h4>
    <p>Superficie neta: ${neta} m²</p>
    <p>Superficie total (+10% recortes): ${total} m²</p>
  `;

  guardarEnBackend('Pisos', { neta, total });
}

// 7. Cálculo Pintura
function calcularPintura() {
  const m2 = parseFloat(document.getElementById('pintura-m2').value) || 0;
  const litros = (m2 / 6.0).toFixed(2);

  const resDiv = document.getElementById('res-pintura');
  resDiv.innerHTML = `
    <h4>Tarjeta de salida</h4>
    <p>Superficie a pintar: ${m2.toFixed(2)} m²</p>
    <p>Pintura requerida: ${litros} Litro(s)</p>
  `;

  guardarEnBackend('Pintura', { m2, litros });
}