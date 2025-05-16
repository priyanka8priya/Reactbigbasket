import { configureStore, createSlice } from '@reduxjs/toolkit';

const savedcart=localStorage.getItem("cart");
const localStoragecart=savedcart?JSON.parse(savedcart):[];
// Create the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'Tomato', price: 200.5, image:'/image/Tomato.jpg' },
      { name: 'Potato', price: 100.89, image:'/image/potato.jpg' },
      { name: 'Carrot', price: 50.75, image:'/image/carrots.jpg' },
      { name: 'Cauliflower', price: 120.3, image:'/image/cauliflower.jpg' },
      { name: 'Radish', price: 156.2, image:'/image/raddish.jpg' },
      { name: 'Onion', price: 189.15, image:'/image/Onion.jpg' },
      { name: 'Brinjal', price: 125.4, image:'/image/brinjal.jpg' },
      { name: 'Cucumber', price: 346.1, image:'/image/cucumber.jpg' },
      { name: 'Capsicum', price: 134.1, image:'/image/capcicum.jpg' },
      { name: 'Drumstick', price: 167.1, image:'/image/drumstick.jpg' },
      { name: 'LadiesFingure', price: 145.1, image:'/image/lady.jpg' },
      { name: 'Sembeans', price: 150.1, image:'/image/sembeans.jpg' },
      { name: 'Beans', price: 100.1, image:'/image/beans.jpg' },
      { name: 'Beatroot', price: 70.1, image:'/image/beatroot.jpg' },
      { name: 'Cabbage', price: 90.1, image:'/image/cabbage.jpg' },
      { name: 'Greenchilli', price: 80.1, image:'/image/greechill.jpg' },
      { name: 'Sweetcorn', price: 150.1, image:'/image/sweetcorn.jpg' },
      { name: 'Garlic', price: 100.1, image:'/image/garlic.jpg' },
      { name: 'Spinach', price: 70.1, image:'/image/spinach.jpg' },
      { name: 'Coriander', price: 80.1, image:'/image/coriander.jpg' },
    ],
    nonveg: [
      { name: 'Chicken', price: 800.0, image: '/image/chicken.jpg' },
      { name: 'Mutton', price: 950.0, image: '/image/mutton.jpg' },
      { name: 'Fish', price: 700.0, image: '/image/fish.jpg' },
      { name: 'Beef', price: 900.0, image: '/image/beef.jpg' },
      { name: 'Pork', price: 850.0, image: '/image/Pork.jpg' },
      { name: 'Crab', price: 950.0, image: '/image/Crab.jpg' },
      { name: 'Goat (Chevon)', price: 187.0, image: '/image/goat.jpg' },
      { name: 'Rabbit', price: 456.0, image: '/image/rabbit.jpg' },
      { name: 'Eggs', price: 120.0, image: '/image/eggs.jpg' },
      { name: 'Prawns', price: 200.0, image: '/image/prawns.jpg' },
      { name: 'Muttonboti', price: 900.0, image: '/image/muttonboti.jpg' },
      { name: 'Goatpaya', price: 800.0, image: '/image/goatpaya.jpg' },
      { name: 'Chickenkeema', price: 700.0, image: '/image/chickenkeema.jpg' },
      { name: 'Muttonkeema', price: 1000.0, image: '/image/muttonkemma.jpg' },
      { name: 'Smallfishes', price: 600.0, image: '/image/smallfish.jpg' },
      { name: 'Muttonliver', price: 500.0, image: '/image/muttonliver.jpg' },
      { name: 'Chickenliver', price: 400.0, image: '/image/chickenliver.jpg' },
      { name: 'Mutton Brain', price: 300.0, image: '/image/muttonbrain.jpeg' },
      { name: 'Dry Fishes', price: 200.0, image: '/image/dryfishes.jpg' },
      { name: 'DryFishesBomil', price: 110.0, image: '/image/bomil.jpg' },
    ],
    fruits: [
      { name: 'Apple', price: 150.0, image: '/image/apple.jpg' },
      { name: 'Banana', price: 90.0, image: '/image/banana.jpg' },
      { name: 'Cherry', price: 207.0, image: '/image/cherrys.jpg' },
      { name: 'Dragon', price: 300.0, image: '/image/DragonFruit.jpg' },
      { name: 'Strawberry', price: 129.0, image: '/image/strawberry.jpg' },
      { name: 'Pomegranate', price: 250.0, image: '/image/pomegranate.jpg' },
      { name: 'Kiwi', price: 190.0, image: '/image/kiwi.jpg' },
      { name: 'Watermelon', price: 170.0, image: '/image/watermelon.jpg' },
      { name: 'Papaya', price: 160.0, image: '/image/papaya.jpg' },
      { name: 'Peach', price: 150.0, image: '/image/peach.jpg' },
      { name: 'Orange', price: 130.0, image: '/image/orange.jpg' },
      { name: 'Pineapple', price: 120.0, image: '/image/pineapple.jpg' },
      { name: 'Sapodilla', price: 180.0, image: '/image/sapodilla.jpg' },
      { name: 'Mangos', price: 100.0, image: '/image/mangos.jpg' },
      { name: 'Lychee', price: 100.0, image: '/image/lychee.jpg' },
      { name: 'Guava', price: 250.0, image: '/image/guava.jpg' },
      { name: 'Grapes', price: 320.0, image: '/image/grapes.jpg' },
      { name: 'Blackberry', price: 300.0, image: '/image/blackberry.jpg' },
      { name: 'Blueberry', price: 400.0, image: '/image/blueberry.jpg' },
      { name: 'Avacado', price: 500.0, image: '/image/avacado.jpg' },
    ],
    chocolates: [
      { name: 'Munch', price: 50.0, image: '/image/munch.jpg' },
      { name: 'Dairy Milk', price: 90.0, image: '/image/dairy.jpg' },
      { name: 'Crispello', price: 95.0, image: '/image/crispello.jpg' },
      { name: 'Ferrero Rocher', price: 100.0, image: '/image/ferrero.jpg' },
      { name: 'Fuse', price: 30.0, image: '/image/fuse.jpg' },
      { name: 'KitKat', price: 40.0, image: '/image/kitkat.jpg' },
      { name: 'Perk', price: 15.0, image: '/image/perk.jpg' },
      { name: 'Snickers', price: 200.0, image: '/image/snickers.jpg' },
      { name: 'MoldBerry', price: 300.0, image: '/image/moldberry silicone.jpg' },
      { name: 'Cudberry', price: 600.0, image: '/image/cud berry.jpg' },
      { name: 'Raspberry', price: 505.0, image: '/image/raspberry.jpg' },
      { name: 'Dryfruite chocolate', price: 125.0, image: '/image/dryfruit.jpg' },
      { name: 'Darkchoclate', price: 325.0, image: '/image/dark.jpg' },
      { name: 'Caddychocolate', price: 165.0, image: '/image/candy.jpg' },
      { name: 'Dateschocolate', price: 500.0, image: '/image/dates.jpg' },
      { name: 'Dubaichocolate', price: 300.0, image: '/image/dubai.jpg' },
      { name: 'Meltedchocolate', price: 100.0, image: '/image/melted.jpg' },
      { name: 'Gems', price: 50.0, image: '/image/gems.jpg' },
      { name: 'Blueberrychocolate', price: 205.0, image: '/image/blue.jpg' },
      { name: 'Blackberrychocolate', price: 135.0, image: '/image/black.jpg' },
    ],

    
    
    },
    reducers: {}
  });
  //add to cart
  const cartSlice=createSlice({
    name:'cart',
    initialState:localStoragecart,
    reducers:{
      Addtocart:(state,action)=>{
        const item=state.find(i=>i.name===action.payload.name);
        if(item){
          item.quantity+=1;
        }else{
          state.push({...action.payload,quantity:1});
        }
      },
         // Increment item quantity
    incrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    
    // Decrement item quantity
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // If quantity is 1, remove the item from the cart
        return state.filter(i => i.name !== action.payload);
      }
    },
    
    // Remove item from cart entirely
    removeItem: (state, action) =>
      {
        return state.filter(i => i.name !== action.payload);
      },
     clearCart: () => [],
    IncrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1; 
      }
    },

    
  }
});
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});


          const store =configureStore({
            reducer:{
              products:productsSlice.reducer,
              cart:cartSlice.reducer,
               orders:orderSlice.reducer,
            }
          });
store.subscribe(()=>{
  const state=store.getState();
  localStorage.setItem("cart",JSON.stringify(state.cart));

});
         




// Export actions
export const { addOrder } = orderSlice.actions;
        export const{Addtocart,incrementQuantity,decrementQuantity,removeItem,clearCart}=cartSlice.actions;
      
    
        
  export default store;