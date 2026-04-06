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
    console.log("[PedidosPage] useEffect - carregando pedidos...");
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    console.log(`[PedidosPage] orders atualizadas: ${orders.length} itens`);
  }, [orders]);

  const filteredOrders = useMemo(() => {
    console.log("[PedidosPage] Recalculando filteredOrders com searchTerm:", searchTerm);
    return orders.filter((order) =>
      order.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    console.log(`[PedidosPage] Paginando: start=${start}, pageSize=${pageSize}`);
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  const handleSearchChange = (value: string) => {
    console.log("[PedidosPage] Busca alterada:", value);
    setSearchTerm(value);
    setCurrentPage(1);
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
          <OrdersHeader />
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