// Ícono para cada característica que viene de Tokko ("Agua Corriente", "Pileta", ...).
// Se compara sin acentos ni mayúsculas; la primera regla que coincide gana. Si ninguna
// coincide, se usa un tilde. Los íconos son de Lucide (mismo trazo que src/components/Icono.astro).

import * as L from 'lucide-static';
import { quitarAcentos } from './text';

const REGLAS: [RegExp, string][] = [
  [/agua/, L.Droplet],
  [/aire acondicionado/, L.Snowflake],
  [/calefaccion|losa radiante|estufa|hogar a lena/, L.Heater],
  [/gas/, L.Flame],
  [/electricidad|luz electrica/, L.Zap],
  [/alumbrado|iluminacion/, L.Lightbulb],
  [/internet|wifi|fibra/, L.Wifi],
  [/telefono/, L.Phone],
  [/cable|tv|television/, L.Tv],
  [/tranquil/, L.Leaf],
  [/pavimento|cordon cuneta|asfalto/, L.Road],
  [/ruta|calle/, L.Signpost],
  [/quincho|parrilla|asador/, L.FlameKindling],
  [/cocina/, L.ChefHat],
  [/comedor/, L.Utensils],
  [/living|estar|hall/, L.Sofa],
  [/pileta|piscina/, L.Waves],
  [/jardin|parque|cesped|arbol/, L.Trees],
  [/patio|huerta/, L.Sprout],
  [/galeria/, L.Columns3],
  [/balcon|terraza/, L.Building],
  [/luminos/, L.Sun],
  [/vista/, L.Mountain],
  [/escritura|plano|apto credito/, L.FileCheck],
  [/barrio (cerrado|privado)/, L.Lock],
  [/seguridad|garita|porteria|rejas|alarma|camara/, L.ShieldCheck],
  [/porton|perimetral|cerramiento|cerco/, L.Fence],
  [/mascota/, L.PawPrint],
  [/cochera|garage|garaje|estacionamiento|garagista/, L.Car],
  [/lavadero/, L.WashingMachine],
  [/placard|vestidor/, L.Shirt],
  [/toilette|bano de servicio/, L.Toilet],
  [/bano/, L.Bath],
  [/dormitorio|suite/, L.Bed],
  [/escritorio|oficina/, L.Briefcase],
  [/ascensor/, L.ArrowUpDown],
  [/baulera|deposito/, L.Archive],
  [/comercial|local/, L.Store],
  [/alquilar|turismo|inversion|renta/, L.TrendingUp],
  [/construccion|a estrenar/, L.HardHat],
  [/independiente/, L.DoorOpen],
];

/** SVG del ícono listo para insertar (decorativo: el texto de la característica va al lado). */
export function iconoCaracteristica(nombre: string, tam = 20): string {
  const t = quitarAcentos(nombre).toLowerCase();
  return svgIcono(REGLAS.find(([re]) => re.test(t))?.[1] ?? L.Check, tam);
}

// Íconos de los datos principales de las tarjetas (dormitorios, baños, superficies, cochera)
export const ICONOS_DATOS = {
  dormitorios: L.BedDouble,
  banos: L.Bath,
  cubierta: L.House,
  terreno: L.LandPlot,
  cochera: L.Car,
};

export function svgIcono(svg: string, tam = 20): string {
  return svg
    .replace(/<!--.*?-->\s*/s, '')
    .replace(/width="24"/, `width="${tam}"`)
    .replace(/height="24"/, `height="${tam}" aria-hidden="true" focusable="false"`);
}
