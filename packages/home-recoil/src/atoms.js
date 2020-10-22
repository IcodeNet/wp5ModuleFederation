// This creates a new “atom” that holds the cart count value.
// In the recoil model, state is stored as atoms
// and components subscribe to those atoms.
// If an atom's value changes then any component that subscribes to it will be updated.

import { atom } from 'recoil';
export const cartCount = atom({ key: 'cartCount', default: 0 });
