import { cn } from "@/lib/utils";

 const ProuductPrice = ({price,className}:{price:number; className?:string}) => {
    // fixing price to two decimal points
    const stringValue = price.toFixed(2);
    // spliting price from decimal point and integar point
     const [intValue,floatValue]=stringValue.split('.');
    return ( <p className={cn(' text-2xl',className)}>
        <span className=" text-xs align-super">QAR</span>
        {intValue}
        <span className=" text-xs align-super">.{floatValue}</span>

    </p>);
 }
  
 export default ProuductPrice;