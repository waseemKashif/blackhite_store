 'use client'
 import { APP_NAME, SERVER_URL } from "@/lib/constants";
 import Image from "next/image";
 import { Button } from "@/components/ui/button";

 const NotFoundPage = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-screen">
        <Image
          src="/images/logo.svg"
          alt={`${APP_NAME} logo`}
          width={48}
          height={48}
          priority={true}
        />
        <div className=" p-6  w-3/4 lg:w-1/3 rounded-lg  shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">Not-Found</h1>
          <p className=" text-destructive"> Could Not Found Requested Page</p>
          <Button
            variant="outline"
            className=" mt-4 ml-2"
            onClick={() => (window.location.href = SERVER_URL)}
          >Back to Home</Button>
        </div>
      </div>
    );
 }
  
 export default NotFoundPage;