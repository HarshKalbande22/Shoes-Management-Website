// const express=require("express");
// const cors = require("cors");
// const jwt=require("jsonwebtoken");
// const crypto = require("crypto");
// const app=express();
// const port=3000;
// app.use(cors());
// app.use(express.json());

// const SecretKey=crypto.randomBytes(64).toString('hex');

// let products=
// [
//     {
//         id:1,
//         name:"Running Shoes",
//         price:"1000",
//         brand:"Nike",
//         image:"",
//     },
//     {
//         id:2,
//         name:"Sneaker",
//         price:"2000",
//         brand:"Adidas",
//         image:"",
//     },
//     {
//         id:3,
//         name:"floaters",
//         price:"4000",
//         brand:"Bata",
//         image:"",
//     },
// ];
// const users = [
//     { 
//         id: 1,
//          username: 'admin', 
//          password: 'admin123', 
//          role: 'admin' 
//         },
//     { 
//         id: 2,
//          username: 'user', 
//          password: 'user123', 
//          role: 'user'
//      }
// ];

// app.use(express.json());
// app.use(express.static('public'));

// const authentication=(req,res,next)=>{
//     const token=req.headers['authorization']?.split('')[1];
//     if(!token)return res.sendStatus(401);

//     jwt.verify(token,SecretKey,(err,user)=>{
//         if(err)return res.sendStatus(403);
//         req.user=user;
//         next();
//     });
// };

// const isAdmin=(req,res,next)=>{
//     if(req.user.role !=='admin'){
//         return req.status(403).send('Access denied,Admins Only');
//     }
//     next();
// };
// app.get('/products',(req,res)=>{
//     const{
//         search,brand
//     }=req.query;
//     let filteredProducts=products;

//     if(search){
//         filteredProducts=filteredProducts.filter(product=>
//             product.name.toLowerCase().includes(search.toLowerCase())
//         );
//     }
//     if(brand){
//         filteredProducts=filteredProducts.filter(product=>product.brand===brand);
//     }
//     res.json(filteredProducts);
// });

// app.post('/products',authenticateToken,isAdmin,(req,res)=>{
//     const newProduct=req.body;
//     newProduct.id=products.length+1;
//     products.push(newProduct);
//     res.status(201).json(newProduct);
// });

// app.put('/products/:id',authenticateToken,isAdmin,(req,res)=>{
//     const product=products.find(p=>p.id==req.params.id);
//     if(!product)return res.status(404).send('product not found');
//     object.assign(product,req.body);
//     res.json(product);
// });
// app.delete('/products/:id',authenticateToken,isAdmin,(req,res)=>{
// const productIndex=products.findIndex(p=>p.id===req.params.id);
// if(productIndex==-1)return res.status(404).send('product not found');
// products.splice(productIndex,1);
// res.status(204).send();
// });
// app.listen(port,()=>{
//     console.log(`Server running at http://127.0.0.1:${port}`);
// })

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));

const SecretKey = crypto.randomBytes(64).toString('hex');

let products = [
    {
        id: 1,
        name: "Running Shoes",
        price: "1000",
        brand: "Nike",
        image: "",
    },
    {
        id: 2,
        name: "Sneaker",
        price: "2000",
        brand: "Adidas",
        image: "",
    },
    {
        id: 3,
        name: "Floaters",
        price: "4000",
        brand: "Bata",
        image: "",
    },
];

const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin'
    },
    {
        id: 2,
        username: 'user',
        password: 'user123',
        role: 'user'
    }
];

// Middleware for authentication
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SecretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied, Admins Only');
    }
    next();
};

app.get('/products', (req, res) => {
    const { search, brand } = req.query;
    let filteredProducts = products;

    if (search) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    if (brand) {
        filteredProducts = filteredProducts.filter(product => product.brand === brand);
    }
    res.json(filteredProducts);
});

app.post('/products', authenticateToken, isAdmin, (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', authenticateToken, isAdmin, (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).send('Product not found');
    
    Object.assign(product, req.body); 
    res.json(product);
});


app.delete('/products/:id', authenticateToken, isAdmin, (req, res) => {
    const productIndex = products.findIndex(p => p.id == req.params.id); 
    if (productIndex === -1) return res.status(404).send('Product not found');
    
    products.splice(productIndex, 1);
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
