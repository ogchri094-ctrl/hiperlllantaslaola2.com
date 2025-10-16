// Fecha mínima
const fechaInput = document.getElementById('fecha');
fechaInput.min = new Date().toISOString().split('T')[0];

// Aviso flotante
const aviso = document.createElement('div');
aviso.classList.add('aviso-flotante');
document.body.appendChild(aviso);
function mostrarAviso(texto,color='#0d6efd'){ aviso.textContent=texto; aviso.style.background=color; aviso.classList.add('mostrar'); setTimeout(()=>aviso.classList.remove('mostrar'),1800); }

// Selección de servicios
const tarjetas = document.querySelectorAll('.tarjeta');
let servicios=[];
tarjetas.forEach(t=>{
  t.addEventListener('click',()=>{
    const serv=t.dataset.servicio;
    t.classList.toggle('active');
    if(t.classList.contains('active')){ servicios.push(serv); mostrarAviso(`✅ ${serv} agregado`); }
    else{ servicios=servicios.filter(s=>s!==serv); mostrarAviso(`❌ ${serv} quitado`,'#999'); }
  });
});

// Preview fotos
const fotosInput = document.getElementById('fotos-auto');
const preview = document.getElementById('preview');
fotosInput.addEventListener('change',()=>{
  preview.innerHTML='';
  Array.from(fotosInput.files).forEach(file=>{
    const reader=new FileReader();
    reader.onload=e=>{
      const img=document.createElement('img');
      img.src=e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Enviar WhatsApp
document.getElementById("formAgenda").addEventListener("submit",function(e){
  e.preventDefault();
  const nombre=document.getElementById("nombre").value.trim();
  const sucursal=document.getElementById("sucursal").value;
  const fecha=document.getElementById("fecha").value;
  const hora=document.getElementById("hora").value;
  const extras=Array.from(document.querySelectorAll(".extras-list input:checked")).map(e=>e.value);

  if(!nombre||!sucursal||!fecha||!hora){ mostrarAviso("⚠️ Completa todos los campos obligatorios","#ff4a57"); return; }

  const mensaje=`*AGENDAR SERVICIO*\n\n👤 *Nombre:* ${nombre}\n🏢 *Sucursal:* ${sucursal}\n🛠️ *Servicios:* ${servicios.join(", ")||"Ninguno"}\n📅 *Fecha:* ${fecha}\n⏰ *Hora:* ${hora}\n🔧 *Extras:* ${extras.join(", ")||"Ninguno"}`;
  const numeroWhatsApp="5620287619";
  const url=`https://wa.me/52${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url,"_blank");
  mostrarAviso("✅ Preparando mensaje para WhatsApp","#25D366");

  // Resumen
  const resumen=document.getElementById('resumen');
  const detalles=document.getElementById('detalles-cita');
  detalles.innerHTML=`<b>Sucursal:</b> ${sucursal}<br><b>Servicios:</b> ${servicios.join(', ')||'Ninguno'}<br><b>Extras:</b> ${extras.join(', ')||'Ninguno'}<br><b>Fecha:</b> ${fecha}<br><b>Hora:</b> ${hora}<br><b>Fotos:</b> ${fotosInput.files.length?fotosInput.files.length+' foto(s)':'Sin fotos'}<br><i>Se abrirá WhatsApp con los datos listos para enviar.</i>`;
  resumen.style.display='block';

  // Reset
  document.getElementById("formAgenda").reset();
  servicios=[];
  tarjetas.forEach(t=>t.classList.remove('active'));
  preview.innerHTML='';
});
