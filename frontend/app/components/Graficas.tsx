
"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
    titulo: string;
    datos: any[];
    campoX: string;
    campoY: string;
    campoY2?: string;
}

export default function Graficas({ titulo, datos, campoX, campoY, campoY2 }: Props) {

    const lista = Array.isArray(datos) ? datos : [];

    const data = {
        labels: lista.map(item => String(item[campoX] ?? "")),
        datasets: [
            {
                label: campoY,
                data: lista.map(item => Number(item[campoY]) || 0),
                backgroundColor: "#8884d8"
            },
            ...(campoY2 ? [{
                label: campoY2,
                data: lista.map(item => Number(item[campoY2]) || 0),
                backgroundColor: "#82ca9d"
            }] : [])
        ]
    };

    return (
        <div className="border rounded p-4">
            <h2 className="mb-4">{titulo}</h2>
            <div className="h-72">
                <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
}
