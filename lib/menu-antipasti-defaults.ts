import { encodeMenuDescription } from '@/lib/menuDescriptionCodec'

/** Categoria usata in DB e in admin per la sezione antipasti. */
export const MENU_CATEGORY_ANTIPASTI = 'antipasti-pinse-tagliere'

/** Piatti mostrati se il DB non ha ancora voci per questa categoria. */
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
  ]
}
