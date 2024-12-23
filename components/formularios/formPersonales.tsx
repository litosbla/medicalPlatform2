
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    RadioGroup,
    RadioGroupItem
  } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"


const colombiaRegions = {
  "Amazonas": [
    "El Encanto",
    "La Chorrera",
    "La Pedrera",
    "La Victoria",
    "Leticia",
    "Miriti Paraná",
    "Puerto Alegría",
    "Puerto Arica",
    "Puerto Nariño",
    "Puerto Santander",
    "Tarapacá"
  ],
  "Antioquia": [
    "Abejorral",
    "Abriaquí",
    "Alejandría",
    "Amagá",
    "Amalfi",
    "Andes",
    "Angelópolis",
    "Angostura",
    "Anorí",
    "Anza",
    "Apartadó",
    "Arboletes",
    "Argelia",
    "Armenia",
    "Barbosa",
    "Bello",
    "Belmira",
    "Betania",
    "Betulia",
    "Briceño",
    "Buriticá",
    "Caicedo",
    "Caldas",
    "Campamento",
    "Caracolí",
    "Caramanta",
    "Carepa",
    "Carolina",
    "Caucasia",
    "Cañasgordas",
    "Chigorodó",
    "Cisneros",
    "Ciudad Bolívar",
    "Cocorná",
    "Concepción",
    "Concordia",
    "Copacabana",
    "Cáceres",
    "Dabeiba",
    "Don Matías",
    "Ebéjico",
    "El Bagre",
    "El Carmen de Viboral",
    "El Santuario",
    "Entrerrios",
    "Envigado",
    "Fredonia",
    "Frontino",
    "Giraldo",
    "Girardota",
    "Granada",
    "Guadalupe",
    "Guarne",
    "Guatapé",
    "Gómez Plata",
    "Heliconia",
    "Hispania",
    "Itagui",
    "Ituango",
    "Jardín",
    "Jericó",
    "La Ceja",
    "La Estrella",
    "La Pintada",
    "La Unión",
    "Liborina",
    "Maceo",
    "Marinilla",
    "Medellín",
    "Montebello",
    "Murindó",
    "Mutatá",
    "Nariño",
    "Nechí",
    "Necoclí",
    "Olaya",
    "Peque",
    "Peñol",
    "Pueblorrico",
    "Puerto Berrío",
    "Puerto Nare",
    "Puerto Triunfo",
    "Remedios",
    "Retiro",
    "Rionegro",
    "Sabanalarga",
    "Sabaneta",
    "Salgar",
    "San Andrés de Cuerquía",
    "San Carlos",
    "San Francisco",
    "San Jerónimo",
    "San José de La Montaña",
    "San Juan de Urabá",
    "San Luis",
    "San Pedro",
    "San Pedro de Uraba",
    "San Rafael",
    "San Roque",
    "San Vicente",
    "Santa Bárbara",
    "Santa Rosa de Osos",
    "Santafé de Antioquia",
    "Santo Domingo",
    "Segovia",
    "Sonsón",
    "Sopetrán",
    "Tarazá",
    "Tarso",
    "Titiribí",
    "Toledo",
    "Turbo",
    "Támesis",
    "Uramita",
    "Urrao",
    "Valdivia",
    "Valparaíso",
    "Vegachí",
    "Venecia",
    "Vigía del Fuerte",
    "Yalí",
    "Yarumal",
    "Yolombó",
    "Yondó",
    "Zaragoza"
  ],
  "Arauca": [
    "Arauca",
    "Arauquita",
    "Cravo Norte",
    "Fortul",
    "Puerto Rondón",
    "Saravena",
    "Tame"
  ],
  "Archipiélago de San Andrés, Providencia y Santa Catalina": [
    "Providencia",
    "San Andrés"
  ],
  "Atlántico": [
    "Baranoa",
    "Barranquilla",
    "Campo de La Cruz",
    "Candelaria",
    "Galapa",
    "Juan de Acosta",
    "Luruaco",
    "Malambo",
    "Manatí",
    "Palmar de Varela",
    "Piojó",
    "Polonuevo",
    "Ponedera",
    "Puerto Colombia",
    "Repelón",
    "Sabanagrande",
    "Sabanalarga",
    "Santa Lucía",
    "Santo Tomás",
    "Soledad",
    "Suan",
    "Tubará",
    "Usiacurí"
  ],
  "Bogotá D.C.": [
    "Bogotá D.C."
  ],
  "Bolívar": [
    "Achí",
    "Altos del Rosario",
    "Arenal",
    "Arjona",
    "Arroyohondo",
    "Barranco de Loba",
    "Calamar",
    "Cantagallo",
    "Cartagena",
    "Cicuco",
    "Clemencia",
    "Córdoba",
    "El Carmen de Bolívar",
    "El Guamo",
    "El Peñón",
    "Hatillo de Loba",
    "Magangué",
    "Mahates",
    "Margarita",
    "María la Baja",
    "Mompós",
    "Montecristo",
    "Morales",
    "Norosí",
    "Pinillos",
    "Regidor",
    "Río Viejo",
    "San Cristóbal",
    "San Estanislao",
    "San Fernando",
    "San Jacinto",
    "San Jacinto del Cauca",
    "San Juan Nepomuceno",
    "San Martín de Loba",
    "San Pablo de Borbur",
    "Santa Catalina",
    "Santa Rosa",
    "Santa Rosa del Sur",
    "Simití",
    "Soplaviento",
    "Talaigua Nuevo",
    "Tiquisio",
    "Turbaco",
    "Turbaná",
    "Villanueva",
    "Zambrano"
  ],
  "Boyacá": [
    "Almeida",
    "Aquitania",
    "Arcabuco",
    "Belén",
    "Berbeo",
    "Betéitiva",
    "Boavita",
    "Boyacá",
    "Briceño",
    "Buena Vista",
    "Busbanzá",
    "Caldas",
    "Campohermoso",
    "Cerinza",
    "Chinavita",
    "Chiquinquirá",
    "Chiscas",
    "Chita",
    "Chitaraque",
    "Chivatá",
    "Chivor",
    "Chíquiza",
    "Ciénega",
    "Coper",
    "Corrales",
    "Covarachía",
    "Cubará",
    "Cucaita",
    "Cuítiva",
    "Cómbita",
    "Duitama",
    "El Cocuy",
    "El Espino",
    "Firavitoba",
    "Floresta",
    "Gachantivá",
    "Gameza",
    "Garagoa",
    "Guacamayas",
    "Guateque",
    "Guayatá",
    "Güicán",
    "Iza",
    "Jenesano",
    "Jericó",
    "La Capilla",
    "La Uvita",
    "La Victoria",
    "Labranzagrande",
    "Macanal",
    "Maripí",
    "Miraflores",
    "Mongua",
    "Monguí",
    "Moniquirá",
    "Motavita",
    "Muzo",
    "Nobsa",
    "Nuevo Colón",
    "Oicatá",
    "Otanche",
    "Pachavita",
    "Paipa",
    "Pajarito",
    "Panqueba",
    "Pauna",
    "Paya",
    "Paz de Río",
    "Pesca",
    "Pisba",
    "Puerto Boyacá",
    "Páez",
    "Quípama",
    "Ramiriquí",
    "Rondón",
    "Ráquira",
    "Saboyá",
    "Samacá",
    "San Eduardo",
    "San José de Pare",
    "San Luis de Gaceno",
    "San Mateo",
    "San Miguel de Sema",
    "San Pablo de Borbur",
    "Santa María",
    "Santa Rosa de Viterbo",
    "Santa Sofía",
    "Santana",
    "Sativanorte",
    "Sativasur",
    "Siachoque",
    "Soatá",
    "Socha",
    "Socotá",
    "Sogamoso",
    "Somondoco",
    "Sora",
    "Soracá",
    "Sotaquirá",
    "Susacón",
    "Sutamarchán",
    "Sutatenza",
    "Sáchica",
    "Tasco",
    "Tenza",
    "Tibaná",
    "Tibasosa",
    "Tinjacá",
    "Tipacoque",
    "Toca",
    "Togüí",
    "Tota",
    "Tunja",
    "Tununguá",
    "Turmequé",
    "Tuta",
    "Tutazá",
    "Tópaga",
    "Umbita",
    "Ventaquemada",
    "Villa de Leyva",
    "Viracachá",
    "Zetaquira"
  ],
  "Caldas": [
    "Aguadas",
    "Anserma",
    "Aranzazu",
    "Belalcázar",
    "Chinchiná",
    "Filadelfia",
    "La Dorada",
    "La Merced",
    "Manizales",
    "Manzanares",
    "Marmato",
    "Marquetalia",
    "Marulanda",
    "Neira",
    "Norcasia",
    "Palestina",
    "Pensilvania",
    "Pácora",
    "Riosucio",
    "Risaralda",
    "Salamina",
    "Samaná",
    "San José",
    "Supía",
    "Victoria",
    "Villamaría",
    "Viterbo"
  ],
  "Caquetá": [
    "Albania",
    "Belén de Los Andaquies",
    "Cartagena del Chairá",
    "Curillo",
    "El Doncello",
    "El Paujil",
    "Florencia",
    "La Montañita",
    "Milán",
    "Morelia",
    "Puerto Rico",
    "San José del Fragua",
    "San Vicente del Caguán",
    "Solano",
    "Solita",
    "Valparaíso"
  ],
  "Casanare": [
    "Aguazul",
    "Chámeza",
    "Hato Corozal",
    "La Salina",
    "Maní",
    "Monterrey",
    "Nunchía",
    "Orocué",
    "Paz de Ariporo",
    "Pore",
    "Recetor",
    "Sabanalarga",
    "San Luis de Gaceno",
    "Sácama",
    "Tauramena",
    "Trinidad",
    "Támara",
    "Villanueva",
    "Yopal"
  ],
  "Cauca": [
    "Almaguer",
    "Argelia",
    "Balboa",
    "Bolívar",
    "Buenos Aires",
    "Cajibío",
    "Caldono",
    "Caloto",
    "Corinto",
    "El Tambo",
    "Florencia",
    "Guachené",
    "Guapi",
    "Inzá",
    "Jambaló",
    "La Sierra",
    "La Vega",
    "López",
    "Mercaderes",
    "Miranda",
    "Morales",
    "Padilla",
    "Patía",
    "Piamonte",
    "Piendamó",
    "Popayán",
    "Puerto Tejada",
    "Puracé",
    "Páez",
    "Rosas",
    "San Sebastián",
    "Santa Rosa",
    "Santander de Quilichao",
    "Silvia",
    "Sotara",
    "Sucre",
    "Suárez",
    "Timbiquí",
    "Timbío",
    "Toribio",
    "Totoró",
    "Villa Rica"
  ],
  "Cesar": [
    "Aguachica",
    "Agustín Codazzi",
    "Astrea",
    "Becerril",
    "Bosconia",
    "Chimichagua",
    "Chiriguaná",
    "Curumaní",
    "El Copey",
    "El Paso",
    "Gamarra",
    "González",
    "La Gloria",
    "La Jagua de Ibirico",
    "La Paz",
    "Manaure",
    "Pailitas",
    "Pelaya",
    "Pueblo Bello",
    "Río de Oro",
    "San Alberto",
    "San Diego",
    "San Martín",
    "Tamalameque",
    "Valledupar"
  ],
  "Chocó": [
    "Acandí",
    "Alto Baudo",
    "Atrato",
    "Bagadó",
    "Bahía Solano",
    "Bajo Baudó",
    "Belén de Bajira",
    "Bojaya",
    "Carmen del Darien",
    "Condoto",
    "Cértegui",
    "El Cantón del San Pablo",
    "El Carmen de Atrato",
    "El Litoral del San Juan",
    "Istmina",
    "Juradó",
    "Lloró",
    "Medio Atrato",
    "Medio Baudó",
    "Medio San Juan",
    "Nuquí",
    "Nóvita",
    "Quibdó",
    "Riosucio",
    "Río Iro",
    "Río Quito",
    "San José del Palmar",
    "Sipí",
    "Tadó",
    "Unguía",
    "Unión Panamericana"
  ],
  "Cundinamarca": [
    "Agua de Dios",
    "Albán",
    "Anapoima",
    "Anolaima",
    "Apulo",
    "Arbeláez",
    "Beltrán",
    "Bituima",
    "Bojacá",
    "Cabrera",
    "Cachipay",
    "Cajicá",
    "Caparrapí",
    "Caqueza",
    "Carmen de Carupa",
    "Chaguaní",
    "Chipaque",
    "Choachí",
    "Chocontá",
    "Chía",
    "Cogua",
    "Cota",
    "Cucunubá",
    "El Colegio",
    "El Peñón",
    "El Rosal",
    "Facatativá",
    "Fomeque",
    "Fosca",
    "Funza",
    "Fusagasugá",
    "Fúquene",
    "Gachala",
    "Gachancipá",
    "Gachetá",
    "Gama",
    "Girardot",
    "Granada",
    "Guachetá",
    "Guaduas",
    "Guasca",
    "Guataquí",
    "Guatavita",
    "Guayabal de Siquima",
    "Guayabetal",
    "Gutiérrez",
    "Jerusalén",
    "Junín",
    "La Calera",
    "La Mesa",
    "La Palma",
    "La Peña",
    "La Vega",
    "Lenguazaque",
    "Macheta",
    "Madrid",
    "Manta",
    "Medina",
    "Mosquera",
    "Nariño",
    "Nemocón",
    "Nilo",
    "Nimaima",
    "Nocaima",
    "Pacho",
    "Paime",
    "Pandi",
    "Paratebueno",
    "Pasca",
    "Puerto Salgar",
    "Pulí",
    "Quebradanegra",
    "Quetame",
    "Quipile",
    "Ricaurte",
    "San Antonio del Tequendama",
    "San Bernardo",
    "San Cayetano",
    "San Francisco",
    "San Juan de Río Seco",
    "Sasaima",
    "Sesquilé",
    "Sibaté",
    "Silvania",
    "Simijaca",
    "Soacha",
    "Sopó",
    "Subachoque",
    "Suesca",
    "Supatá",
    "Susa",
    "Sutatausa",
    "Tabio",
    "Tausa",
    "Tena",
    "Tenjo",
    "Tibacuy",
    "Tibirita",
    "Tocaima",
    "Tocancipá",
    "Topaipí",
    "Ubalá",
    "Ubaque",
    "Une",
    "Venecia",
    "Vergara",
    "Vianí",
    "Villa de San Diego de Ubate",
    "Villagómez",
    "Villapinzón",
    "Villeta",
    "Viotá",
    "Yacopí",
    "Zipacón",
    "Zipaquirá",
    "Útica"
  ],
  "Córdoba": [
    "Ayapel",
    "Buenavista",
    "Canalete",
    "Cereté",
    "Chimá",
    "Chinú",
    "Ciénaga de Oro",
    "Cotorra",
    "La Apartada",
    "Lorica",
    "Los Córdobas",
    "Momil",
    "Montelíbano",
    "Montería",
    "Moñitos",
    "Planeta Rica",
    "Pueblo Nuevo",
    "Puerto Escondido",
    "Puerto Libertador",
    "Purísima",
    "Sahagún",
    "San Andrés Sotavento",
    "San Antero",
    "San Bernardo del Viento",
    "San Carlos",
    "San José de Uré",
    "San Pelayo",
    "Tierralta",
    "Tuchín",
    "Valencia"
  ],
  "Guainía": [
    "Barranco Minas",
    "Cacahual",
    "Inírida",
    "La Guadalupe",
    "Mapiripana",
    "Morichal",
    "Pana Pana",
    "Puerto Colombia",
    "San Felipe"
  ],
  "Guaviare": [
    "Calamar",
    "El Retorno",
    "Miraflores",
    "San José del Guaviare"
  ],
  "Huila": [
    "Acevedo",
    "Agrado",
    "Aipe",
    "Algeciras",
    "Altamira",
    "Baraya",
    "Campoalegre",
    "Colombia",
    "Elías",
    "Garzón",
    "Gigante",
    "Guadalupe",
    "Hobo",
    "Iquira",
    "Isnos",
    "La Argentina",
    "La Plata",
    "Neiva",
    "Nátaga",
    "Oporapa",
    "Paicol",
    "Palermo",
    "Palestina",
    "Pital",
    "Pitalito",
    "Rivera",
    "Saladoblanco",
    "San Agustín",
    "Santa María",
    "Suaza",
    "Tarqui",
    "Tello",
    "Teruel",
    "Tesalia",
    "Timaná",
    "Villavieja",
    "Yaguará"
  ],
  "La Guajira": [
    "Albania",
    "Barrancas",
    "Dibula",
    "Distracción",
    "El Molino",
    "Fonseca",
    "Hatonuevo",
    "La Jagua del Pilar",
    "Maicao",
    "Manaure",
    "Riohacha",
    "San Juan del Cesar",
    "Uribia",
    "Urumita",
    "Villanueva"
  ],
  "Magdalena": [
    "Algarrobo",
    "Aracataca",
    "Ariguaní",
    "Cerro San Antonio",
    "Chivolo",
    "Ciénaga",
    "Concordia",
    "El Banco",
    "El Piñon",
    "El Retén",
    "Fundación",
    "Guamal",
    "Nueva Granada",
    "Pedraza",
    "Pijiño del Carmen",
    "Pivijay",
    "Plato",
    "Pueblo Viejo",
    "Remolino",
    "Sabanas de San Angel",
    "Salamina",
    "San Sebastián de Buenavista",
    "San Zenón",
    "Santa Ana",
    "Santa Bárbara de Pinto",
    "Santa Marta",
    "Sitionuevo",
    "Tenerife",
    "Zapayán",
    "Zona Bananera"
  ],
  "Meta": [
    "Acacias",
    "Barranca de Upía",
    "Cabuyaro",
    "Castilla la Nueva",
    "Cubarral",
    "Cumaral",
    "El Calvario",
    "El Castillo",
    "El Dorado",
    "Fuente de Oro",
    "Granada",
    "Guamal",
    "La Macarena",
    "Lejanías",
    "Mapiripán",
    "Mesetas",
    "Puerto Concordia",
    "Puerto Gaitán",
    "Puerto Lleras",
    "Puerto López",
    "Puerto Rico",
    "Restrepo",
    "San Carlos de Guaroa",
    "San Juan de Arama",
    "San Juanito",
    "San Martín",
    "Uribe",
    "Villavicencio",
    "Vista Hermosa"
  ],
  "Nariño": [
    "Albán",
    "Aldana",
    "Ancuyá",
    "Arboleda",
    "Barbacoas",
    "Belén",
    "Buesaco",
    "Chachagüí",
    "Colón",
    "Consaca",
    "Contadero",
    "Cuaspud",
    "Cumbal",
    "Cumbitara",
    "Córdoba",
    "El Charco",
    "El Peñol",
    "El Rosario",
    "El Tablón de Gómez",
    "El Tambo",
    "Francisco Pizarro",
    "Funes",
    "Guachucal",
    "Guaitarilla",
    "Gualmatán",
    "Iles",
    "Imués",
    "Ipiales",
    "La Cruz",
    "La Florida",
    "La Llanada",
    "La Tola",
    "La Unión",
    "Leiva",
    "Linares",
    "Los Andes",
    "Magüí",
    "Mallama",
    "Mosquera",
    "Nariño",
    "Olaya Herrera",
    "Ospina",
    "Pasto",
    "Policarpa",
    "Potosí",
    "Providencia",
    "Puerres",
    "Pupiales",
    "Ricaurte",
    "Roberto Payán",
    "Samaniego",
    "San Andrés de Tumaco",
    "San Bernardo",
    "San Lorenzo",
    "San Pablo",
    "San Pedro de Cartago",
    "Sandoná",
    "Santa Bárbara",
    "Santacruz",
    "Sapuyes",
    "Taminango",
    "Tangua",
    "Túquerres",
    "Yacuanquer"
  ],
  "Norte de Santander": [
    "Abrego",
    "Arboledas",
    "Bochalema",
    "Bucarasica",
    "Cachirá",
    "Chinácota",
    "Chitagá",
    "Convención",
    "Cucutilla",
    "Cácota",
    "Cúcuta",
    "Durania",
    "El Carmen",
    "El Tarra",
    "El Zulia",
    "Gramalote",
    "Hacarí",
    "Herrán",
    "La Esperanza",
    "La Playa",
    "Labateca",
    "Los Patios",
    "Lourdes",
    "Mutiscua",
    "Ocaña",
    "Pamplona",
    "Pamplonita",
    "Puerto Santander",
    "Ragonvalia",
    "Salazar",
    "San Calixto",
    "San Cayetano",
    "Santiago",
    "Sardinata",
    "Silos",
    "Teorama",
    "Tibú",
    "Toledo",
    "Villa Caro",
    "Villa del Rosario"
  ],
  "Putumayo": [
    "Colón",
    "Leguízamo",
    "Mocoa",
    "Orito",
    "Puerto Asís",
    "Puerto Caicedo",
    "Puerto Guzmán",
    "San Francisco",
    "San Miguel",
    "Santiago",
    "Sibundoy",
    "Valle de Guamez",
    "Villagarzón"
  ],
  "Quindío": [
    "Armenia",
    "Buenavista",
    "Calarcá",
    "Circasia",
    "Córdoba",
    "Filandia",
    "Génova",
    "La Tebaida",
    "Montenegro",
    "Pijao",
    "Quimbaya",
    "Salento"
  ],
  "Risaralda": [
    "Apía",
    "Balboa",
    "Belén de Umbría",
    "Dosquebradas",
    "Guática",
    "La Celia",
    "La Virginia",
    "Marsella",
    "Mistrató",
    "Pereira",
    "Pueblo Rico",
    "Quinchía",
    "Santa Rosa de Cabal",
    "Santuario"
  ],
  "Santander": [
    "Aguada",
    "Albania",
    "Aratoca",
    "Barbosa",
    "Barichara",
    "Barrancabermeja",
    "Betulia",
    "Bolívar",
    "Bucaramanga",
    "Cabrera",
    "California",
    "Capitanejo",
    "Carcasí",
    "Cepitá",
    "Cerrito",
    "Charalá",
    "Charta",
    "Chimá",
    "Chipatá",
    "Cimitarra",
    "Concepción",
    "Confines",
    "Contratación",
    "Coromoro",
    "Curití",
    "El Carmen de Chucurí",
    "El Guacamayo",
    "El Peñón",
    "El Playón",
    "Encino",
    "Enciso",
    "Floridablanca",
    "Florián",
    "Galán",
    "Gambita",
    "Girón",
    "Guaca",
    "Guadalupe",
    "Guapotá",
    "Guavatá",
    "Güepsa",
    "Hato",
    "Jesús María",
    "Jordán",
    "La Belleza",
    "La Paz",
    "Landázuri",
    "Lebríja",
    "Los Santos",
    "Macaravita",
    "Matanza",
    "Mogotes",
    "Molagavita",
    "Málaga",
    "Ocamonte",
    "Oiba",
    "Onzaga",
    "Palmar",
    "Palmas del Socorro",
    "Piedecuesta",
    "Pinchote",
    "Puente Nacional",
    "Puerto Parra",
    "Puerto Wilches",
    "Páramo",
    "Rionegro",
    "Sabana de Torres",
    "San Andrés",
    "San Benito",
    "San Gil",
    "San Joaquín",
    "San José de Miranda",
    "San Miguel",
    "San Vicente de Chucurí",
    "Santa Bárbara",
    "Santa Helena del Opón",
    "Simacota",
    "Socorro",
    "Suaita",
    "Sucre",
    "Suratá",
    "Tona",
    "Valle de San José",
    "Vetas",
    "Villanueva",
    "Vélez",
    "Zapatoca"
  ],
  "Sucre": [
    "Buenavista",
    "Caimito",
    "Chalán",
    "Coloso",
    "Corozal",
    "Coveñas",
    "El Roble",
    "Galeras",
    "Guaranda",
    "La Unión",
    "Los Palmitos",
    "Majagual",
    "Morroa",
    "Ovejas",
    "Palmito",
    "Sampués",
    "San Benito Abad",
    "San Juan de Betulia",
    "San Luis de Sincé",
    "San Marcos",
    "San Onofre",
    "San Pedro",
    "Santiago de Tolú",
    "Sincelejo",
    "Sucre",
    "Tolú Viejo"
  ],
  "Tolima": [
    "Alpujarra",
    "Alvarado",
    "Ambalema",
    "Anzoátegui",
    "Armero",
    "Ataco",
    "Cajamarca",
    "Carmen de Apicala",
    "Casabianca",
    "Chaparral",
    "Coello",
    "Coyaima",
    "Cunday",
    "Dolores",
    "Espinal",
    "Falan",
    "Flandes",
    "Fresno",
    "Guamo",
    "Herveo",
    "Honda",
    "Ibagué",
    "Icononzo",
    "Lérida",
    "Líbano",
    "Mariquita",
    "Melgar",
    "Murillo",
    "Natagaima",
    "Ortega",
    "Palocabildo",
    "Piedras",
    "Planadas",
    "Prado",
    "Purificación",
    "Rio Blanco",
    "Roncesvalles",
    "Rovira",
    "Saldaña",
    "San Antonio",
    "San Luis",
    "Santa Isabel",
    "Suárez",
    "Valle de San Juan",
    "Venadillo",
    "Villahermosa",
    "Villarrica"
  ],
  "Valle del Cauca": [
    "Alcalá",
    "Andalucía",
    "Ansermanuevo",
    "Argelia",
    "Bolívar",
    "Buenaventura",
    "Bugalagrande",
    "Caicedonia",
    "Cali",
    "Calima",
    "Candelaria",
    "Cartago",
    "Dagua",
    "El Cairo",
    "El Cerrito",
    "El Dovio",
    "El Águila",
    "Florida",
    "Ginebra",
    "Guacarí",
    "Guadalajara de Buga",
    "Jamundí",
    "La Cumbre",
    "La Unión",
    "La Victoria",
    "Obando",
    "Palmira",
    "Pradera",
    "Restrepo",
    "Riofrío",
    "Roldanillo",
    "San Pedro",
    "Sevilla",
    "Toro",
    "Trujillo",
    "Tuluá",
    "Ulloa",
    "Versalles",
    "Vijes",
    "Yotoco",
    "Yumbo",
    "Zarzal"
  ],
  "Vaupés": [
    "Carurú",
    "Mitú",
    "Pacoa",
    "Papunahua",
    "Taraira",
    "Yavaraté"
  ],
  "Vichada": [
    "Cumaribo",
    "La Primavera",
    "Puerto Carreño",
    "Santa Rosalía"
  ]
}

type formPersonalesProps ={
    onHitSubmit: (data:any) => void 
  }

const FormSchema = z.object({
    sexo: z.enum(["Masculino", "Femenino"], {
        required_error: "Por favor seleccione su sexo",
    }),

    anoNacimiento: z.string().min(4, { message: "Ingrese un año válido" }),
    estadoCivil: z.enum([
        "Soltero",
        "Casado",
        "Ul",
        "Separado",
        "Divorciado",
        "Viudo",
        "Credo"
    ], {
        required_error: "Por favor seleccione su estado civil",
    }),
    nivelEstudios: z.enum([
        "Ninguno",
        "Primaria_incompleta",
        "Primaria_completa",
        "Bachillerato_incompleto",
        "Bachillerato_completo",
        "Tecnico_tecnologico_incompleto",
        "Tecnico_tecnologico_completo",
        "Profesional_incompleto",
        "Profesional_completo",
        "Carrera_militar_policia",
        "Post_grado_incompleto",
        "Post_grado_completo"
    ], {
        required_error: "Por favor seleccione su nivel de estudios",
    }),
    ocupacion: z.string().min(2, { message: "Por favor ingrese su ocupación" }),
    lugarResidencia: z.object({
        ciudad: z.string().min(2, { message: "Ingrese la ciudad" }),
        departamento: z.string().min(2, { message: "Ingrese el departamento" })
    }),
    estrato: z.enum(["ESTRATO_1", "ESTRATO_2", "ESTRATO_3", "ESTRATO_4", "ESTRATO_5", "ESTRATO_6", "FINCA", "NO_SE"], {
        required_error: "Seleccione su estrato",
    }),
    tipoVivienda: z.enum(["Propia", "Arriendo", "Familiar"], {
        required_error: "Seleccione el tipo de vivienda",
    }),
    personasACargo: z.string().min(1, { message: "Ingrese el número de personas" }),
    lugarTrabajo: z.object({
        ciudad: z.string().min(2, { message: "Ingrese la ciudad" }),
        departamento: z.string().min(2, { message: "Ingrese el departamento" })
    }),
    antiguedadEmpresa: z.object({ /////////
        menosDeUnAno: z.boolean(),
        anos: z.string().optional()
    }),
    cargo: z.string().min(2, { message: "Ingrese su cargo" }),
    tipoCargo: z.enum([
        "Jefatura",
        "ProfesionalAnalistaTecnicoTecnologo",
        "AuxiliarAsistente",
        "OperarioServiciosGenerales"
    ], {
        required_error: "Seleccione el tipo de cargo",
    }),
    antiguedadCargo: z.object({
        menosDeUnAno: z.boolean(),
        anos: z.string().optional()
    }),
    departamentoEmpresa: z.string().min(2, { message: "Ingrese el departamento o área" }),
    tipoContrato: z.enum([
        "Temporalless1",
        "Temporalmore1",
        "Tindefinido",
        "Cooperado",
        "Ops",
        "Nose"
    ], {
        required_error: "Seleccione el tipo de contrato",
    }),
    horasDiarias: z.string().min(1, { message: "Ingrese las horas diarias" }),
    tipoSalario: z.enum([
        "Fijo",
        "Mixto",
        "Variable"
    ], {
        required_error: "Seleccione el tipo de salario",
    })
});
  
   
export default function FormPersonales({onHitSubmit}: formPersonalesProps) {	
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sexo: undefined,
            anoNacimiento: undefined,
            estadoCivil: undefined,
            nivelEstudios: undefined,
            ocupacion: "",
            lugarResidencia: {
              ciudad: "",
              departamento: ""
            },
            lugarTrabajo: {
              ciudad: "",
              departamento: ""
            },
            estrato: undefined,
            tipoVivienda: undefined,
            personasACargo: undefined,
            antiguedadEmpresa: {
              menosDeUnAno: false,
              anos: ""
            },
            cargo: "",
            
            antiguedadCargo: {
              menosDeUnAno: false,
              anos: ""
            },
            departamentoEmpresa: "",
            tipoContrato: undefined,
            horasDiarias: undefined,
            tipoSalario: undefined
          }
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        onHitSubmit(data);
        form.reset();
      }
    
  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">
        Formulario de datos personales
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. Sexo</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Masculino" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Masculino
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Femenino" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Femenino
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="anoNacimiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2. Año de nacimiento</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="1989"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estadoCivil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>4. Estado civil</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su estado civil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Soltero">Soltero (a)</SelectItem>
                    <SelectItem value="Casado">Casado (a)</SelectItem>
                    <SelectItem value="Ul">Unión libre</SelectItem>
                    <SelectItem value="Separado">Separado (a)</SelectItem>
                    <SelectItem value="Divorciado">Divorciado (a)</SelectItem>
                    <SelectItem value="Viudo">Viudo (a)</SelectItem>
                    <SelectItem value="Credo">Sacerdote / Monja</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nivelEstudios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Último nivel de estudios alcanzado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su nivel de estudios" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Ninguno">Ninguno</SelectItem>
                    <SelectItem value="Primaria_incompleta">Primaria incompleta</SelectItem>
                    <SelectItem value="Primaria_completa">Primaria completa</SelectItem>
                    <SelectItem value="Bachillerato_incompleto">Bachillerato incompleto</SelectItem>
                    <SelectItem value="Bachillerato_completo">Bachillerato completo</SelectItem>
                    <SelectItem value="TEcnico_tecnologico_incompleto">Técnico / tecnológico incompleto</SelectItem>
                    <SelectItem value="Técnico_tecnologico_completo">Técnico / tecnológico completo</SelectItem>
                    <SelectItem value="Profesional_incompleto">Profesional incompleto</SelectItem>
                    <SelectItem value="Profesional_completo">Profesional completo</SelectItem>
                    <SelectItem value="Carrera_militar_policia">Carrera militar / policía</SelectItem>
                    <SelectItem value="Post_grado_incompleto">Post-grado incompleto</SelectItem>
                    <SelectItem value="Post_grado_completo">Post-grado completo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ocupacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es su ocupación o profesión?</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: Ingeniero de Software" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
          <FormField
              control={form.control}
              name="lugarResidencia.departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento de residencia</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Resetear la ciudad cuando cambie el departamento
                      form.setValue("lugarResidencia.ciudad", "");
                    }} 
                    value={field.value || ""} 
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(colombiaRegions).map((departamento) => (
                        <SelectItem key={departamento} value={departamento}>
                          {departamento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lugarResidencia.ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad de residencia</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""} 
                    disabled={!form.watch("lugarResidencia.departamento")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione ciudad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch("lugarResidencia.departamento") &&
                        colombiaRegions[form.watch("lugarResidencia.departamento") as keyof typeof colombiaRegions]?.map((ciudad) => (
                          <SelectItem key={ciudad} value={ciudad}>
                            {ciudad}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="estrato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estrato de los servicios públicos de su vivienda</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su estrato" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ESTRATO_1">1</SelectItem>
                      <SelectItem value="ESTRATO_2">2</SelectItem>
                      <SelectItem value="ESTRATO_3">3</SelectItem>
                      <SelectItem value="ESTRATO_4">4</SelectItem>
                      <SelectItem value="ESTRATO_5">5</SelectItem>
                      <SelectItem value="ESTRATO_6">6</SelectItem>
                      <SelectItem value="FINCA">Finca</SelectItem>
                      <SelectItem value="NO_SE">No sé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="tipoVivienda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de vivienda</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de vivienda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Propia">Propia</SelectItem>
                    <SelectItem value="Arriendo">En arriendo</SelectItem>
                    <SelectItem value="Familiar">Familiar</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personasACargo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de personas que dependen económicamente de usted</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min="0"  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
          <FormField
              control={form.control}
              name="lugarTrabajo.departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento donde trabaja</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      // Resetear la ciudad cuando cambie el departamento
                      form.setValue("lugarTrabajo.ciudad", "");
                    }} 
                    value={field.value || ""} 
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(colombiaRegions).map((departamento) => (
                        <SelectItem key={departamento} value={departamento}>
                          {departamento}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lugarTrabajo.ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad donde trabaja</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""} 
                    disabled={!form.watch("lugarTrabajo.departamento")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione ciudad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {form.watch("lugarTrabajo.departamento") &&
                        colombiaRegions[form.watch("lugarTrabajo.departamento") as keyof typeof colombiaRegions].map((ciudad) => (
                          <SelectItem key={ciudad} value={ciudad}>
                            {ciudad}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
               />
            </div>
            <FormField
                control={form.control}
                name="antiguedadEmpresa.menosDeUnAno"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>¿Hace cuántos años que trabaja en esta empresa?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value === "true");
                          if (value === "true") {
                            form.setValue("antiguedadEmpresa.anos", "");
                          }
                        }}
                        defaultValue={field.value ? "true" : "false"}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Menos de un año
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Más de un año
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!form.watch("antiguedadEmpresa.menosDeUnAno") && (
                <FormField
                  control={form.control}
                  name="antiguedadEmpresa.anos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de años</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} min="1"  />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Cuál es el nombre del cargo que ocupa en la empresa?</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: Analista de Sistemas" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipoCargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de cargo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el tipo de cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Jefatura">Jefatura - tiene personal a cargo</SelectItem>
                        <SelectItem value="ProfesionalAnalistaTecnicoTecnologo">Profesional, analista, técnico, tecnólogo</SelectItem>
                        <SelectItem value="AuxiliarAsistente">Auxiliar, asistente administrativo, asistente técnico</SelectItem>
                        <SelectItem value="OperarioServiciosGenerales">Operario, operador, ayudante, servicios generales</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="antiguedadCargo.menosDeUnAno"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>¿Hace cuántos años desempeña el cargo actual?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value === "true");
                            if (value === "true") {
                              form.setValue("antiguedadCargo.anos", "");
                            }
                          }}
                          defaultValue={field.value ? "true" : "false"}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Menos de un año
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Más de un año
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!form.watch("antiguedadCargo.menosDeUnAno") && (
                  <FormField
                    control={form.control}
                    name="antiguedadCargo.anos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de años</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} min="1"   />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="departamentoEmpresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento, área o sección de la empresa</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ej: Recursos Humanos" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="tipoContrato"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de contrato actual</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el tipo de contrato" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Temporalless1">Temporal de menos de 1 año</SelectItem>
                            <SelectItem value="Temporalmore1">Temporal de 1 año o más</SelectItem>
                            <SelectItem value="Tindefinido">Término indefinido</SelectItem>
                            <SelectItem value="Cooperado">Cooperado (cooperativa)</SelectItem>
                            <SelectItem value="Ops">Prestación de servicios</SelectItem>
                            <SelectItem value="Nose">No sé</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="horasDiarias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horas diarias de trabajo establecidas</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="Ej: 8" min="1" max="24"  />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tipoSalario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de salario</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione el tipo de salario" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Fijo">
                              Fijo (diario, semanal, quincenal o mensual)
                            </SelectItem>
                            <SelectItem value="Mixto">
                              Una parte fija y otra variable
                            </SelectItem>
                            <SelectItem value="Variable">
                              Variable (a destajo, por producción, por comisión)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
          <Button type="submit" className="w-full">Enviar formulario</Button>
        </form>
      </Form>
    </div>
  )
}

