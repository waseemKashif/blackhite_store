"use client";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/actions/order.actions";
import { useFormStatus } from "react-dom";

const PlaceOrderForm = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const { success, message, redirectTo } = await createOrder();
    // if (success) {
    //   router.push(redirectTo || "/orders");
    // }
    // if (!success) {
    //   router.push(redirectTo || "/cart");
    //   alert(formatError(message) || "Something went wrong");
    // }
    const res = await createOrder();
    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };
  const PlaceholderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Check className="mr-2 h-4 w-4" />
        )}
        Place Order
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className=" w-full">
      <PlaceholderButton />
    </form>
  );
};

export default PlaceOrderForm;
