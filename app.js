// Configuración inicial del canvas
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Ajuste del tamaño del canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuración de las estrellas (nodos) y relaciones
const stars = [];
const numNodes = 10; // Número de nodos principales (estrellas grandes)
const connections = [];

// Generar nodos principales con velocidad
for (let i = 0; i < numNodes; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 2, // Tamaño del nodo
    dx: Math.random() * 0.5 - 0.25, // Velocidad en x
    dy: Math.random() * 0.5 - 0.25, // Velocidad en y
  });
}

// Crear conexiones (relaciones) entre nodos
function calculateConnections() {
  connections.length = 0; // Limpiar conexiones previas
  stars.forEach((node, index) => {
    const relatedNodes = [];
    const numConnections = Math.floor(Math.random() * 4) + 2; // Cada nodo tiene 2-4 conexiones
    for (let i = 0; i < numConnections; i++) {
      const targetIndex = Math.floor(Math.random() * stars.length);
      if (targetIndex !== index && !relatedNodes.includes(targetIndex)) {
        relatedNodes.push(targetIndex);
      }
    }
    connections.push({ source: index, targets: relatedNodes });
  });
}

calculateConnections(); // Inicializar las conexiones

// Dibujar el fondo, nodos y relaciones
function drawBackground() {
  // Fondo azul marino oscuro
  ctx.fillStyle = "#001a33";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dibujar relaciones (líneas)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 1;
  connections.forEach((connection) => {
    const source = stars[connection.source];
    connection.targets.forEach((targetIndex) => {
      const target = stars[targetIndex];
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    });
  });

  // Dibujar nodos principales (estrellas grandes)
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fill();
  });
}

// Actualizar posición de las estrellas
function updatePositions() {
  stars.forEach((star) => {
    // Actualizar posición
    star.x += star.dx;
    star.y += star.dy;

    // Rebotar en los bordes
    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });
}

// Ajustar el canvas al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Regenerar nodos y conexiones
  stars.length = 0;
  for (let i = 0; i < numNodes; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2,
      dx: Math.random() * 0.5 - 0.25,
      dy: Math.random() * 0.5 - 0.25,
    });
  }
  calculateConnections();
});

// Ejecutar la animación
function animate() {
  drawBackground();
  updatePositions();
  requestAnimationFrame(animate);
}

// Iniciar la animación
animate();
