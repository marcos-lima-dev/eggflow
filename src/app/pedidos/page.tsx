"use client";

import { useState, useMemo, useEffect } from "react";
import { useOrderStore } from "@/stores/orderStore";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { BottomNavBar } from "@/components/layout/BottomNavBar";
import { OrdersHeader } from "@/components/pedidos/OrdersHeader";
import { OrdersFilters } from "@/components/pedidos/OrdersFilters";
import { OrdersTable } from "@/components/pedidos/OrdersTable";
import { OrdersPagination } from "@/components/pedidos/OrdersPagination";

export default function PedidosPage() {
  const orders = useOrderStore((state) => state.orders);
  const loadOrders = useOrderStore((state) => state.loadOrders);
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