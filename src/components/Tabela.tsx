"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface IData {
    id: string;
    nome_aluno: string;
    nome_sensor: string;
    valor_sensor: string;
}

export function Tabela() {
    const [dados, setDados] = useState<IData[]>([]);

    useEffect(() => {
        const load = async () => {
            const res = await fetch(`http://iot.paparella.com.br/`);
            const data = await res.json();
            setDados(data);
        };
        load();
    }, []);

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dados.map((item) => (
                    (item.nome_aluno === "Sampaio/Wallace" ) ? (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.nome_aluno}</TableCell>
                            <TableCell>{item.nome_sensor}</TableCell>
                            <TableCell className="text-right">{item.valor_sensor}</TableCell>
                        </TableRow>
                    ) : null
                ))}
            </TableBody>
        </Table>
    );
}
