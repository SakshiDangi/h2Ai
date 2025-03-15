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
    // <div className="bg-black w-[100vw]">
    <div className="bg-zinc-950 h-[100vh] bg-center bg-no-repeat flex flex-row">
      <div className="mx-14 mt-22 lg:basis-1/3">
      <Card className="bg-red-950 mb-0 pb-0 gap-8 border-none">
        <CardHeader>
          <CardTitle className="text-white font-bold">Parkinson</CardTitle>
          <CardDescription>
            <div className=" p-0">
                <div className="flex overflow-hidden bg-black p-3 rounded-3xl">
                    <div className="flex-left">
                      <Image
                      src="/home.gif"
                      width={500}
                      height={500}
                      alt="home"
                      />
                    </div>
                    <div className="flex-right">
                      <Image
                        src="/home1.gif"
                        width={500}
                        height={500}
                        alt="home"
                      />
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

      <div className="mt-14 basis-2/3 w-full h-60">
        <div className="p-0 lg:pr-0 mr-0 overflow-hidden border-none object-fill">

        </div>
      </div>
    {/* </div> */}
    </div>
  )
}
