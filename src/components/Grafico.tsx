"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

interface IData {
    id: string;
    nome_aluno: string;
    nome_sensor: string;
    valor_sensor: string;
}

export function Grafico() {
    const [dados, setDados] = useState<IData[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`http://iot.paparella.com.br/`);
            const data = await res.json();
            setDados(data);
        };
        load();
    }, []);
  // Garante que o componente não seja renderizado no lado do servidor
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Linear</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent style={{ height: 300 }}>
        <AreaChart
          data={dados}
          margin={{
            left: 12,
            right: 12,
          }}
          width={500}
          height={250}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip />
          <Area
            dataKey="desktop"
            type="linear"
            fill="#8884d8"
            fillOpacity={0.4}
            stroke="#8884d8"
          />
        </AreaChart>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
