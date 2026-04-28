import { encodeMenuDescription } from '@/lib/menuDescriptionCodec'

export const MENU_CATEGORY_ANTIPASTI = 'antipasti-pinse-tagliere'

export function getDefaultAntipastiItemsForSeed() {
  return [
    { name: 'Patatine fritte piccolo', price: 2, description: '', position: 10 },
    { name: 'Patatine fritte grande', price: 4, description: '', position: 20 },
    { name: 'Bruschette miste', price: 5, description: '', position: 30 },
    { name: 'Bruschette Classiche (5 pz.)', price: 4, description: '', position: 40 },
    {
      name: 'SICILIANO',
      price: 15,
      description: encodeMenuDescription(
        'tagliere di salumi, olive, mozzarella, bruschette, verdure grigliate o pastellate, pomodoro ripieno, caponata, olio, sale, pepe',
        'Charcuterie board, olives, mozzarella, bruschetta, grilled or battered vegetables, stuffed tomatoes, caponata, oil, salt, and pepper',
        ''
      ),
      position: 50,
    },
    {
      name: 'PINSANAGO',
      price: 10,
      description: encodeMenuDescription(
        'bresaola, mozzarella, funghi, pesto di pistacchio, granella di pistacchio, olio, sale, pepe',
        'Bresaola, mozzarella, mushrooms, pistachio pesto, chopped pistachios, oil, salt, pepper',
        ''
      ),
      position: 60,
    },
    {
      name: "SANT'AGATA",
      price: 10,
      description: encodeMenuDescription(
        'crudo, gorgonzola dolce, rucola, granella di noci, olio, sale, pepe',
        'raw ham, sweet gorgonzola, rocket, chopped walnuts, oil, salt, pepper',
        ''
      ),
      position: 70,
    },
    {
      name: 'MIELUZZI',
      price: 10,
      description: encodeMenuDescription(
        'patate, cipolla, pancetta croccante, mozzarella, provola piccante, rosmarino, olio, sale, pepe',
        'potatoes, onion, crispy bacon, mozzarella, spicy provola, rosemary, oil, salt, pepper',
        ''
      ),
      position: 80,
    },
    { name: 'Cocktail di Gamberi', price: 10, description: '', position: 90 },
    { name: 'Insalata di mare', price: 10, description: '', position: 100 },
    { name: 'Zuppa di cozze', price: 10, description: '', position: 110 },
    { name: 'Polpo scottato', price: 12, description: '', position: 120 },
    { name: 'Caponata di Pesce Spada', price: 10, description: '', position: 130 },
    {
      name: 'TAGLIATELLE DELLO CHEF',
      price: 13,
      description: encodeMenuDescription('pomodoro, basilico, mozzarella, pesto', 'tomato, basil, mozzarella, pesto', ''),
      position: 140,
    },
    {
      name: 'CARBONARA',
      price: 12,
      description: encodeMenuDescription('guanciale, pecorino, uovo, pepe', 'bacon, pecorino cheese, egg, pepper', ''),
      position: 150,
    },
    {
      name: 'RISOTTO DARIO',
      price: 10,
      description: encodeMenuDescription(
        'radicchio rosso, speck, mandorle, cipolla, prezzemolo, olio, sale, pepe',
        'red radicchio, speck, almonds, onion, parsley, oil, salt, pepper',
        ''
      ),
      position: 160,
    },
    {
      name: 'BUSIATE PESTO TRAPANESE',
      price: 10,
      description: encodeMenuDescription(
        'pomodoro, basilico, aglio, pecorino, mandorle, olio, sale, pepe',
        'tomato, basil, garlic, pecorino cheese, almonds, oil, salt, pepper',
        ''
      ),
      position: 170,
    },
    {
      name: 'TAGLIATELLE CON PESTO DI RUCOLA E GAMBERO',
      price: 15,
      description: encodeMenuDescription(
        'gambero, pesto, mandorle, aglio, burro, olio, sale, pepe',
        'shrimp, pesto, almonds, garlic, butter, oil, salt, pepper',
        ''
      ),
      position: 180,
    },
    {
      name: 'BUSIATE GAMBERO E PESTO DI PISTACCHIO',
      price: 22,
      description: encodeMenuDescription(
        'gambero, pesto, aglio, olio, sale, pepe, prezzemolo',
        'shrimp, pesto, garlic, oil, salt, pepper, parsley',
        ''
      ),
      position: 190,
    },
    {
      name: 'SPAGHETTI ALLE VONGOLE',
      price: 16,
      description: encodeMenuDescription('vongole, aglio, olio, sale, pepe, prezzemolo', 'clams, garlic, oil, salt, pepper, parsley', ''),
      position: 200,
    },
    {
      name: 'RISOTTO GIANAGO',
      price: 17,
      description: encodeMenuDescription(
        'gambero, limone, arancia, cipolla, burro, olio, sale, pepe',
        'shrimp, lemon, orange, onion, butter, oil, salt, pepper',
        ''
      ),
      position: 210,
    },
    {
      name: 'RISOTTO MARINARA',
      price: 16,
      description: encodeMenuDescription(
        'cozze, vongole, gamberi, olio, sale, pepe, prezzemolo',
        'mussels, clams, shrimp, oil, salt, pepper, parsley',
        ''
      ),
      position: 220,
    },
    {
      name: 'TAGLIATA DI MANZO',
      price: 15,
      description: encodeMenuDescription('manzo, rucola, pomodorini, grana, olio, sale, pepe', 'beef, arugula, cherry tomatoes, parmesan, oil, salt, pepper', ''),
      position: 230,
    },
    {
      name: 'MEDAGLIONE DI MANZO AL PEPE ROSA',
      price: 15,
      description: encodeMenuDescription(
        'manzo, panna, pepe rosa, burro, olio, sale, pepe, farina, brandy, prezzemolo',
        'beef, cream, pink pepper, butter, oil, salt, pepper, flour, brandy, parsley',
        ''
      ),
      position: 240,
    },
    {
      name: 'GRIGLIATA DI PESCE (GRILLED FISH)',
      price: 16,
      description: encodeMenuDescription('pesce spada, tonno, gambero', 'swordfish, tuna, shrimp', ''),
      position: 250,
    },
    {
      name: 'ORATA AGLI AGRUMI DI SICILIA',
      price: 12,
      description: encodeMenuDescription(
        'limone, arancia, aglio, olio, sale, pepe, prezzemolo',
        'lemon, orange, garlic, oil, salt, pepper, parsley',
        ''
      ),
      position: 260,
    },
    { name: 'FRITTURA DI PARANZA', price: 16, description: '', position: 270 },
    {
      name: 'CONTORNI',
      price: 7,
      description: encodeMenuDescription(
        'Insalata verde, Insalata capricciosa, Patate al forno, Verdure grigliate, Radicchio grigliato',
        'Green salad, Capricciosa salad, Baked potatoes, Grilled vegetables, Grilled radicchio',
        ''
      ),
      position: 280,
    },
    { name: 'Cannolo Siciliano', price: 5, description: '', position: 290 },
    { name: 'Cheesecake', price: 5, description: '', position: 300 },
    {
      name: 'CARLO',
      price: 25,
      description: encodeMenuDescription(
        'salmone, insalata di mare, cocktail di gamberi, zuppa di cozze, 1 gambero marinato, 2 ostriche',
        'salmon, seafood salad, shrimp cocktail, mussel soup, 1 marinated shrimp, 2 oysters',
        ''
      ),
      position: 310,
    },
    {
      name: 'MILI',
      price: 22,
      description: encodeMenuDescription(
        'paranza, anelli di totano, capuccetti, caponata di pesce spada, cocktail di gamberi, zuppa di cozze',
        'small fried fish, baby squid rings, swordfish caponata, shrimp cocktail, mussel soup',
        ''
      ),
      position: 320,
    },
    {
      name: 'APERIMEAT CON COCKTAIL A SCELTA',
      price: 22,
      description: encodeMenuDescription(
        'salsiccia, costata, involtino di carne, hamburger, puntina di maiale, contorno di insalata verde o patate al forno o verdure grigliate',
        'sausage, rib steak, meat roll, hamburger, pork rib, side of green salad or baked potatoes or grilled vegetables',
        ''
      ),
      position: 330,
    },
  ]
}
