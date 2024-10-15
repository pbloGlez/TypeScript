

const productos = [
    { id: 1, nombre: 'Producto A', precio: 30 },
    { id: 2, nombre: 'Producto B', precio: 20 },
    { id: 3, nombre: 'Producto C', precio: 50 },
    { id: 4, nombre: 'Producto D', precio: 10 }
];

const handler = async(req:Request): Promise<Response> =>{
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const searchParams = url.searchParams;

    const minPrecio = searchParams.get("minPrecio");
    const maxPrecio = searchParams.get("maxPrecio");

    if(method === "GET"){
        if (path === "/productos") {
            if(minPrecio && maxPrecio){
                const prodFiltrado3 = productos.filter(p=>p.precio <= Number(maxPrecio) && p.precio >= Number(minPrecio));
                return new Response(JSON.stringify(prodFiltrado3));
            }else if(maxPrecio){
                const prodFiltrado2 = productos.filter(p => p.precio <= Number(maxPrecio));
                return new Response(JSON.stringify(prodFiltrado2));
            }else if(minPrecio){
                const prodFiltrado1 = productos.filter(p => p.precio >= Number(minPrecio));
                return new Response(JSON.stringify(prodFiltrado1));
            }
            return new Response(JSON.stringify(productos));
        }else if (path.startsWith("/producto/")) {
            const id = path.split("/")[2];
            const id2 = Number(id);
            const product = productos.find((p) => p.id === id2);
            if (product) {
                return new Response(JSON.stringify(product), { status: 200 });
            } else {
                return new Response(JSON.stringify({ msg: 'No se ha encontrado producto' }), { status: 404 });
            }
        }else if(path === "/calcular-promedio"){
            if(minPrecio && maxPrecio){
                const prodFiltrado3 = productos.filter(p=>p.precio <= Number(maxPrecio) && p.precio >= Number(minPrecio));
                const promedio = prodFiltrado3.reduce((acc,elem)=> acc + elem.precio, 0) / prodFiltrado3.length;
                return new Response(JSON.stringify(promedio));
            }else if(maxPrecio){
                const prodFiltrado2 = productos.filter(p => p.precio <= Number(maxPrecio));
                const promedio = prodFiltrado2.reduce((acc,elem)=> acc + elem.precio, 0) / prodFiltrado2.length;
                return new Response(JSON.stringify(promedio));
            }else if(minPrecio){
                const prodFiltrado1 = productos.filter(p => p.precio >= Number(minPrecio));
                const promedio = prodFiltrado1.reduce((acc,elem)=> acc + elem.precio, 0) / prodFiltrado1.length;
                return new Response(JSON.stringify(promedio));
            }
            const promedio = productos.reduce((acc,elem)=> acc + elem.precio, 0) / productos.length;
            return new Response(JSON.stringify(promedio));
        }
    
    }
    return new Response("Endpoint not found",{status:404});
};
Deno.serve({port:3000},handler);
