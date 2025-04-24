import { categoryType } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Categories = ({ categories }: { categories: categoryType[] }) => {
  if (!categories || categories.length < 1)
    return <div>Opps.. No catagories found</div>;
  return (
    <div className="py-4 ">
      <div className="flex flex-row overflow-x-auto flex-nowrap md:grid grid-cols-9 gap-1 w-full ">
        {categories.map((item, index) => (
          <Link
            href={`/catalog/${item.urlKey}`}
            key={index}
            title={item.title}
            className=" flex mx-auto flex-col gap-y-1 text-center min-w-[100px]"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={300}
              height={300}
              className=" rounded-full overflow-hidden"
            />
            <h2 className=" text-base md:text-lg font-medium">{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
