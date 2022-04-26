//Creates a data structure containing all available product categories and the total value of
//products of a given category
const categoriesWithPrices = (products) => {
    let categories = {};

    products.forEach((product) => {
        if(categories.hasOwnProperty(product.category)){
            categories[product.category] += product.price;
        }else{
        categories[product.category] = product.price;
                }
        })

    return categories;
}

//Finds a cart with the highest value, determines its value and full name of its owner
const highestPriceCart = (carts, products, users) =>{
    let userId, maxPrice=0, tempPrice=0;

    carts.forEach( (cart)=> {
        cart.products.forEach((cartProduct) => {
            let currentProduct = products.find((product) => product.id === cartProduct.productId);
            tempPrice += currentProduct.price * cartProduct.quantity;
        })

        if(tempPrice > maxPrice){
            maxPrice=tempPrice;
            userId = cart.userId;
        }
    })

    let user = users.find((user) => user.id === userId);
    return [user.name.firstname + " "+user.name.lastname, maxPrice]
}


//finds the two users living furthest away from each other
const furthestClients = (users) =>{
   
    let userIds, maxDiff = 0;
    let baseLat,  baseLong;
    let currentLat, currentLong;

    for(let i = 0; i < users.length; i++){
        baseLat = users[i].address.geolocation.lat;
        baseLong = users[i].address.geolocation.long;

        for(let j = i+1; j < users.length; j++){
            currentLat = users[j].address.geolocation.lat;
            currentLong = users[j].address.geolocation.long;

            if(Math.sqrt(Math.pow((currentLat - baseLat), 2) + Math.pow((currentLong - baseLong), 2) ) > maxDiff){
                userIds=([users[i].id, users[j].id]);
                maxDiff=Math.sqrt(Math.pow((currentLat - baseLat), 2) + Math.pow((currentLong - baseLong), 2));
            }
        }
    }

    let result = [users.find((user) => user.id === userIds[0]), users.find((user) => user.id === userIds[1])]
    return result;
}

const main2 = async () =>{

    //fetching data
    let response1 = fetch("https://fakestoreapi.com/carts");
    let response2 = fetch("https://fakestoreapi.com/products");
    let response3 = fetch("https://fakestoreapi.com/users");

    let data = await Promise.all([response1.then(res=> res.json()), response2.then(res=> res.json()), response3.then(res=> res.json())])

    let carts = data[0];
    let products = data[1];
    let users = data[2];
    
    //results for tasks 2-4
    let result1 = categoriesWithPrices(products);
    let result2 = highestPriceCart(carts, products, users);
    let result3 = furthestClients(users);


    console.log(result1)
    console.log(result2)
    console.log(result3)
}

main2();
