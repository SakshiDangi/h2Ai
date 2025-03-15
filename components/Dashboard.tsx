"use client"
import Image from "next/image"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
export default function Dashboard() {
  return (
    <div className="w-[100vw] flex flex-row">
      <div className="mx-14 mt-22 lg:basis-1/3">
      <Card className="bg-orange-700 mb-0 pb-0 gap-8 focus:border-orange-700 focus:border">
        <CardHeader>
          <CardTitle className="text-white">Summary</CardTitle>
          <CardDescription>
            <div className=" w-30 h-25 p-0">
                <div className="flex overflow-hidden">
                    <div className="w-full pl-4 flex-left">
                      <Image
                      src="/Group3.svg"
                      width={500}
                      height={100}
                      alt="logo"
                      />
                    </div>
                    <div className="flex-right">

                    </div>
                </div>
            </div>
          </CardDescription>
        </CardHeader>
        <div className="mx-4 lg:h-[45vh] h-[40vh] flex">
            <div className="w-full overflow-hidden">
                <Image
                    src="/human.svg"
                    width={500}
                    height={100}
                    alt="logo"
                />
            </div>
            <div className="w-full lg:px-8 overflow-hidden">
                <Image
                    src="/Group2.svg"
                    width={300}
                    height={50}
                    alt="logo"
                />
                <Image
                    src="/Group1.svg"
                    width={300}
                    height={50}
                    alt="logo"
                /> 
            </div>
        </div>
      </Card>
      </div>

      <div className="mt-14 basis-2/3 w-full h-60 bg-green-800">
        <div className="p-0 lg:pr-0 mr-0 overflow-hidden border-none object-fill">
            
        </div>
      </div>
    </div>
  )
}
