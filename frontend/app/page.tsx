
"use client";

import { useEffect, useState } from "react";
import Graficas from "./components/Graficas";

export default function Home() {

    const [total, setTotal] = useState<any[]>([]);
    const [valorTotal, setValorTotal] = useState<any[]>([]);
    const [promedio, setPromedio] = useState<any[]>([]);
    const [maximo, setMaximo] = useState<any[]>([]);
    const [minimo, setMinimo] = useState<any[]>([]);
    const [monedas, setMonedas] = useState<any[]>([]);
    const [promedioMoneda, setPromedioMoneda] = useState<any[]>([]);
    const [totalTipo, setTotalTipo] = useState<any[]>([]);
    const [maximoMinimoTipo, setMaximoMinimoTipo] = useState<any[]>([]);
    const [promedioCategoria, setPromedioCategoria] = useState<any[]>([]);
    const [status, setStatus] = useState<any[]>([]);
    const [totalMarca, setTotalMarca] = useState<any[]>([]);
    const [codigosUnicos, setCodigosUnicos] = useState<any[]>([]);
    const [promedioLinea, setPromedioLinea] = useState<any[]>([]);
    const [maximoPlanner, setMaximoPlanner] = useState<any[]>([]);

    useEffect(() => {

        fetch("http://localhost:3002/productos/total").then(res => res.json()).then(data => setTotal(data));
        fetch("http://localhost:3002/productos/valor-total").then(res => res.json()).then(data => setValorTotal(data));
        fetch("http://localhost:3002/productos/promedio").then(res => res.json()).then(data => setPromedio(data));
        fetch("http://localhost:3002/productos/maximo").then(res => res.json()).then(data => setMaximo(data));
        fetch("http://localhost:3002/productos/minimo").then(res => res.json()).then(data => setMinimo(data));
        fetch("http://localhost:3002/productos/monedas").then(res => res.json()).then(data => setMonedas(data));
        fetch("http://localhost:3002/productos/promedio-moneda").then(res => res.json()).then(data => setPromedioMoneda(data));
        fetch("http://localhost:3002/productos/total-tipo").then(res => res.json()).then(data => setTotalTipo(data));
        fetch("http://localhost:3002/productos/maximo-minimo-tipo").then(res => res.json()).then(data => setMaximoMinimoTipo(data));
        fetch("http://localhost:3002/productos/promedio-categoria").then(res => res.json()).then(data => setPromedioCategoria(data));
        fetch("http://localhost:3002/productos/status").then(res => res.json()).then(data => setStatus(data));
        fetch("http://localhost:3002/productos/total-marca").then(res => res.json()).then(data => setTotalMarca(data));
        fetch("http://localhost:3002/productos/codigos-unicos").then(res => res.json()).then(data => setCodigosUnicos(data));
        fetch("http://localhost:3002/productos/promedio-linea").then(res => res.json()).then(data => setPromedioLinea(data));
        fetch("http://localhost:3002/productos/maximo-planner").then(res => res.json()).then(data => setMaximoPlanner(data));

    }, []);

    return (
        <main className="p-6">

            <h1 className="text-2xl font-bold mb-6">Agregaciones de Productos</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <div className="border rounded p-4">
                    <h2>1. Total de productos</h2>
                    <p className="text-xl font-bold">{total[0]?.total_products}</p>
                </div>

                <div className="border rounded p-4">
                    <h2>2. Valor total de productos</h2>
                    <p className="text-xl font-bold">{Number(valorTotal[0]?.valor_total || 0).toFixed(2)}</p>
                </div>

                <div className="border rounded p-4">
                    <h2>3. Valor promedio de productos</h2>
                    <p className="text-xl font-bold">{Number(promedio[0]?.valor_promedio || 0).toFixed(2)}</p>
                </div>

                <div className="border rounded p-4">
                    <h2>4. Producto con valor más alto</h2>
                    <p>{maximo[0]?.name}</p>
                    <p className="text-xl font-bold">{maximo[0]?.value}</p>
                </div>

                <div className="border rounded p-4">
                    <h2>5. Producto con valor más bajo</h2>
                    <p>{minimo[0]?.name}</p>
                    <p className="text-xl font-bold">{minimo[0]?.value}</p>
                </div>

                <div className="border rounded p-4">
                    <h2>13. Códigos únicos de productos</h2>
                    <p className="text-xl font-bold">{codigosUnicos[0]?.codigos_unicos}</p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <Graficas titulo="6. Productos por moneda" datos={monedas} campoX="valueCurrency" campoY="total_productos" />

                <Graficas titulo="7. Promedio por moneda" datos={promedioMoneda} campoX="valueCurrency" campoY="valor_promedio" />

                <Graficas titulo="8. Valor total por tipo" datos={totalTipo} campoX="productType" campoY="valor_total" />

                <Graficas titulo="9. Máximo y mínimo por tipo" datos={maximoMinimoTipo} campoX="productType" campoY="valor_maximo" campoY2="valor_minimo" />

                <Graficas titulo="10. Promedio por categoría" datos={promedioCategoria} campoX="categoryCode" campoY="valor_promedio" />

                <Graficas titulo="11. Productos por estado" datos={status} campoX="status" campoY="total_products" />

                <Graficas titulo="12. Valor total por marca" datos={totalMarca} campoX="brandCode" campoY="valor_total" />

                <Graficas titulo="14. Promedio y cantidad por línea" datos={promedioLinea} campoX="lineCode" campoY="valor_promedio" campoY2="cantidad_productos" />

                <Graficas titulo="15. Valor máximo por planner" datos={maximoPlanner} campoX="plannerCode" campoY="value" />

            </div>

        </main>
    );
}
