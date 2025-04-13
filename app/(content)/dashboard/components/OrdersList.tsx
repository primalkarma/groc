"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { getOrdersWithItems } from "@/actions/order.actions";

interface Order {
  order_id: string;
  order_date: Date;
  status: boolean;
  order_items: {
    product_id: string;
    quantity: number;
    products: {
      product_name: string;
      unit: string;
    };
  }[];
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]); // State to store fetched orders
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersWithItems();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Accordion for Orders */}
      <Accordion type="multiple" className="w-full">
        {orders.map((order) => (
          <AccordionItem key={order.order_id} value={order.order_id}>
            {/* Accordion Trigger (Order Summary) */}
            <AccordionTrigger>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Order ID: {order.order_id}</CardTitle>
                  <CardDescription>
                    Date: {new Date(order.order_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <span className="text-sm text-muted-foreground">
                    Status: {order.status ? "Active" : "Inactive"}
                  </span>
                </CardFooter>
              </Card>
            </AccordionTrigger>

            {/* Accordion Content (Order Items) */}
            <AccordionContent>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <Card key={item.product_id} className="w-full">
                    <CardHeader>
                      <CardTitle>{item.products.product_name}</CardTitle>
                      <CardDescription>
                        Quantity: {item.quantity} | Unit: {item.products.unit}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}