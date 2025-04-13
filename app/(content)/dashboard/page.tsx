import OrdersList from "./components/OrdersList";


export default function DashboardPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <OrdersList />
    </div>
  );
}