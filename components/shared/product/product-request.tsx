'use client'
import { Button } from "@/components/ui/button";
 import { useState } from "react";
 import { Check } from "lucide-react";
 const ProductRequest = () => {
     const [requested, setRequested] = useState(false);
    return (
      <Button variant="ghost" onClick={() => setRequested(!requested)} >
     
        {requested ? (
          <>
            <Check /> Requested
          </>
        ) : (
          "Make Request"
        )}
      </Button>
    );
 }
  
 export default ProductRequest;