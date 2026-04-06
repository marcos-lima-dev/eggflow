"use client";

import { useEffect, useState, useMemo } from "react";
import { useOrderStore } from "@/stores/orderStore";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { OrdersHeader } from "@/components/pedidos/OrdersHeader";
import { OrdersFilters } from "@/components/pedidos/OrdersFilters";
import { OrdersTable } from "@/components/pedidos/OrdersTable";
import { OrdersPagination } from "@/components/pedidos/OrdersPagination";

export default function PedidosPage() {
  const { orders, loadOrders, isLoading } = useOrderStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Função de exportação CSV
  const exportToCSV = () => {
    const dataToExport = filteredOrders.length > 0 ? filteredOrders : orders;
    const headers = [
      "ID",
      "Cliente",
      "Tipo de Ovo",
      "Quantidade",
      "Status",
      "Data",
    ];
    const rows = dataToExport.map((order) => [
      order.id,
      order.client,
      order.eggType === "organic"
        ? "Orgânico"
        : order.eggType === "caipira"
        ? "Caipira"
        : "Industrial",
      order.quantity,
      order.status === "delivered"
        ? "Entregue"
        : order.status === "processing"
        ? "Processando"
        : order.status === "pending"
        ? "Pendente"
        : "Cancelado",
      order.date,
    ]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", `pedidos-${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <>
        <NavigationDrawer />
        <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
          <TopAppBar />
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-primary">Carregando pedidos...</div>
          </div>
        </main>
        <BottomNavBar />
      </>
    );
  }

  return (
    <>
      <NavigationDrawer />
      <main className="md:ml-72 min-h-screen pb-32 md:pb-8">
        <TopAppBar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <OrdersHeader onExport={exportToCSV} />
          <OrdersFilters searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <OrdersTable orders={paginatedOrders} />
          <OrdersPagination
            total={filteredOrders.length}
            current={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>
      <BottomNavBar />
    </>
  );
}