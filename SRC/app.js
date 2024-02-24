import express from 'express'
import __dirname from './path.js'
// import productsRouter from './routes/productsRouter.js'
// import upload from './config/multer.js'
// import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

// Dejé la DB cargada con 10 productos de antemano utilizando la función .addProducts(product)

const my_app = express ()
const PORT = 8080

// Application middlewares

my_app.use('/static', express.static(__dirname + '/public'))  // Acá le estoy diciendo que busque los archivos estáticos en esa carpeta en particular. Express.static es la función que se ocupa de gestionar los archivos estáticos.
my_app.use(express.json())

// // Handlebars (motor de plantillas)

// my_app.engine('handlebars', engine())
// my_app.set('view engine', 'handlebars')
// my_app.set('views', __dirname + '/views')

// Router Middlewares

// my_app.use('/products', productsRouter)

// Prueba de Handlebars

// my_app.get('/test_handlebars', (req, res) => {
//     res.render('templates/home', {
//         title: 'Título dinámico',
//         subtitle: 'Subtítulo dinámico',
//         activado: true
//     })
// })

// const my_products = [
//     {title: 'mayonesa', price: 500}, {title: 'mostaza', price: 900}, {title: 'ketchup', price: 1000}
// ]

// my_app.get('/test_handlebars2', (req, res) => {
//     res.render('templates/products', {
//         products: my_products
//     })
// })

// Cargo pedidos de imágenes con Multer. Debería agregarle un try/catch por si falla la carga.

// my_app.post('/upload', upload.single('product'), (req, res) => {
//     res.status(200).send("Imagen cargada correctamente")
// })

// Levanto el server

const my_server = my_app.listen(PORT, () => {
    console.log(`Escuchando solicitudes en el puerto ${PORT} ...`)
})

const io = new Server (my_server)

// Cuando alguien se conecte, que haga lo siguiente. El evento "connection" se asocia a cuando un nuevo
// cliente se conecta a nuestro servidor.

io.on('connection', () => {
    console.log("new connection")
})
