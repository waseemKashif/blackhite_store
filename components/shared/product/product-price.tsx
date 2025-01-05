import { cn } from "@/lib/utils";
import { formatNumberWithDecimal } from "@/lib/utils";

 const ProuductPrice = ({price,className}:{price:string; className?:string}) => {
   const finalPrice = formatNumberWithDecimal(Number(price));
    const [intValue,floatValue]=finalPrice?.split('.');
   return (
     <p className={cn(" text-xl sm:text-2xl", className)}>
       <span className=" text-xs align-super">QAR</span>
       {intValue}
       <span className=" text-xs align-super">.{floatValue}</span>
     </p>
   );
 }
  
 export default ProuductPrice;