//Lista de productos
const productList = [];
//Lista carrito compras
const shoppingList = [];

productList.push({
	name: 'Bike',
	price: '120',
	image:
		'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
	description:
		'With its practical position, this bike also fulfills a decorative function, add your hall or workspace.',
});

productList.push({
	name: 'Pantalla',
	price: '220',
	image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
	description: 'A fantastic screen for your work Set-Up',
});

productList.push({
	name: 'Balon',
	price: '60',
	image:
		'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	description: 'The new football ball of the world cup',
});
//email que se oprime para desplegar el menu
const menuEmail = document.querySelector('.navbar-email');
//menu que se despliega al oprimir el email
const desktopMenu = document.querySelector('.desktop-menu');
//icono hamburguesa que se oprime en el menu mobil
const menuHamIcon = document.querySelector('.menu');
//menu que se despliega al oprimir el icono en menu mobil
const mobileMenu = document.querySelector('.mobile-menu');
//icono del carrito que se oprime para desplegar un menu
const menuCartIcon = document.querySelector('.navbar-shopping-cart');
//menu que se despliega al oprimir el boton del carrito
const cartIconMenu = document.querySelector('.product-detail');
//contenedor de los productos de la parte principal de la pagina web
const cardsContainer = document.querySelector('.cards-container');
//contenedor de la informacion especifica del producto que se despliega al oprimir una imagen de un producto
const productDetailContainer = document.querySelector('.product-specific');
//boton para cerrar el menu de la informacion especifica del producto
const productDetailClose = document.querySelector('.product-specific-close');
//boton para cerrar el menu del carro de compras al oprimir la flecha de regreso
const returnArrowImg = document.querySelector('.close-arrow');

//abre y cierra el menu desktop cuando se hace click
menuEmail.addEventListener('click', toggleDesktopMenu);
//abre y cierra el menu mobile cuando se hace click
menuHamIcon.addEventListener('click', toggleMobileMenu);
//abre y cierra el menu del carrito de compras cuando se hace click
menuCartIcon.addEventListener('click', toggleCartMenu);
//Cierra el menu del carro de compras al oprimir la flecha de regreso
returnArrowImg.addEventListener('click', toggleCartMenu);

//Despliega el menu al oprimir el email en el menu desktop
function toggleDesktopMenu() {
	//Se puede solucionar el cerrar el menu contrario cuando se abre el otro de dos maneras
	//De esta forma verificamos que el menu contrario contiene la clase inactive
	const isCartIconMenuClosed = cartIconMenu.classList.contains('inactive');

	//Miramos si el menu mobile esta abierto ((! = diferente)
	if (!isCartIconMenuClosed) {
		//Si es diferente a closed, es decir, esta abierto, agregamos la clase inactive
		cartIconMenu.classList.add('inactive');
	}
	productDetailContainer.classList.add('inactive');

	desktopMenu.classList.toggle('inactive');
}
//Despliega el menu hamburguesa de la vista mobile
function toggleMobileMenu() {
	const isCartIconMenuClosed = cartIconMenu.classList.contains('inactive');

	if (!isCartIconMenuClosed) {
		cartIconMenu.classList.add('inactive');
	}
	productDetailContainer.classList.add('inactive');

	mobileMenu.classList.toggle('inactive');
}
//Despliega el menu del carrito de compras
function toggleCartMenu() {
	
	//De esta forma activo la clase inactive en los otros dos menus asi se cierran en el momento de hacer click y el menu deseado se abre
	mobileMenu.classList.add('inactive');
	desktopMenu.classList.add('inactive');
	productDetailContainer.classList.add('inactive');
	cartIconMenu.classList.toggle('inactive');
	//renderCartMenu(shoppingList);
	for(let product of shoppingList) {
		//Crea la informacion del producto que se selecciona en pantalla
		const productImg = document.querySelector('.product__img');
		const productInfoPrice = document.querySelector('.product__price');
		const productInfoName = document.querySelector('.product__name');
		
		//Da el valor a las propiedades del producto que se crea a partir del producto que recibe como parametro
		productImg.setAttribute('src', product.image);
		productInfoName.innerText = product.name;
		productInfoPrice.innerText = '$' + product.price;
	}
}
//Abre el banner de informacion de producto al dar click en la imagen, recibe como parametro el producto que se selecciona
function openProductDetailAside(product) {
	console.log({ product });
	mobileMenu.classList.add('inactive');
	desktopMenu.classList.add('inactive');
	cartIconMenu.classList.add('inactive');
	productDetailContainer.classList.remove('inactive');    
}
//Cierra el banner de informacion de producto al dar click en la X
function closeProductDetailAside() {
	mobileMenu.classList.add('inactive');
	desktopMenu.classList.add('inactive');
	cartIconMenu.classList.add('inactive');
	productDetailContainer.classList.toggle('inactive');
}

//Maquetacion de productos en la lista del contenedor principal de la pagina
function renderProducts(products) {
	for (let product of products) {
		const productCard = document.createElement('div');
		productCard.classList.add('product-card');
		const img = document.createElement('img');
		img.setAttribute('src', product.image);
		//Abre el banner de detalle de productos
        //Actualiza los detalles del producto que se selecciona en el menu
		function updateProductSpefication() {
            //Es la funcion declarada para abir el banner, recibe como parametro el producto seleccionado del listado
			openProductDetailAside(product);
		}
        //Abre el menu del producto seleccionado 
		img.addEventListener('click', updateProductSpefication);

		const productInfo = document.createElement('div');
		productInfo.classList.add('product-info');
		const productInfoDiv = document.createElement('div');
		const productInfoPrice = document.createElement('p');
		productInfoPrice.innerText = '$' + product.price;
		const productInfoName = document.createElement('p');
		productInfoName.innerText = product.name;
		const productInfoFigure = document.createElement('figure');
		const productInfoFigureImg = document.createElement('img');
		productInfoFigureImg.setAttribute('src', './icons/bt_add_to_cart.svg');
		
		function shoppingListItems() {
			shoppingList.push(product);
			console.log(shoppingList);
		}

		productInfoFigure.addEventListener('click', shoppingListItems);

		//Union de los elementos
		productInfoFigure.append(productInfoFigureImg);
		productInfoDiv.append(productInfoPrice, productInfoName);
		productInfo.append(productInfoDiv, productInfoFigure);
		productCard.append(img, productInfo);
		cardsContainer.append(productCard);
	}
}
//Maquetacion menu carrito de compras
function renderCartMenu() {
	
		const myOrderContent = document.createElement('div');
		myOrderContent.classList.add('my-order-content');
		const shoppingCart = document.createElement('div');
		shoppingCart.classList.add('shopping-cart');
		const productFigure = document.createElement('figure');
		const productImg = document.createElement('img');
		productImg.classList.add('product__img');
		const productName = document.createElement('p');
		productName.classList.add('product__name');
		const productPrice = document.createElement('p');
		productPrice.classList.add('product__price');
		const deleteProduct = document.createElement('img');
		deleteProduct.setAttribute('src','./icons/icon_close.png');
		deleteProduct.setAttribute('alt','close');
		productFigure.append(productImg);
		shoppingCart.append(productFigure,productName,productPrice,deleteProduct);
		
		//Elemento order
		const order = document.createElement('div');
		order.classList.add('order');
		const nameContainer = document.createElement('p');
		const nameSpan = document.createElement('span');
		nameSpan.innerText = "Total";
		const totalPrice = document.createElement('p');
		totalPrice.classList.add('total__price');
		nameContainer.append(nameSpan)
		order.append(nameContainer,totalPrice)
		//Elemento button
		const primaryButton = document.createElement('button');
		primaryButton.classList.add('primary-button');
		primaryButton.innerText = "Checkout";
		myOrderContent.append(shoppingCart, order, primaryButton);
		cartIconMenu.append(myOrderContent);
	
}

//Maquetacion del banner que se despliega con la informacion del producto al cual se da click
function renderSpecification() {
	const iconClose = document.createElement('div');
	iconClose.classList.add('product-specific-close');
	const iconCloseImg = document.createElement('img');
	iconCloseImg.setAttribute('src', './icons/icon_close.png');
	//Cierra el banner cuando se le da click a la imagen de X
	iconClose.addEventListener('click', closeProductDetailAside);
	const productImg = document.createElement('img');
	productImg.className = 'product-specific__img';
	productImg.setAttribute('alt', 'Product image');
	const productInfo = document.createElement('div');
	productInfo.classList.add('product-specific-info');
	const productInfoPrice = document.createElement('p');
	productInfoPrice.classList.add('product-specific__price');
	const productInfoName = document.createElement('p');
    productInfoName.classList.add('product-specific__name');
	const productInfoDescription = document.createElement('p');
    productInfoDescription.classList.add('product-specific__description');
	const addButton = document.createElement('button');
	addButton.classList.add('primary-button');
	addButton.classList.add('add-to-cart-button');
	addButton.innerText = 'Add to cart';
	const buttonImg = document.createElement('img');
	buttonImg.setAttribute('src', './icons/bt_add_to_cart.svg');
	buttonImg.setAttribute('alt', 'add to cart');
	//Union de los elementos
	productInfo.append(
		productInfoPrice,
		productInfoName,
		productInfoDescription,
		addButton
	);
	iconClose.append(iconCloseImg);
	productDetailContainer.append(iconClose, productImg, productInfo);
}

renderProducts(productList);
renderCartMenu();
renderSpecification();
